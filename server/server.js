import * as dotenv from 'dotenv';
dotenv.config();

import morgan from 'morgan'
import express from "express";
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser';
const app = express()

import userRouter from './routes/userRouter.js'
import authRouter from './routes/authRouter.js'
import activityRouter from './routes/activityRouter.js'
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';
import { authenticateUser } from './middleware/authMiddleware.js';

// middleware
app.use(express.json())
app.use(cookieParser())


// routes
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', authenticateUser, userRouter)
app.use('/api/v1/activities', authenticateUser, activityRouter)

app.use('*', (req, res) => {
  res.status(404).json({ msg: 'Route not found' });
});

// error handler
app.use(errorHandlerMiddleware)

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

const port = process.env.PORT || 5100

try {
  await mongoose.connect(process.env.MONGO_URL)
  app.listen(port, () => {
    console.log(`App running on port ${port}`);
  })
} catch (error) {
  console.error(error)
  process.exit(1)
}