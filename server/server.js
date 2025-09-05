import * as dotenv from 'dotenv';
dotenv.config();

import morgan from 'morgan'
import express from "express";
import mongoose from 'mongoose'
const app = express()

import userRouter from './routes/userRouter.js'
import activityRouter from './routes/activityRouter.js'

app.use(express.json())
app.use('/api/v1/users', userRouter)
app.use('/api/v1/activity', activityRouter)

// app.use('*', (req, res) => {
//   res.status(404).json({ msg: 'not found' })
// })

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