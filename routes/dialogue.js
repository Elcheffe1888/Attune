import { Router } from 'express';
import Anthropic from '@anthropic-ai/sdk';
import { pool } from '../server.js';
import { requireAuth } from '../server.js';
import { L3_CONFLICTS } from '../content/situations.js';
import { STORIES } from '../content/stories.js';

const router = Router();
const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// ── Domain label map ───────────────────────────────────────────────────────
// Maps the short domain key used in story objects to the plain-language label
// used in the system prompt context line. Adjust keys if your stories.js uses
// different abbreviations (e.g. 'Ca' vs 'C' for Care for others).
const DOMAIN_LABELS = {
  H:  'honesty',
  Co: 'courage',
  Fa: 'fairness',
  Re: 'restraint',
  Hu: 'humility',
  Ca: 'care for others',
};

// ── Helper — resolve domain label from story ID ────────────────────────────
// Returns a plain-language string like "honesty" or null if not found.
// If a story has multiple domains (e.g. Fred Rogers: Co + Hu), takes the first.
function getStoryDomain(storyId) {
  if (!storyId || !STORIES) return null;
  const story = STORIES.find(s => s.id === storyId);
  if (!story) return null;

  // Support domain as string ('H'), array (['Co', 'Hu']), or full label ('honesty')
  let raw = story.domain || story.domains || null;
  if (!raw) return null;
  if (Array.isArray(raw)) raw = raw[0];               // take primary domain
  return DOMAIN_LABELS[raw] || raw;                   // map short key → label, or pass through
}

// ── Base system prompts ────────────────────────────────────────────────────

const TIT_BASE_PROMPT = `You are a thinking partner helping a teenager work through a real situation from their own life. You are not a therapist, a teacher, or an advice-giver.

Your job is to help them think more clearly — not to tell them what to do.

Rules you must follow without exception:
- Never use the words ethics, virtue, character, moral, or values
- Never tell them what they should do
- Never say "I understand how you feel" or "that's a great question"
- Never resolve the tension for them — the tension is the point
- Stay in their specific situation — never drift to general principles
- One question per response, maximum
- Under 80 words per response
- Acknowledge what they said before asking the next question

Opening: Do not begin with a question. Begin by naming what you heard in one or two sentences. Then ask one question.

If they describe abuse, self-harm, or danger: stop the dialogue and respond only with: "What you're describing sounds serious. Please talk to a trusted adult or contact a crisis line."

If they ask what you think they should do: respond only with "I can't tell you what to do — and I don't think you actually want me to. What's the part that feels most stuck?"`;

const L3_SYSTEM_PROMPT = `You are helping a teenager think through a situation where two things they care about are pulling in different directions. There is no clean answer. Your job is to help them hold both sides — not resolve the tension.

Rules you must follow without exception:
- Never name the virtues in tension (do not say "honesty" or "loyalty" or any virtue word)
- Never tell them which side wins
- Never say there is a right answer
- Keep both sides alive — if they collapse to one side, surface the cost of that
- One question per response, maximum
- Under 80 words per response
- Minimum 4 exchanges before closure is allowed

Closure (only after 4+ exchanges and learner has articulated what they would do):
Acknowledge specifically what they worked out. Name it in their own language. Ask if they want to keep going or stop.

If they describe abuse, self-harm, or danger: stop immediately with: "What you're describing sounds serious. Please talk to a trusted adult."`;

// ── Build story-aware TIT prompt ───────────────────────────────────────────
// Only appends context when entry is 'post_story' AND a valid storyId is given.
// The context block instructs the model NOT to reference the story directly —
// it is silent orientation only.
function buildTitPrompt(entryPoint, storyId) {
  if (entryPoint !== 'post_story' || !storyId) return TIT_BASE_PROMPT;

  const domain = getStoryDomain(storyId);
  if (!domain) return TIT_BASE_PROMPT;

  return `${TIT_BASE_PROMPT}

Context (do not reference directly): The learner has just read a story about ${domain}. This domain may be active for them. Do not mention the story. Do not guide them toward it. If they bring a situation that touches ${domain}, you are already oriented — follow their lead, not the story's logic.`;
}

// ── POST /api/dialogue/think ───────────────────────────────────────────────
// Think it through — open-ended dialogue about learner's own situation.
// Body: { messages: [{role, content}], sessionId?, entryPoint?, storyId? }
router.post('/think', requireAuth, async (req, res) => {
  const userId = req.session.userId;
  const { messages, sessionId, entryPoint, storyId } = req.body;

  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'messages array required' });
  }

  // Trim history to 20 turns max (spec: preserve most recent 20)
  const trimmedMessages = messages.length > 20
    ? messages.slice(messages.length - 20)
    : messages;

  try {
    let activeSessionId = sessionId;

    if (sessionId) {
      await pool.query(
        `UPDATE tit_sessions SET exchange_count = exchange_count + 1
         WHERE id = $1 AND user_id = $2`,
        [sessionId, userId]
      );
    } else {
      // First message — create session record
      const result = await pool.query(
        `INSERT INTO tit_sessions (user_id, entry_point, exchange_count)
         VALUES ($1, $2, 1) RETURNING id`,
        [userId, entryPoint || 'navigation']
      );
      activeSessionId = result.rows[0].id;
    }

    // Build prompt — story-aware only when entry_point is post_story
    const systemPrompt = buildTitPrompt(entryPoint, storyId);

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 300,
      system: systemPrompt,
      messages: trimmedMessages,
    });

    const reply = response.content.find(b => b.type === 'text')?.text || '';

    return res.json({
      reply,
      sessionId: activeSessionId,
    });
  } catch (err) {
    console.error('Think it through error:', err);
    return res.status(500).json({ error: 'Dialogue failed' });
  }
});

