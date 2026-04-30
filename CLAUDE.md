# CLAUDE.md — Attune

**Site name:** Attune
**Subtitle:** Learn to live well
**Domain:** attune.courses

Read this file completely before writing any code. Every decision in this codebase has a reason. This file is the authoritative source for architecture, content rules, database schema, and build order.

---

## Visual identity

**Typeface:** EB Garamond — Google Fonts — used for everything. One typeface, used well.
`<link href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400&display=swap" rel="stylesheet">`

**Color palette — CSS variables (define in `:root` in `main.css`):**
```css
:root {
  --bg:           #F4F5F6;   /* page background — cool off-white */
  --surface:      #FFFFFF;   /* cards, content areas */
  --text:         #1C1F24;   /* primary text */
  --text-muted:   #6B7280;   /* supporting copy, labels */
  --accent:       #4A7C8E;   /* muted teal — links, CTAs, active states */
  --accent-light: #E8F1F4;   /* hover states, subtle highlights */
  --border:       #E2E5E9;   /* dividers, card borders */
  --error:        #B91C1C;   /* error states only */
}
```

**Voice:** Warm but not soft. Direct without being blunt. Never preachy. The platform sounds like a thoughtful person, not an app.

**Wordmark treatment:** "Attune" in EB Garamond 500 weight. "Learn to live well" beneath it in EB Garamond 400 italic, `--text-muted` color.

---

## What this platform is

A learning platform that helps teenagers develop strong character through practice, story, and reflection. It does not teach philosophy. The learner encounters questions about their own life and is helped to think clearly about them.

**The learner never feels like they are being taught a subject. They feel like they are being helped with something they are already living.**

The platform is built on two invisible foundations: a world-class learning science framework (Bayesian Knowledge Tracing, spaced repetition, interleaving, Cognitive Load Theory) and a rigorous ethical architecture called the Integral Liberty Ethics Engine (ILEE). Neither is visible to the learner. Both govern every design decision.

---

## Tech stack

**Backend**
- Node.js — runtime
- Express.js — web server and all API routes
- `pg` — PostgreSQL client
- `@anthropic-ai/sdk` — Claude API calls for dialogue modes
- `express-session` + `bcrypt` — auth

**Frontend**
- Vanilla HTML, CSS, JavaScript — no framework, no bundler, no build step
- EB Garamond via Google Fonts — primary typeface
- Static HTML files served by Express from `public/`

**Infrastructure**
- Railway — hosting, PostgreSQL database, environment variables
- GitHub — source control, auto-deploys to Railway on push
- Namecheap — domain DNS

**What this means for you:**
- Every file you write is exactly what runs in production
- No transpilation, no webpack, no npm build scripts
- CSS and JS are plain files linked from HTML
- All data access is server-side via Express routes
- The Anthropic API is called server-side — never expose the API key to the client

---

## File structure

```
/
├── CLAUDE.md               ← this file
├── server.js               ← Express app entry point
├── package.json
├── .env                    ← never commit this
├── db/
│   ├── schema.sql          ← full database schema, run once
│   └── seed.sql            ← situation bank, stories (generated from content files)
├── routes/
│   ├── auth.js             ← register, login, logout
│   ├── situations.js       ← session queue, response submission, BKT update
│   ├── stories.js          ← story retrieval, mark read
│   ├── dialogue.js         ← Think it through and L3 conflict API routes
│   └── progress.js         ← Your path data endpoint
├── engine/
│   ├── bkt.js              ← Bayesian Knowledge Tracing update equations
│   ├── sequencer.js        ← session queue construction algorithm
│   ├── patterns.js         ← pattern detection for Your path
│   └── recommender.js      ← Your next steps recommendation logic
├── content/
│   ├── situations.js       ← all 72 situations as JS objects (exported)
│   └── stories.js          ← all 18 stories as JS objects (exported)
└── public/
    ├── index.html          ← entry experience (3-question onboarding)
    ├── session.html        ← guided questions mode
    ├── stories.html        ← see it lived mode
    ├── story.html          ← individual story view
    ├── dialogue.html       ← think it through mode
    ├── path.html           ← your path screen
    ├── css/
    │   └── main.css
    └── js/
        ├── session.js
        ├── stories.js
        ├── dialogue.js
        └── path.js
```

---

## Database schema

Run `db/schema.sql` once on a fresh Railway Postgres database.

