import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import passport from 'passport';

import authRoutes from './routes/auth.route.js';
import resumeRoutes from './routes/resume.route.js';

const app = express();

app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}));
app.use(express.json({ limit: '5mb' }));
app.use(cookieParser());
app.use(passport.initialize());

app.use('/api/auth', authRoutes);
app.use('/api/resumes', resumeRoutes);

app.get('/', (req, res) => res.send('✅ Resumatic Backend Running Successfully'));

export { app };