// ── POST /api/dialogue/think/end ──────────────────────────────────────────
// Mark a Think it through session as completed.
// Body: { sessionId }
router.post('/think/end', requireAuth, async (req, res) => {
  const userId = req.session.userId;
  const { sessionId } = req.body;

  if (!sessionId) return res.status(400).json({ error: 'sessionId required' });

  try {
    await pool.query(
      `UPDATE tit_sessions SET completed = TRUE
       WHERE id = $1 AND user_id = $2`,
      [sessionId, userId]
    );
    return res.json({ ok: true });
  } catch (err) {
    console.error('TIT end error:', err);
    return res.status(500).json({ error: 'Failed to close session' });
  }
});

// ── GET /api/dialogue/l3/available ────────────────────────────────────────
// Returns which L3 conflict pairs this learner has unlocked.
// Unlock gate: both L2 KCs for the relevant domains must be mastered.
router.get('/l3/available', requireAuth, async (req, res) => {
  const userId = req.session.userId;

  try {
    const kcResult = await pool.query(
      'SELECT kc_id, mastered FROM kc_states WHERE user_id = $1',
      [userId]
    );
    const masteredKCs = new Set(
      kcResult.rows.filter(r => r.mastered).map(r => r.kc_id)
    );

    // Don't resurface L3 pairs completed within the last 90 days
    const recentL3 = await pool.query(
      `SELECT conflict_pair FROM l3_engagements
       WHERE user_id = $1 AND completed = TRUE
       AND started_at > NOW() - INTERVAL '90 days'`,
      [userId]
    );
    const recentPairs = new Set(recentL3.rows.map(r => r.conflict_pair));

    const available = L3_CONFLICTS.filter(conflict => {
      if (recentPairs.has(conflict.id)) return false;
      // Both L2 KCs for the domains in tension must be mastered
      return conflict.domains.every(domain => masteredKCs.has(`${domain}-L2`));
    });

    return res.json({ available });
  } catch (err) {
    console.error('L3 available error:', err);
    return res.status(500).json({ error: 'Could not check L3 availability' });
  }
});

// ── POST /api/dialogue/l3 ─────────────────────────────────────────────────
// L3 conflict dialogue.
// Body: { conflictId, messages: [{role, content}], engagementId?, exchangeCount }
router.post('/l3', requireAuth, async (req, res) => {
  const userId = req.session.userId;
  const { conflictId, messages, engagementId, exchangeCount } = req.body;

  if (!conflictId || !messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'conflictId and messages required' });
  }

  const conflict = L3_CONFLICTS.find(c => c.id === conflictId);
  if (!conflict) {
    return res.status(404).json({ error: 'Conflict pair not found' });
  }

  // Trim history to 20 turns max
  const trimmedMessages = messages.length > 20
    ? messages.slice(messages.length - 20)
    : messages;

  try {
    let activeEngagementId = engagementId;

    if (!engagementId) {
      const result = await pool.query(
        `INSERT INTO l3_engagements (user_id, conflict_pair, exchange_count)
         VALUES ($1, $2, 1) RETURNING id`,
        [userId, conflictId]
      );
      activeEngagementId = result.rows[0].id;
    } else {
      await pool.query(
        `UPDATE l3_engagements SET exchange_count = exchange_count + 1
         WHERE id = $1 AND user_id = $2`,
        [engagementId, userId]
      );
    }

    // Inject the specific conflict setup into the system prompt
    const systemWithSetup = `${L3_SYSTEM_PROMPT}

The specific situation the learner is thinking through:
${conflict.setup}`;

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 300,
      system: systemWithSetup,
      messages: trimmedMessages,
    });

    const reply = response.content.find(b => b.type === 'text')?.text || '';
    const currentExchangeCount = (exchangeCount || 0) + 1;

    return res.json({
      reply,
      engagementId: activeEngagementId,
      exchangeCount: currentExchangeCount,
      closureAvailable: currentExchangeCount >= 4,
    });
  } catch (err) {
    console.error('L3 dialogue error:', err);
    return res.status(500).json({ error: 'Dialogue failed' });
  }
});

// ── POST /api/dialogue/l3/end ─────────────────────────────────────────────
// Mark an L3 engagement as completed.
// Body: { engagementId, bothSidesNamed }
router.post('/l3/end', requireAuth, async (req, res) => {
  const userId = req.session.userId;
  const { engagementId, bothSidesNamed } = req.body;

  if (!engagementId) return res.status(400).json({ error: 'engagementId required' });

  try {
    await pool.query(
      `UPDATE l3_engagements SET
         completed = TRUE,
         both_sides_named = $1
       WHERE id = $2 AND user_id = $3`,
      [bothSidesNamed || false, engagementId, userId]
    );
    return res.json({ ok: true });
  } catch (err) {
    console.error('L3 end error:', err);
    return res.status(500).json({ error: 'Failed to close engagement' });
  }
});

export default router;
