require('dotenv').config()
const express = require('express')
const chalk = require('chalk')

const connectDB = require('./config/db')
const userRoutes = require('./routes/user')
const authRoutes = require('./routes/auth')
const profileRoutes = require('./routes/profile')
const postRoutes = require('./routes/post')

const app = express()

// Adding Middleware
app.use(express.json({ extended: false }))

// Connecting to MongoDB database
connectDB()

app.get('/', (req, res) => res.send('<h1>DevStation server is up and running...</h1>'))

// Defining Routes
app.use('/api/users', userRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/profiles', profileRoutes)
app.use('/api/posts', postRoutes)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(chalk.blue(`Server started on port ${PORT}`)))
