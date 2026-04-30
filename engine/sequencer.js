import { expectedMasteryGain, BKT_PARAMS, MASTERY_THRESHOLD } from './bkt.js';
import { SITUATIONS } from '../content/situations.js';

const SESSION_TARGET = 6;
const NOVICE_TARGET  = 4;
const ALL_KCS = Object.keys(BKT_PARAMS);

// Domain prefix from KC ID — 'H-L1' → 'H', 'Co-L2' → 'Co'
function domainOf(kcId) {
  return kcId.split('-')[0];
}

// Level from KC ID — 'H-L1' → 1, 'Co-L2' → 2
function levelOf(kcId) {
  return parseInt(kcId.split('L')[1], 10);
}

// Pick an unused situation for a given KC
function pickSituation(kcId, situationsUsed = []) {
  const candidates = SITUATIONS.filter(s =>
    s.kcId === kcId && !situationsUsed.includes(s.id)
  );
  if (candidates.length === 0) return null;
  // Random selection within eligible candidates
  return candidates[Math.floor(Math.random() * candidates.length)];
}

// Interleave queue so no two consecutive situations share a virtue domain
function interleave(queue) {
  const interleaved = [];
  const remaining = [...queue];
  let lastDomain = null;

  while (remaining.length > 0) {
    let placed = false;
    for (let i = 0; i < remaining.length; i++) {
      if (domainOf(remaining[i].kcId) !== lastDomain) {
        interleaved.push(remaining[i]);
        lastDomain = domainOf(remaining[i].kcId);
        remaining.splice(i, 1);
        placed = true;
        break;
      }
    }
    // Edge case: all remaining share domain — take next regardless
    if (!placed) {
      interleaved.push(remaining.shift());
      lastDomain = domainOf(interleaved[interleaved.length - 1].kcId);
    }
  }

  return interleaved;
}

// Is a KC unlocked for this learner?
function isUnlocked(kcId, kcMap) {
  const level = levelOf(kcId);
  if (level === 1) return true;

  if (level === 2) {
    const domain = domainOf(kcId);
    const l1Row = kcMap[`${domain}-L1`];
    return l1Row?.mastered === true;
  }

  return false; // L3 handled separately via dialogue
}

// ── Main export ────────────────────────────────────────────────────────────
export async function buildSessionQueue(userId, kcStateRows, isNovice, pool) {
  const target = isNovice ? NOVICE_TARGET : SESSION_TARGET;

  // Build KC map keyed by kc_id
  const kcMap = {};
  for (const row of kcStateRows) {
    kcMap[row.kc_id] = row;
  }

  const now = new Date();
  const in24h = new Date(now.getTime() + 24 * 60 * 60 * 1000);

  // ── Pool A: New KCs (zero interactions, unlocked) ──────────────────────
  const poolA = ALL_KCS.filter(kcId => {
    const row = kcMap[kcId];
    const hasInteractions = row && row.interaction_count > 0;
    return !hasInteractions && isUnlocked(kcId, kcMap);
  });

  // ── Pool B: Practice KCs (introduced, not mastered) ────────────────────
  const poolB = ALL_KCS.filter(kcId => {
    const row = kcMap[kcId];
    if (!row || row.interaction_count === 0) return false;
    if (row.mastered) return false;
    return isUnlocked(kcId, kcMap);
  }).sort((a, b) => {
    const masteryA = kcMap[a]?.mastery ?? 0;
    const masteryB = kcMap[b]?.mastery ?? 0;
    return expectedMasteryGain(masteryB, b) - expectedMasteryGain(masteryA, a);
  });

  // ── Pool C: Resurfacing KCs (mastered, due for resurfacing) ───────────
  const poolC = ALL_KCS.filter(kcId => {
    const row = kcMap[kcId];
    if (!row?.mastered) return false;
    if (!row.next_resurface_date) return false;
    return new Date(row.next_resurface_date) <= in24h;
  }).sort((a, b) => {
    return new Date(kcMap[a].next_resurface_date) - new Date(kcMap[b].next_resurface_date);
  });

  const queue = [];
  const usedDomains = new Set();

  // Step 1: Seed with resurfacing KCs (Pool C — highest priority)
  for (const kcId of poolC) {
    if (queue.length >= target) break;
    const row = kcMap[kcId];
    const situation = pickSituation(kcId, row?.situations_used || []);
    if (situation) queue.push(situation);
  }

  // Step 2: Add new KCs (Pool A — max 1 for novice, max 2 for advanced)
  const newKcLimit = isNovice ? 1 : 2;
  let newKcsAdded = 0;

  // Prioritise L1 KCs for new learners
  const poolASorted = [...poolA].sort((a, b) => levelOf(a) - levelOf(b));

  for (const kcId of poolASorted) {
    if (queue.length >= target) break;
    if (newKcsAdded >= newKcLimit) break;
    const situation = pickSituation(kcId, []);
    if (situation) {
      queue.push(situation);
      newKcsAdded++;
    }
  }

  // Step 3: Fill remaining slots with practice KCs (Pool B)
  for (const kcId of poolB) {
    if (queue.length >= target) break;
    const row = kcMap[kcId];
    const situation = pickSituation(kcId, row?.situations_used || []);
    if (situation) queue.push(situation);
  }

  // Step 4: Apply interleaving rule
  return interleave(queue);
}
