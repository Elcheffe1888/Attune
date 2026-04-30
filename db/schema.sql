-- Attune — schema.sql
-- Run once on a fresh Railway PostgreSQL database
-- Railway provides DATABASE_URL automatically

-- ── Users ──────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS users (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email        TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- ── Sessions (connect-pg-simple manages this table) ────────────────────────
-- connect-pg-simple creates this automatically via createTableIfMissing: true
-- Listed here for reference only:
-- CREATE TABLE user_sessions (
--   sid    VARCHAR NOT NULL COLLATE "default",
--   sess   JSON NOT NULL,
--   expire TIMESTAMPTZ NOT NULL,
--   PRIMARY KEY (sid)
-- );

-- ── KC mastery state — one row per learner per KC ──────────────────────────
CREATE TABLE IF NOT EXISTS kc_states (
  id                   SERIAL PRIMARY KEY,
  user_id              UUID REFERENCES users(id) ON DELETE CASCADE,
  kc_id                TEXT NOT NULL,             -- 'H-L1', 'Co-L2', etc.
  mastery              FLOAT NOT NULL DEFAULT 0.0, -- 0.0–1.0, full precision
  interaction_count    INTEGER DEFAULT 0,
  mastered             BOOLEAN DEFAULT FALSE,
  mastery_date         TIMESTAMPTZ,
  resurface_count      INTEGER DEFAULT 0,
  next_resurface_date  TIMESTAMPTZ,
  situations_used      TEXT[] DEFAULT '{}',        -- situation IDs shown to this learner for this KC
  mastery_situation_id TEXT,                       -- situation that triggered mastery
  UNIQUE(user_id, kc_id)
);

-- ── Response history ───────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS responses (
  id                SERIAL PRIMARY KEY,
  user_id           UUID REFERENCES users(id) ON DELETE CASCADE,
  session_id        TEXT NOT NULL,
  situation_id      TEXT NOT NULL,
  kc_id             TEXT NOT NULL,
  correct           BOOLEAN NOT NULL,
  distractor_chosen TEXT,                          -- 'A','B','C','D' if wrong
  response_time_ms  INTEGER,
  created_at        TIMESTAMPTZ DEFAULT NOW()
);

-- ── Stories read ───────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS stories_read (
  user_id   UUID REFERENCES users(id) ON DELETE CASCADE,
  story_id  TEXT NOT NULL,
  read_at   TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, story_id)
);

-- ── L3 dialogue engagements ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS l3_engagements (
  id              SERIAL PRIMARY KEY,
  user_id         UUID REFERENCES users(id) ON DELETE CASCADE,
  conflict_pair   TEXT NOT NULL,                   -- 'L3-01' through 'L3-15'
  started_at      TIMESTAMPTZ DEFAULT NOW(),
  completed       BOOLEAN DEFAULT FALSE,
  exchange_count  INTEGER DEFAULT 0,
  both_sides_named BOOLEAN DEFAULT FALSE
);

-- ── Think it through sessions ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS tit_sessions (
  id              SERIAL PRIMARY KEY,
  user_id         UUID REFERENCES users(id) ON DELETE CASCADE,
  entry_point     TEXT,                            -- 'navigation','post_situation','post_story'
  started_at      TIMESTAMPTZ DEFAULT NOW(),
  completed       BOOLEAN DEFAULT FALSE,
  exchange_count  INTEGER DEFAULT 0
);

-- ── Pattern flags — computed at session end, read by Your path ─────────────
CREATE TABLE IF NOT EXISTS pattern_flags (
  user_id     UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  flags       JSONB DEFAULT '{}',                  -- { "P-01": true, ... }
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ── Session metadata ───────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS sessions_meta (
  id                TEXT PRIMARY KEY,              -- UUID generated server-side
  user_id           UUID REFERENCES users(id) ON DELETE CASCADE,
  started_at        TIMESTAMPTZ DEFAULT NOW(),
  ended_at          TIMESTAMPTZ,
  situations_shown  TEXT[] DEFAULT '{}',
  is_novice         BOOLEAN DEFAULT TRUE
);

-- ── Indexes ────────────────────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_kc_states_user       ON kc_states(user_id);
CREATE INDEX IF NOT EXISTS idx_responses_user        ON responses(user_id);
CREATE INDEX IF NOT EXISTS idx_responses_session     ON responses(session_id);
CREATE INDEX IF NOT EXISTS idx_l3_engagements_user   ON l3_engagements(user_id);
CREATE INDEX IF NOT EXISTS idx_tit_sessions_user     ON tit_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_meta_user    ON sessions_meta(user_id);