```sql
-- Users / auth
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- KC mastery state per learner (one row per learner per KC)
CREATE TABLE kc_states (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  kc_id TEXT NOT NULL,                    -- e.g. 'H-L1', 'Co-L2'
  mastery FLOAT NOT NULL DEFAULT 0.0,     -- 0.0–1.0, never round
  interaction_count INTEGER DEFAULT 0,
  mastered BOOLEAN DEFAULT FALSE,
  mastery_date TIMESTAMPTZ,
  resurface_count INTEGER DEFAULT 0,
  next_resurface_date TIMESTAMPTZ,
  situations_used TEXT[] DEFAULT '{}',    -- situation IDs used for this KC
  mastery_situation_id TEXT,              -- situation that triggered mastery
  UNIQUE(user_id, kc_id)
);

-- Full response history
CREATE TABLE responses (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  session_id TEXT NOT NULL,
  situation_id TEXT NOT NULL,
  kc_id TEXT NOT NULL,
  correct BOOLEAN NOT NULL,
  distractor_chosen TEXT,                 -- option letter if wrong: 'A','B','D'
  response_time_ms INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Stories read
CREATE TABLE stories_read (
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  story_id TEXT NOT NULL,
  read_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, story_id)
);

-- L3 dialogue engagements
CREATE TABLE l3_engagements (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  conflict_pair TEXT NOT NULL,            -- 'L3-01' through 'L3-15'
  started_at TIMESTAMPTZ DEFAULT NOW(),
  completed BOOLEAN DEFAULT FALSE,
  exchange_count INTEGER DEFAULT 0,
  both_sides_named BOOLEAN DEFAULT FALSE
);

-- Think it through sessions
CREATE TABLE tit_sessions (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  entry_point TEXT,                       -- 'navigation','post_situation','post_story'
  started_at TIMESTAMPTZ DEFAULT NOW(),
  completed BOOLEAN DEFAULT FALSE,
  exchange_count INTEGER DEFAULT 0
);

-- Pattern flags (computed at session end, read by Your path)
CREATE TABLE pattern_flags (
  user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  flags JSONB DEFAULT '{}',               -- { "P-01": true, "P-07": true, ... }
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Session metadata
CREATE TABLE sessions_meta (
  id TEXT PRIMARY KEY,                    -- session UUID
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  ended_at TIMESTAMPTZ,
  situations_shown TEXT[],
  is_novice BOOLEAN DEFAULT TRUE
);
```

---

## The six virtue domains and 12 KCs

The platform tracks mastery on 12 knowledge components across 6 domains. L3 conflict situations are handled by dialogue, not BKT.

| KC ID  | Domain            | Level | Type        |
|--------|-------------------|-------|-------------|
| H-L1   | Honesty           | L1    | Recognition |
| H-L2   | Honesty           | L2    | Application |
| Co-L1  | Courage           | L1    | Recognition |
| Co-L2  | Courage           | L2    | Application |
| Fa-L1  | Fairness          | L1    | Recognition |
| Fa-L2  | Fairness          | L2    | Application |
| Re-L1  | Restraint         | L1    | Recognition |
| Re-L2  | Restraint         | L2    | Application |
| Hu-L1  | Humility          | L1    | Recognition |
| Hu-L2  | Humility          | L2    | Application |
| Ca-L1  | Care for Others   | L1    | Recognition |
| Ca-L2  | Care for Others   | L2    | Application |

**L2 unlock gate:** A learner cannot receive L2 situations for a domain until P(mastery) ≥ 0.95 on that domain's L1 KC.

**L3 unlock gate:** Both L2 KCs for the relevant domains must be mastered before an L3 conflict pair is surfaced.

---

## BKT parameters

These are the starting estimates. Do not change them without a parameter estimation pass on real data.

### L1 Recognition KCs
| KC ID  | P(L0) | P(T)  | P(S)  | P(G)  |
|--------|-------|-------|-------|-------|
| H-L1   | 0.35  | 0.25  | 0.08  | 0.25  |
| Co-L1  | 0.30  | 0.22  | 0.10  | 0.22  |
| Fa-L1  | 0.40  | 0.28  | 0.08  | 0.28  |
| Re-L1  | 0.25  | 0.20  | 0.10  | 0.20  |
| Hu-L1  | 0.30  | 0.22  | 0.09  | 0.22  |
| Ca-L1  | 0.38  | 0.26  | 0.08  | 0.26  |

### L2 Application KCs
| KC ID  | P(L0) | P(T)  | P(S)  | P(G)  |
|--------|-------|-------|-------|-------|
| H-L2   | 0.12  | 0.18  | 0.12  | 0.18  |
| Co-L2  | 0.10  | 0.16  | 0.12  | 0.16  |
| Fa-L2  | 0.14  | 0.20  | 0.10  | 0.20  |
| Re-L2  | 0.08  | 0.15  | 0.12  | 0.15  |
| Hu-L2  | 0.12  | 0.18  | 0.11  | 0.18  |
| Ca-L2  | 0.15  | 0.20  | 0.10  | 0.20  |

