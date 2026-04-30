import express from 'express';
import session from 'express-session';
import pg from 'pg';
import path from 'path';
import { fileURLToPath } from 'url';

import authRouter from './routes/auth.js';
import situationsRouter from './routes/situations.js';
import storiesRouter from './routes/stories.js';
import dialogueRouter from './routes/dialogue.js';
import progressRouter from './routes/progress.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

export const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('trust proxy', 1);

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: true,
    sameSite: 'none',
  },
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  res.locals.userId = req.session.userId || null;
  next();
});

export function requireAuth(req, res, next) {
  if (!req.session.userId) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  next();
}

app.use('/api/auth', authRouter);
app.use('/api/situations', situationsRouter);
app.use('/api/stories', storiesRouter);
app.use('/api/dialogue', dialogueRouter);
app.use('/api/progress', progressRouter);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong' });
});

app.listen(PORT, () => {
  console.log(`Attune running on port ${PORT}`);
});
