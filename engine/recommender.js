import { expectedMasteryGain } from './bkt.js';
import { STORIES } from '../content/stories.js';

const ALL_DOMAINS = ['H', 'Co', 'Fa', 'Re', 'Hu', 'Ca'];

const DOMAIN_LABELS = {
  'H':  'Honesty',
  'Co': 'Courage',
  'Fa': 'Fairness',
  'Re': 'Restraint',
  'Hu': 'Humility',
  'Ca': 'Care for others',
};

const CONFLICT_PAIRS = [
  { id: 'L3-01', domains: ['H',  'Ca'], label: 'a situation where two things you care about pull in different directions' },
  { id: 'L3-02', domains: ['H',  'Co'], label: 'a situation where two things you care about pull in different directions' },
  { id: 'L3-03', domains: ['H',  'Fa'], label: 'a situation where two things you care about pull in different directions' },
  { id: 'L3-04', domains: ['Co', 'Re'], label: 'a situation where two things you care about pull in different directions' },
  { id: 'L3-05', domains: ['Co', 'Fa'], label: 'a situation where two things you care about pull in different directions' },
  { id: 'L3-06', domains: ['Co', 'Ca'], label: 'a situation where two things you care about pull in different directions' },
  { id: 'L3-07', domains: ['Co', 'Hu'], label: 'a situation where two things you care about pull in different directions' },
  { id: 'L3-08', domains: ['Fa', 'Ca'], label: 'a situation where two things you care about pull in different directions' },
  { id: 'L3-09', domains: ['Fa', 'Re'], label: 'a situation where two things you care about pull in different directions' },
  { id: 'L3-10', domains: ['Fa', 'Hu'], label: 'a situation where two things you care about pull in different directions' },
  { id: 'L3-11', domains: ['Re', 'Ca'], label: 'a situation where two things you care about pull in different directions' },
  { id: 'L3-12', domains: ['Re', 'Hu'], label: 'a situation where two things you care about pull in different directions' },
  { id: 'L3-13', domains: ['Hu', 'Ca'], label: 'a situation where two things you care about pull in different directions' },
  { id: 'L3-14', domains: ['H',  'Re'], label: 'a situation where two things you care about pull in different directions' },
  { id: 'L3-15', domains: ['H',  'Hu'], label: 'a situation where two things you care about pull in different directions' },
];

export async function getRecommendations(userId, kcMap, totalInteractions, pool) {
  const recs = [];

  // ── Priority 1: L3 dialogue ────────────────────────────────────────────
  // Both L2 KCs for the pair must be mastered
  // Not completed within 90 days
  const recentL3 = await pool.query(
    `SELECT conflict_pair FROM l3_engagements
     WHERE user_id = $1 AND completed = TRUE
     AND started_at > NOW() - INTERVAL '90 days'`,
    [userId]
  );
  const recentPairs = new Set(recentL3.rows.map(r => r.conflict_pair));

  const eligibleL3 = CONFLICT_PAIRS.filter(pair => {
    if (recentPairs.has(pair.id)) return false;
    return pair.domains.every(d => kcMap[`${d}-L2`]?.mastered === true);
  });

  if (eligibleL3.length > 0) {
    // Sort by combined recency of prerequisite mastery events
    const sorted = eligibleL3.sort((a, b) => {
      const recentA = Math.max(
        new Date(kcMap[`${a.domains[0]}-L2`]?.mastery_date || 0),
        new Date(kcMap[`${a.domains[1]}-L2`]?.mastery_date || 0)
      );
      const recentB = Math.max(
        new Date(kcMap[`${b.domains[0]}-L2`]?.mastery_date || 0),
        new Date(kcMap[`${b.domains[1]}-L2`]?.mastery_date || 0)
      );
      return recentB - recentA;
    });

    recs.push({
      type: 'l3_dialogue',
      conflictPairId: sorted[0].id,
      copy: 'Try a harder situation — one where there\'s no clean answer',
    });
  }

  // ── Priority 2: Practice KC with highest expected mastery gain ─────────
  if (recs.length < 4) {
    const practiceKCs = Object.entries(kcMap)
      .filter(([kcId, row]) =>
        row.interaction_count > 0 &&
        !row.mastered &&
        row.mastery < 0.95
      )
      .map(([kcId, row]) => ({
        kcId,
        domain: kcId.split('-')[0],
        gain: expectedMasteryGain(row.mastery, kcId),
      }))
      .sort((a, b) => b.gain - a.gain);

    if (practiceKCs.length > 0) {
      const best = practiceKCs[0];
      recs.push({
        type: 'situation_practice',
        domain: best.domain,
        copy: `Keep going with ${DOMAIN_LABELS[best.domain]}`,
      });
    }
  }

  // ── Priority 3: Unexplored domain ─────────────────────────────────────
  if (recs.length < 4) {
    const unexplored = ALL_DOMAINS.filter(d => {
      const l1 = kcMap[`${d}-L1`];
      return !l1 || l1.interaction_count === 0;
    });

    if (unexplored.length > 0) {
      recs.push({
        type: 'domain_exploration',
        domain: unexplored[0],
        copy: `You haven't tried ${DOMAIN_LABELS[unexplored[0]]} yet — worth a look`,
      });
    }
  }

  // ── Priority 4: Unread story matched to an active domain ──────────────
  if (recs.length < 4) {
    const readResult = await pool.query(
      'SELECT story_id FROM stories_read WHERE user_id = $1',
      [userId]
    );
    const readIds = new Set(readResult.rows.map(r => r.story_id));

    const activeDomains = ALL_DOMAINS.filter(d => {
      const l1 = kcMap[`${d}-L1`];
      return l1 && l1.interaction_count > 0;
    });

    // Find unread story in an active domain
    const unread = STORIES.find(s =>
      !readIds.has(s.id) &&
      activeDomains.includes(s.domain)
    );

    if (unread) {
      recs.push({
        type: 'story',
        storyId: unread.id,
        copy: `Read: ${unread.personName} — ${unread.tagline}`,
      });
    }
  }

  // ── Priority 5: Think it through (if not done recently) ───────────────
  if (recs.length < 3) {
    const lastTit = await pool.query(
      `SELECT started_at FROM tit_sessions WHERE user_id = $1
       ORDER BY started_at DESC LIMIT 1`,
      [userId]
    );

    const lastDate = lastTit.rows[0]?.started_at;
    const daysSince = lastDate
      ? (Date.now() - new Date(lastDate).getTime()) / (1000 * 60 * 60 * 24)
      : Infinity;

    if (daysSince > 7) {
      recs.push({
        type: 'think_it_through',
        copy: 'Try thinking through something from your own life',
      });
    }
  }

  return recs.slice(0, 4);
}