### BKT update equations

Run after every response, before surfacing the next situation. Maintain full float precision — never round.

```js
function updateBKT(pMastery, correct, params) {
  const { pS, pG, pT } = params;

  let pMasteryUpdated;
  if (correct) {
    const denom = pMastery * (1 - pS) + (1 - pMastery) * pG;
    pMasteryUpdated = (pMastery * (1 - pS)) / denom;
  } else {
    const num = pMastery * pS;
    const denom = pMastery * pS + (1 - pMastery) * (1 - pG);
    pMasteryUpdated = num / denom;
  }

  // Apply learning rate
  return pMasteryUpdated + (1 - pMasteryUpdated) * pT;
}
```

### Mastery determination

A KC is marked mastered when ALL THREE conditions are met:
1. P(mastery) ≥ 0.95
2. Last 3 interactions for this KC were correct
3. None of those 3 showed a slip

On mastery, set `mastered = true`, record `mastery_date`, and schedule resurfacing.

### Spaced resurfacing schedule

| Resurfacing # | Days after previous mastery event |
|---------------|----------------------------------|
| 1st           | 1 day                            |
| 2nd           | 5 days                           |
| 3rd           | 21 days                          |
| 4th           | 90 days                          |
| 5th+          | 180 days                         |

Each resurfacing must use a **different situation** from the same KC. Never repeat the mastery situation.

---

## Session sequencing rules

Target: 6 situations per session. Reduce to 4 for the first 3 sessions (novice protection).

A learner is **novice** if total KC interactions < 12.

### Three pools

- **Pool A (New):** KCs with zero interactions. Max 1 per session for novice learners.
- **Pool B (Practice):** KCs introduced but P(mastery) < 0.95. Prioritise by expected mastery gain.
- **Pool C (Resurface):** Mastered KCs whose `next_resurface_date` ≤ NOW + 24h.

### Interleaving rule — NON-NEGOTIABLE

No two consecutive situations in a session may share a virtue domain. If only one active domain exists, surface a story or Think it through prompt rather than break the interleaving rule.

### Situation selection within a KC

Never show a situation already in `situations_used` for that learner/KC. If the bank is exhausted for a KC, treat that KC as mastered for scheduling purposes and move to resurfacing.

---

## The Claude API — dialogue modes

Two modes call the Anthropic API: **Think it through** and **Level 3 conflict handling**.

Both use `claude-sonnet-4-6`. Both pass full conversation history on every call. There is no persistent memory — history is maintained client-side and sent on each turn.

```js
// server-side API call pattern
const response = await anthropic.messages.create({
  model: 'claude-sonnet-4-6',
  max_tokens: 300,
  system: SYSTEM_PROMPT, // differs per mode — see routes/dialogue.js
  messages: conversationHistory // full history from client
});
```

**max_tokens is 300. Do not raise it.** The system prompt constrains responses to under 80 words.

### Think it through — system prompt

```
You are a thinking partner helping a teenager work through a real situation from their own life. You are not a therapist, a teacher, or an advice-giver.

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

If they describe abuse, self-harm, or danger: stop the dialogue and respond only with: "What you're describing sounds serious. Please talk to a trusted adult or contact a crisis line."

If they ask what you think they should do: "I can't tell you what to do — and I don't think you actually want me to. What's the part that feels most stuck?"
```

### Level 3 conflict — system prompt

```
You are helping a teenager think through a situation where two things they care about are pulling in different directions. There is no clean answer. Your job is to help them hold both sides — not resolve the tension.

Rules you must follow without exception:
- Never name the virtues in tension (do not say "honesty" or "loyalty")
- Never tell them which side wins
- Never say there is a right answer
- Keep both sides alive — if they collapse to one side, surface the cost of that
- One question per response, maximum
- Under 80 words per response
- Minimum 4 exchanges before closure

Closure (only after 4+ exchanges and learner has articulated what they would do):
Acknowledge specifically what they worked out. Name it in their own language. Ask if they want to keep going or stop.

If they describe abuse, self-harm, or danger: stop immediately. "What you're describing sounds serious. Please talk to a trusted adult."
```

---

## Content rules — hard constraints

These apply to every string of text that reaches the learner. Violating them breaks the platform's fundamental design.

**Never use these words in learner-facing content:**
- ethics, virtue, character, moral
- knowledge component, mastery, BKT
- score, points, streak, badge, level

**Never:**
- Shame a wrong answer ("that's incorrect" is fine; "you failed" is not)
- Tell the learner what kind of person to be
- Ask the learner to evaluate themselves
- Use gamification language
- Show P(mastery) values or percentages to the learner

