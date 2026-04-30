import { Router } from 'express';
import { pool } from '../server.js';
import { requireAuth } from '../server.js';
import { updateBKT, checkMastery, initialMastery, nextResurfaceDate, BKT_PARAMS } from '../engine/bkt.js';
import { buildSessionQueue } from '../engine/sequencer.js';
import { randomUUID } from 'crypto';

const router = Router();

// ── GET /api/situations/queue ──────────────────────────────────────────────
// Returns the next session queue for this learner.
// Creates a new session_meta record.
router.get('/queue', requireAuth, async (req, res) => {
  const userId = req.session.userId;

  try {
    // Load all KC states for this learner
    const kcResult = await pool.query(
      'SELECT * FROM kc_states WHERE user_id = $1',
      [userId]
    );
    const kcStates = kcResult.rows;

    // Count total interactions to determine novice status
    const interactionResult = await pool.query(
      'SELECT COUNT(*) FROM responses WHERE user_id = $1',
      [userId]
    );
    const totalInteractions = parseInt(interactionResult.rows[0].count, 10);
    const isNovice = totalInteractions < 12;

    // Build the queue
    const queue = await buildSessionQueue(userId, kcStates, isNovice, pool);

    if (!queue || queue.length === 0) {
      return res.json({ queue: [], sessionId: null, message: 'No situations available right now.' });
    }

    // Create session meta record
    const sessionId = randomUUID();
    await pool.query(
      `INSERT INTO sessions_meta (id, user_id, situations_shown, is_novice)
       VALUES ($1, $2, $3, $4)`,
      [sessionId, userId, queue.map(s => s.id), isNovice]
    );

    return res.json({ queue, sessionId, isNovice });
  } catch (err) {
    console.error('Queue error:', err);
    return res.status(500).json({ error: 'Could not build session queue' });
  }
});

// ── POST /api/situations/respond ───────────────────────────────────────────
// Records a response and runs the BKT update.
// Body: { sessionId, situationId, kcId, correct, distractorChosen, responseTimeMs }
router.post('/respond', requireAuth, async (req, res) => {
  const userId = req.session.userId;
  const { sessionId, situationId, kcId, correct, distractorChosen, responseTimeMs } = req.body;

  if (!sessionId || !situationId || !kcId || correct === undefined) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  if (!BKT_PARAMS[kcId]) {
    return res.status(400).json({ error: `Unknown KC: ${kcId}` });
  }

  try {
    // Get or create KC state
    let kcState = await pool.query(
      'SELECT * FROM kc_states WHERE user_id = $1 AND kc_id = $2',
      [userId, kcId]
    );

    let currentMastery;
    let interactionCount;
    let situationsUsed;
    let resurface_count;

    if (kcState.rows.length === 0) {
      // First interaction — initialise from P(L0)
      currentMastery = initialMastery(kcId);
      interactionCount = 0;
      situationsUsed = [];
      resurface_count = 0;

      await pool.query(
        `INSERT INTO kc_states (user_id, kc_id, mastery, interaction_count, situations_used)
         VALUES ($1, $2, $3, 0, $4)`,
        [userId, kcId, currentMastery, [situationId]]
      );
    } else {
      const row = kcState.rows[0];
      currentMastery = row.mastery;
      interactionCount = row.interaction_count;
      situationsUsed = row.situations_used || [];
      resurface_count = row.resurface_count || 0;
    }

    // Run BKT update
    const newMastery = updateBKT(currentMastery, correct, kcId);

    // Record the response
    await pool.query(
      `INSERT INTO responses (user_id, session_id, situation_id, kc_id, correct, distractor_chosen, response_time_ms)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [userId, sessionId, situationId, kcId, correct, distractorChosen || null, responseTimeMs || null]
    );

    // Add situation to used list
    if (!situationsUsed.includes(situationId)) {
      situationsUsed.push(situationId);
    }

    // Check mastery conditions
    const recentResponses = await pool.query(
      `SELECT correct FROM responses
       WHERE user_id = $1 AND kc_id = $2
       ORDER BY created_at DESC LIMIT 3`,
      [userId, kcId]
    );

    const masteryAchieved = checkMastery(newMastery, recentResponses.rows);

    // Build KC state update
    const updateFields = {
      mastery: newMastery,
      interaction_count: interactionCount + 1,
      situations_used: situationsUsed,
    };

    if (masteryAchieved && !(kcState.rows[0]?.mastered)) {
      updateFields.mastered = true;
      updateFields.mastery_date = new Date();
      updateFields.mastery_situation_id = situationId;
      updateFields.next_resurface_date = nextResurfaceDate(resurface_count);
    }

    // Update KC state
    await pool.query(
      `UPDATE kc_states SET
         mastery = $1,
         interaction_count = $2,
         situations_used = $3,
         mastered = $4,
         mastery_date = $5,
         mastery_situation_id = $6,
         next_resurface_date = $7
       WHERE user_id = $8 AND kc_id = $9`,
      [
        updateFields.mastery,
        updateFields.interaction_count,
        updateFields.situations_used,
        updateFields.mastered ?? (kcState.rows[0]?.mastered ?? false),
        updateFields.mastery_date ?? (kcState.rows[0]?.mastery_date ?? null),
        updateFields.mastery_situation_id ?? (kcState.rows[0]?.mastery_situation_id ?? null),
        updateFields.next_resurface_date ?? (kcState.rows[0]?.next_resurface_date ?? null),
        userId,
        kcId,
      ]
    );

    return res.json({
      ok: true,
      newMastery,        // for server logs only — never show to learner
      masteryAchieved: masteryAchieved && !kcState.rows[0]?.mastered,
    });
  } catch (err) {
    console.error('Respond error:', err);
    return res.status(500).json({ error: 'Failed to record response' });
  }
});

// ── POST /api/situations/end-session ──────────────────────────────────────
// Marks a session as ended. Triggers pattern detection.
router.post('/end-session', requireAuth, async (req, res) => {
  const userId = req.session.userId;
  const { sessionId } = req.body;

  if (!sessionId) return res.status(400).json({ error: 'sessionId required' });

  try {
    await pool.query(
      'UPDATE sessions_meta SET ended_at = NOW() WHERE id = $1 AND user_id = $2',
      [sessionId, userId]
    );

    // Fire pattern detection asynchronously — don't block the response
    import('../engine/patterns.js').then(({ detectPatterns }) => {
      detectPatterns(userId, pool).catch(err => console.error('Pattern detection error:', err));
    });

    return res.json({ ok: true });
  } catch (err) {
    console.error('End session error:', err);
    return res.status(500).json({ error: 'Failed to end session' });
  }
});

export default router;
