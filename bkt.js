// engine/bkt.js — Bayesian Knowledge Tracing
// Corbett & Anderson (1995)
// Never round mastery values. Always maintain full float precision.

// ── BKT parameters ─────────────────────────────────────────────────────────
// Starting estimates. Update after ~200 learner interactions per KC
// using the Corbett-Anderson EM algorithm.

export const BKT_PARAMS = {
  // L1 — Recognition KCs
  'H-L1':  { pL0: 0.35, pT: 0.25, pS: 0.08, pG: 0.25 },
  'Co-L1': { pL0: 0.30, pT: 0.22, pS: 0.10, pG: 0.22 },
  'Fa-L1': { pL0: 0.40, pT: 0.28, pS: 0.08, pG: 0.28 },
  'Re-L1': { pL0: 0.25, pT: 0.20, pS: 0.10, pG: 0.20 },
  'Hu-L1': { pL0: 0.30, pT: 0.22, pS: 0.09, pG: 0.22 },
  'Ca-L1': { pL0: 0.38, pT: 0.26, pS: 0.08, pG: 0.26 },

  // L2 — Application KCs
  'H-L2':  { pL0: 0.12, pT: 0.18, pS: 0.12, pG: 0.18 },
  'Co-L2': { pL0: 0.10, pT: 0.16, pS: 0.12, pG: 0.16 },
  'Fa-L2': { pL0: 0.14, pT: 0.20, pS: 0.10, pG: 0.20 },
  'Re-L2': { pL0: 0.08, pT: 0.15, pS: 0.12, pG: 0.15 },
  'Hu-L2': { pL0: 0.12, pT: 0.18, pS: 0.11, pG: 0.18 },
  'Ca-L2': { pL0: 0.15, pT: 0.20, pS: 0.10, pG: 0.20 },
};

export const MASTERY_THRESHOLD = 0.95;

// ── Initialise mastery from P(L0) ──────────────────────────────────────────
export function initialMastery(kcId) {
  const params = BKT_PARAMS[kcId];
  if (!params) throw new Error(`Unknown KC: ${kcId}`);
  return params.pL0;
}

// ── Update mastery after one response ─────────────────────────────────────
// Returns the new mastery float. Do not round.
export function updateBKT(pMastery, correct, kcId) {
  const params = BKT_PARAMS[kcId];
  if (!params) throw new Error(`Unknown KC: ${kcId}`);
  const { pS, pG, pT } = params;

  let pMasteryUpdated;

  if (correct) {
    // P(mastery | correct) = P(mastery) * (1-pS) / [P(mastery)*(1-pS) + (1-P(mastery))*pG]
    const denom = pMastery * (1 - pS) + (1 - pMastery) * pG;
    pMasteryUpdated = (pMastery * (1 - pS)) / denom;
  } else {
    // P(mastery | incorrect) = P(mastery)*pS / [P(mastery)*pS + (1-P(mastery))*(1-pG)]
    const num   = pMastery * pS;
    const denom = pMastery * pS + (1 - pMastery) * (1 - pG);
    pMasteryUpdated = num / denom;
  }

  // Apply learning rate: P(mastery_final) = P(updated) + (1-P(updated)) * pT
  return pMasteryUpdated + (1 - pMasteryUpdated) * pT;
}

// ── Mastery determination ──────────────────────────────────────────────────
// Returns true if all three mastery conditions are met.
// recentResponses: array of last N responses for this KC (newest first)
// Each: { correct: boolean }
export function checkMastery(pMastery, recentResponses) {
  if (pMastery < MASTERY_THRESHOLD) return false;
  if (recentResponses.length < 3) return false;

  const lastThree = recentResponses.slice(0, 3);
  const allCorrect = lastThree.every(r => r.correct === true);
  return allCorrect;
}

// ── Spaced resurfacing schedule ────────────────────────────────────────────
// Cepeda et al. (2006) — calibrated for lifetime retention
// Returns next resurfacing date given resurface count (0-indexed)
export function nextResurfaceDate(resurface_count) {
  const intervals = [1, 5, 21, 90, 180]; // days
  const days = intervals[resurface_count] ?? 180;
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date;
}

// ── Expected mastery gain ──────────────────────────────────────────────────
// Used by the sequencer to prioritise which KC to practice next.
// Higher EMG = more likely to push this learner toward mastery on the next attempt.
export function expectedMasteryGain(pMastery, kcId) {
  const params = BKT_PARAMS[kcId];
  if (!params) return 0;
  const { pS, pG, pT } = params;

  // Expected P(mastery) after one more interaction, weighted by P(correct)
  const pCorrect = pMastery * (1 - pS) + (1 - pMastery) * pG;
  const pAfterCorrect   = updateBKT(pMastery, true, kcId);
  const pAfterIncorrect = updateBKT(pMastery, false, kcId);

  const expectedNext = pCorrect * pAfterCorrect + (1 - pCorrect) * pAfterIncorrect;
  return expectedNext - pMastery;
}