**Always:**
- Frame wrong answers diagnostically — name what was structurally happening
- Connect the principle to what it produces in a life (not to an abstraction)
- Treat both parties in every situation as real people
- Keep the social context realistic for teenagers

---

## Your path screen — display logic

Three-state domain display. Never show BKT numbers.

| State           | Label shown       | Condition                              |
|-----------------|-------------------|----------------------------------------|
| Not started     | Not explored yet  | Zero interactions with L1 KC           |
| In progress     | Building          | L1 interactions exist, P(mastery) < 0.95 |
| Consolidated    | Solid             | L1 P(mastery) ≥ 0.95                  |

L2 sub-indicator appears only after L2 is unlocked (L1 mastered). Same 3 states.

L3 situations: not shown in domain grid. Surfaced only in "What's worth doing next" when both prerequisite L2 KCs are mastered.

Pattern feedback: shown only after ≥ 8 interactions across ≥ 2 domains. Maximum 2 pattern messages at a time. Under 60 words each. Observational only — never diagnoses character.

---

## The 15 L3 conflict pairs

| ID    | Domains in tension              |
|-------|---------------------------------|
| L3-01 | Honesty × Care for Others       |
| L3-02 | Honesty × Courage               |
| L3-03 | Honesty × Fairness              |
| L3-04 | Courage × Restraint             |
| L3-05 | Courage × Fairness              |
| L3-06 | Courage × Care for Others       |
| L3-07 | Courage × Humility              |
| L3-08 | Fairness × Care for Others      |
| L3-09 | Fairness × Restraint            |
| L3-10 | Fairness × Humility             |
| L3-11 | Restraint × Care for Others     |
| L3-12 | Restraint × Humility            |
| L3-13 | Humility × Care for Others      |
| L3-14 | Honesty × Restraint             |
| L3-15 | Honesty × Humility              |

L3 pairs are not resurfaced for 90 days after completion.

---

## Environment variables

Required in Railway and in `.env` locally:

```
DATABASE_URL=            # Railway Postgres connection string
ANTHROPIC_API_KEY=       # sk-ant-...
SESSION_SECRET=          # long random string for express-session
PORT=3000                # Railway sets this automatically
```

---

## Build order

Do not skip steps. Each step depends on the previous.

1. **Schema** — `db/schema.sql` created and run on Railway Postgres
2. **Auth** — register/login/logout routes, session middleware, password hashing
3. **Content data** — `content/situations.js` and `content/stories.js` — all 72 situations and 18 stories as structured JS objects; `db/seed.sql` to populate reference tables
4. **BKT engine** — `engine/bkt.js` — update equations, mastery determination
5. **Sequencer** — `engine/sequencer.js` — three-pool session queue builder
6. **Situations API** — `routes/situations.js` — serve queue, receive responses, trigger BKT update
7. **Session UI** — `public/session.html` + `public/js/session.js` — guided questions mode
8. **Stories** — `routes/stories.js` + `public/stories.html` + `public/story.html`
9. **Dialogue** — `routes/dialogue.js` + `public/dialogue.html` + `public/js/dialogue.js`
10. **Pattern detection** — `engine/patterns.js` — runs at session end
11. **Recommender** — `engine/recommender.js` — Your next steps algorithm
12. **Your path** — `routes/progress.js` + `public/path.html` + `public/js/path.js`
13. **Entry experience** — `public/index.html` — 3-question onboarding

---

## Reference documents

Full specifications for each system are in the project knowledge. If you need detail beyond what's in this file, ask to search for:

- **Adaptive engine spec** — full BKT pseudocode, sequencing algorithm, L3 dialogue prompts
- **Dialogue mode spec** — complete system prompts, response patterns, escalation logic, API integration
- **Progress screen spec** — pattern detection logic, all 8 pattern message templates, recommendation algorithm pseudocode, full data contract
- **Situation bank v3** — all 72 situations with setups, options, and feedback (72 situations: 18 original + 54 variants)
- **Story library** — all 18 stories with full text, pull quotes, unpack prompts
- **QA flag revisions** — the 7 revised feedback lines and the Escalante story replacement

---

## What Claude Code should never do

- Import a frontend framework (React, Vue, etc.)
- Add a build step or bundler
- Use ORMs — raw `pg` queries only
- Round BKT float values
- Show mastery percentages or BKT numbers to the learner
- Call the Anthropic API from client-side JavaScript
- Lower the mastery threshold below 0.95
- Break the interleaving rule (no consecutive same-domain situations)
- Use the words ethics, virtue, character, or moral in learner-facing copy
```
