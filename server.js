import express from 'express';
import session from 'express-session';
import pg from 'pg';
import connectPgSimple from 'connect-pg-simple';
import path from 'path';
import { fileURLToPath } from 'url';

// Routes
import authRouter from './routes/auth.js';
import situationsRouter from './routes/situations.js';
import storiesRouter from './routes/stories.js';
import dialogueRouter from './routes/dialogue.js';
import progressRouter from './routes/progress.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

// ── Database pool ──────────────────────────────────────────────────────────
export const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

// ── Session store ──────────────────────────────────────────────────────────
const PgSession = connectPgSimple(session);

// ── Middleware ─────────────────────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  store: new PgSession({
    pool,
    tableName: 'user_sessions',
    createTableIfMissing: true,
  }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  },
}));

// ── Static files ───────────────────────────────────────────────────────────
app.use(express.static(path.join(__dirname, 'public')));

// ── Auth guard middleware ──────────────────────────────────────────────────
// Attach user to every request if logged in
app.use((req, res, next) => {
  res.locals.userId = req.session.userId || null;
  next();
});

// Protected route guard — call this on any route that requires login
export function requireAuth(req, res, next) {
  if (!req.session.userId) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  next();
}

// ── API routes ─────────────────────────────────────────────────────────────
app.use('/api/auth', authRouter);
app.use('/api/situations', situationsRouter);
app.use('/api/stories', storiesRouter);
app.use('/api/dialogue', dialogueRouter);
app.use('/api/progress', progressRouter);

// ── Root ───────────────────────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ── 404 ────────────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// ── Error handler ──────────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong' });
});

// ── Start ──────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`Attune running on port ${PORT}`);
});
