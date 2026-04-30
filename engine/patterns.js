// engine/patterns.js
// Runs at the end of each session. Reads response history and KC states.
// Writes detected patterns to pattern_flags table.
// Never called synchronously — always fire-and-forget after session end.

const ALL_DOMAINS = ['H', 'Co', 'Fa', 'Re', 'Hu', 'Ca'];

export async function detectPatterns(userId, pool) {
  try {
    // Load full response history for this learner
    const responseResult = await pool.query(
      `SELECT situation_id, kc_id, correct, distractor_chosen, response_time_ms, created_at
       FROM responses WHERE user_id = $1 ORDER BY created_at ASC`,
      [userId]
    );
    const responses = responseResult.rows;
    if (responses.length < 8) return; // threshold not met

    // Load KC states
    const kcResult = await pool.query(
      'SELECT * FROM kc_states WHERE user_id = $1',
      [userId]
    );
    const kcMap = {};
    for (const row of kcResult.rows) {
      kcMap[row.kc_id] = row;
    }

    // Count distinct domains with interactions
    const activeDomains = ALL_DOMAINS.filter(d => {
      const l1 = kcMap[`${d}-L1`];
      return l1 && l1.interaction_count > 0;
    });
    if (activeDomains.length < 2) return; // threshold not met

    const flags = {};

    // ── P-01: Speed-accuracy tradeoff ─────────────────────────────────────
    // Response time < median by 2+ SD on incorrect answers, 4+ occurrences
    const timings = responses
      .filter(r => r.response_time_ms != null)
      .map(r => r.response_time_ms);

    if (timings.length >= 8) {
      const median = timings.slice().sort((a, b) => a - b)[Math.floor(timings.length / 2)];
      const mean = timings.reduce((a, b) => a + b, 0) / timings.length;
      const sd = Math.sqrt(timings.map(t => (t - mean) ** 2).reduce((a, b) => a + b, 0) / timings.length);
      const fastIncorrect = responses.filter(r =>
        r.correct === false &&
        r.response_time_ms != null &&
        r.response_time_ms < median - 2 * sd
      );
      if (fastIncorrect.length >= 4) flags['P-01'] = true;
    }

    // ── P-02: Domain strength gap ─────────────────────────────────────────
    // One domain at mastery > 0.80, another < 0.40 with 4+ interactions
    const domainMasteries = activeDomains.map(d => ({
      domain: d,
      mastery: kcMap[`${d}-L1`]?.mastery ?? 0,
      interactions: kcMap[`${d}-L1`]?.interaction_count ?? 0,
    }));
    const strong = domainMasteries.find(d => d.mastery > 0.80);
    const weak   = domainMasteries.find(d => d.mastery < 0.40 && d.interactions >= 4);
    if (strong && weak && strong.domain !== weak.domain) flags['P-02'] = true;

    // ── P-03: Distractor preference ───────────────────────────────────────
    // Same distractor chosen on 3+ incorrect responses
    const incorrectResponses = responses.filter(r => !r.correct && r.distractor_chosen);
    const distractorCounts = {};
    for (const r of incorrectResponses) {
      // Key by kc_id + distractor to detect systematic pattern within a KC
      const key = `${r.kc_id}:${r.distractor_chosen}`;
      distractorCounts[key] = (distractorCounts[key] || 0) + 1;
    }
    const hasConsistentDistractor = Object.values(distractorCounts).some(count => count >= 3);
    if (hasConsistentDistractor) flags['P-03'] = true;

    // ── P-04: Resurfacing performance drop ────────────────────────────────
    // Correct rate on resurfaced situations below 0.60, 3+ resurfacing events
    // Resurfaced situations: ones shown after mastery date for that KC
    let resurfaceTotal = 0;
    let resurfaceCorrect = 0;
    for (const kcId of Object.keys(kcMap)) {
      const row = kcMap[kcId];
      if (!row.mastered || !row.mastery_date) continue;
      const masteryDate = new Date(row.mastery_date);
      const resurfaceResponses = responses.filter(r =>
        r.kc_id === kcId &&
        new Date(r.created_at) > masteryDate &&
        r.situation_id !== row.mastery_situation_id
      );
      resurfaceTotal += resurfaceResponses.length;
      resurfaceCorrect += resurfaceResponses.filter(r => r.correct).length;
    }
    if (resurfaceTotal >= 3 && resurfaceCorrect / resurfaceTotal < 0.60) flags['P-04'] = true;

    // ── P-05: Think it through engagement ────────────────────────────────
    const titResult = await pool.query(
      'SELECT COUNT(*) FROM tit_sessions WHERE user_id = $1 AND completed = TRUE',
      [userId]
    );
    if (parseInt(titResult.rows[0].count, 10) >= 3) flags['P-05'] = true;

    // ── P-06: L2 struggle ────────────────────────────────────────────────
    // Any L2 KC below 0.30 after 6+ interactions
    const l2Struggling = Object.entries(kcMap).find(([kcId, row]) =>
      kcId.includes('-L2') &&
      row.interaction_count >= 6 &&
      row.mastery < 0.30
    );
    if (l2Struggling) flags['P-06'] = true;

    // ── P-07: Consistent correctness ────────────────────────────────────
    // Correct rate > 0.85 across 12+ interactions in a single domain
    for (const d of activeDomains) {
      const domainResponses = responses.filter(r => r.kc_id.startsWith(`${d}-`));
      if (domainResponses.length >= 12) {
        const correctRate = domainResponses.filter(r => r.correct).length / domainResponses.length;
        if (correctRate > 0.85) {
          flags['P-07'] = true;
          break;
        }
      }
    }

    // ── P-08: Cross-domain slip on related KCs ───────────────────────────
    // The 15 conflict pair domain combinations — slip on both in same session
    const CONFLICT_PAIRS = [
      ['H','Ca'],['H','Co'],['H','Fa'],['Co','Re'],['Co','Fa'],
      ['Co','Ca'],['Co','Hu'],['Fa','Ca'],['Fa','Re'],['Fa','Hu'],
      ['Re','Ca'],['Re','Hu'],['Hu','Ca'],['H','Re'],['H','Hu'],
    ];

    const sessionResult = await pool.query(
      `SELECT id FROM sessions_meta WHERE user_id = $1 ORDER BY started_at DESC LIMIT 10`,
      [userId]
    );
    const sessionIds = sessionResult.rows.map(r => r.id);

    let crossDomainSlips = 0;
    for (const sessionId of sessionIds) {
      const sessionResponses = responses.filter(r => r.session_id === sessionId && !r.correct);
      const slippedDomains = new Set(sessionResponses.map(r => r.kc_id.split('-')[0]));
      for (const [d1, d2] of CONFLICT_PAIRS) {
        if (slippedDomains.has(d1) && slippedDomains.has(d2)) {
          crossDomainSlips++;
          break;
        }
      }
    }
    if (crossDomainSlips >= 2) flags['P-08'] = true;

    // ── Write flags to DB ────────────────────────────────────────────────
    await pool.query(
      `INSERT INTO pattern_flags (user_id, flags, updated_at)
       VALUES ($1, $2, NOW())
       ON CONFLICT (user_id) DO UPDATE SET flags = $2, updated_at = NOW()`,
      [userId, JSON.stringify(flags)]
    );
  } catch (err) {
    console.error('Pattern detection failed:', err);
  }
}
