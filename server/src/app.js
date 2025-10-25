import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import './config/env.js';
import { connectDB } from './config/db.js';
import healthRouter from './routes/health.routes.js';
import { notFoundHandler, errorHandler } from './middleware/errorHandler.js';

import passport from 'passport';
import { initPassport } from './config/passport.js';
import authRouter from './routes/auth.routes.js';
import imagesRouter from './routes/images.routes.js';
import usersRouter from './routes/users.routes.js';
import adminRouter from './routes/admin.routes.js';
import paymentsRouter from './routes/payments.routes.js';

const app = express();

// DB
connectDB();

// Security & utils
app.use(helmet());
app.use(morgan('dev'));
app.use(cookieParser());

// Passport
initPassport();
app.use(passport.initialize());

// CORS
const corsOption = {
    // origin: "http://localhost:5173",
    origin: process.env.CLIENT_URL,
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true,
    allowedHeaders: ['Authorization', 'Content-Type'],
};
app.use(cors(corsOptions));

// Body parsers
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/health', healthRouter);
app.use('/api/auth', authRouter);
app.use('/api/images', imagesRouter);
app.use('/api/users', usersRouter);
app.use('/api/admin', adminRouter);
app.use('/api/payments', paymentsRouter);

// 404
app.use(notFoundHandler);

// Errors
app.use(errorHandler);

export default app;
