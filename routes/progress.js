import { Router } from 'express';
import { pool } from '../server.js';
import { requireAuth } from '../server.js';
import { getRecommendations } from '../engine/recommender.js';

const router = Router();

// Domain display labels — never show BKT numbers to learner
const DOMAIN_LABELS = {
  'H':  'Honesty',
  'Co': 'Courage',
  'Fa': 'Fairness',
  'Re': 'Restraint',
  'Hu': 'Humility',
  'Ca': 'Care for others',
};

const DOMAINS = ['H', 'Co', 'Fa', 'Re', 'Hu', 'Ca'];

// ── Three-state display logic ──────────────────────────────────────────────
// Never expose mastery numbers to the learner.
function kcDisplayState(kcRow) {
  if (!kcRow || kcRow.interaction_count === 0) return 'not_started';
  if (kcRow.mastered) return 'solid';
  return 'building';
}

function kcDisplayLabel(state) {
  switch (state) {
    case 'not_started': return 'Not explored yet';
    case 'building':    return 'Building';
    case 'solid':       return 'Solid';
    default:            return 'Not explored yet';
  }
}

// ── GET /api/progress ──────────────────────────────────────────────────────
// Returns the full Your path screen data for this learner.
// Never includes raw mastery floats or BKT numbers.
router.get('/', requireAuth, async (req, res) => {
  const userId = req.session.userId;

  try {
    // Load all KC states
    const kcResult = await pool.query(
      'SELECT * FROM kc_states WHERE user_id = $1',
      [userId]
    );
    const kcMap = {};
    for (const row of kcResult.rows) {
      kcMap[row.kc_id] = row;
    }

    // Total interaction count
    const interactionResult = await pool.query(
      'SELECT COUNT(*) FROM responses WHERE user_id = $1',
      [userId]
    );
    const totalInteractions = parseInt(interactionResult.rows[0].count, 10);

    // Build domain grid — 6 domains, L1 + optional L2
    const domains = DOMAINS.map(prefix => {
      const l1Row = kcMap[`${prefix}-L1`];
      const l2Row = kcMap[`${prefix}-L2`];

      const l1State = kcDisplayState(l1Row);
      const l2Unlocked = l1Row?.mastered === true;
      const l2State = l2Unlocked ? kcDisplayState(l2Row) : null;

      return {
        domain: prefix,
        label: DOMAIN_LABELS[prefix],
        l1: {
          state: l1State,
          label: kcDisplayLabel(l1State),
          masteryDate: l1Row?.mastery_date || null,
        },
        l2: l2Unlocked ? {
          state: l2State,
          label: kcDisplayLabel(l2State),
          masteryDate: l2Row?.mastery_date || null,
        } : null,
      };
    });

    // Pattern flags — shown only after ≥ 8 interactions across ≥ 2 domains
    let patterns = [];
    const activeDomains = DOMAINS.filter(p => {
      const l1 = kcMap[`${p}-L1`];
      return l1 && l1.interaction_count > 0;
    });

    if (totalInteractions >= 8 && activeDomains.length >= 2) {
      const flagResult = await pool.query(
        'SELECT flags FROM pattern_flags WHERE user_id = $1',
        [userId]
      );
      if (flagResult.rows.length > 0) {
        const flags = flagResult.rows[0].flags || {};
        patterns = PATTERN_MESSAGES
          .filter(p => flags[p.id])
          .slice(0, 2); // maximum 2 pattern messages at a time
      }
    }

    // Stories read count
    const storiesResult = await pool.query(
      'SELECT COUNT(*) FROM stories_read WHERE user_id = $1',
      [userId]
    );
    const storiesRead = parseInt(storiesResult.rows[0].count, 10);

    // Think it through sessions completed
    const titResult = await pool.query(
      'SELECT COUNT(*) FROM tit_sessions WHERE user_id = $1 AND completed = TRUE',
      [userId]
    );
    const titCompleted = parseInt(titResult.rows[0].count, 10);

    // Recommendations — Your next steps
    const recommendations = await getRecommendations(userId, kcMap, totalInteractions, pool);

    return res.json({
      domains,
      patterns,
      storiesRead,
      titCompleted,
      totalInteractions,
      recommendations,
    });
  } catch (err) {
    console.error('Progress error:', err);
    return res.status(500).json({ error: 'Could not load progress' });
  }
});

// ── Pattern messages — displayed verbatim, under 60 words, observational ──
const PATTERN_MESSAGES = [
  {
    id: 'P-01',
    text: 'When the situation moves fast, sometimes the answer that feels obvious isn\'t the one that holds up. A few of these have been close — worth slowing down on the ones that pull you quickly in one direction.',
  },
  {
    id: 'P-02',
    text: 'You\'re moving well in some areas and less far in others. That\'s normal — some of these situations are more familiar than others. The gap itself is worth paying attention to.',
  },
  {
    id: 'P-03',
    text: 'There\'s a pattern here: when honesty and kindness are pulling in different directions, the kind option keeps winning — even when something real gets left out. That\'s worth looking at directly.',
  },
  {
    id: 'P-03b',
    text: 'When a situation requires stepping into something uncomfortable, the option that stays on the edge keeps looking appealing. It\'s worth asking what\'s making the middle distance feel like the right place to be.',
  },
  {
    id: 'P-04',
    text: 'Some things that felt solid are a little less clear when they come back around. That\'s normal — it\'s why they come back. The ones that slip are the ones worth spending more time with.',
  },
  {
    id: 'P-05',
    text: 'You\'ve used Think it through a few times now. That\'s what it\'s for — bringing your actual life into it. That kind of practice is harder and more useful than the situations we give you.',
  },
  {
    id: 'P-06',
    text: 'This one is genuinely harder. The situations where the right response isn\'t obvious are supposed to be difficult — that difficulty is the point. More time here is the right move, not a signal to move on.',
  },
  {
    id: 'P-07',
    text: 'This area is getting solid. You\'re reading these situations well and your responses are holding up. The next layer is harder — and you\'re ready for it.',
  },
  {
    id: 'P-08',
    text: 'When two things you care about are pointing in different directions, that\'s where it gets genuinely hard. A few of these situations have that tension in them — and they\'re worth more time before moving to the next level.',
  },
];

export default router;
