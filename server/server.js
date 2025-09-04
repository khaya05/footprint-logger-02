import express from "express";
const app = express()

import userRouter from './routes/userRouter.js'


app.use(express.json())
app.use('/api/v1/users', userRouter)

const port = process.env.PORT || 5100

try {
  app.listen(port, () => {
    console.log(`App running on port ${port}`);

  })
} catch (error) {
  console.error(error)
  process.exit(1)
}