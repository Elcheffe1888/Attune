import { Router } from 'express';
import { pool } from '../server.js';
import { requireAuth } from '../server.js';
import { STORIES } from '../content/stories.js';

const router = Router();

// ── GET /api/stories ───────────────────────────────────────────────────────
// Returns all stories with read status for this learner.
// Stories are always available — no unlock gate.
router.get('/', requireAuth, async (req, res) => {
  const userId = req.session.userId;

  try {
    const readResult = await pool.query(
      'SELECT story_id FROM stories_read WHERE user_id = $1',
      [userId]
    );
    const readIds = new Set(readResult.rows.map(r => r.story_id));

    const stories = STORIES.map(s => ({
      id: s.id,
      domain: s.domain,
      title: s.title,
      personName: s.personName,
      context: s.context,
      pullQuote: s.pullQuote,
      read: readIds.has(s.id),
    }));

    return res.json({ stories });
  } catch (err) {
    console.error('Stories list error:', err);
    return res.status(500).json({ error: 'Could not load stories' });
  }
});

// ── GET /api/stories/:id ───────────────────────────────────────────────────
// Returns a single story with full content.
router.get('/:id', requireAuth, async (req, res) => {
  const { id } = req.params;
  const story = STORIES.find(s => s.id === id);

  if (!story) {
    return res.status(404).json({ error: 'Story not found' });
  }

  return res.json({ story });
});

// ── POST /api/stories/:id/read ─────────────────────────────────────────────
// Marks a story as read for this learner.
router.post('/:id/read', requireAuth, async (req, res) => {
  const userId = req.session.userId;
  const { id } = req.params;

  const story = STORIES.find(s => s.id === id);
  if (!story) {
    return res.status(404).json({ error: 'Story not found' });
  }

  try {
    await pool.query(
      `INSERT INTO stories_read (user_id, story_id)
       VALUES ($1, $2)
       ON CONFLICT (user_id, story_id) DO NOTHING`,
      [userId, id]
    );

    return res.json({ ok: true });
  } catch (err) {
    console.error('Mark read error:', err);
    return res.status(500).json({ error: 'Failed to mark story as read' });
  }
});

// ── GET /api/stories/domain/:domain ───────────────────────────────────────
// Returns stories filtered by virtue domain.
router.get('/domain/:domain', requireAuth, async (req, res) => {
  const userId = req.session.userId;
  const { domain } = req.params;

  const domainStories = STORIES.filter(s => s.domain === domain);
  if (domainStories.length === 0) {
    return res.status(404).json({ error: 'No stories found for that domain' });
  }

  try {
    const readResult = await pool.query(
      'SELECT story_id FROM stories_read WHERE user_id = $1',
      [userId]
    );
    const readIds = new Set(readResult.rows.map(r => r.story_id));

    const stories = domainStories.map(s => ({
      id: s.id,
      domain: s.domain,
      title: s.title,
      personName: s.personName,
      context: s.context,
      pullQuote: s.pullQuote,
      read: readIds.has(s.id),
    }));

    return res.json({ stories });
  } catch (err) {
    console.error('Domain stories error:', err);
    return res.status(500).json({ error: 'Could not load stories' });
  }
});

export default router;
