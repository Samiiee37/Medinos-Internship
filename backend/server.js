import express from 'express'
import dotenv from 'dotenv'
import connectDB from './db/db.js'

dotenv.config()

const port = process.env.PORT || 8000
const URI = process.env.MONGODB_URI

const app = express()

// Middleware
app.use(express.json())

// Connect to DB
connectDB(URI)

// Routes (add here when ready)
// app.use('/api/auth', authRoutes)

app.listen(port, () => {
  console.log(`✅ Server is running on port ${port}`)
})
