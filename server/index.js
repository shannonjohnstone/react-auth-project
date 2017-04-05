const express = require('express')
const http = require('http')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const router = require('./router')
const mongoose = require('mongoose')

// Connect to mongoose
mongoose.connect('mongodb://localhost:auth/auth')

// App Setup
const PORT = process.env.PORT || 3001
const app = express()

// Middleware
app.use(morgan('combined')) // logging
app.use(bodyParser.json({ type: '*/*' }))

// Routes
router(app)

// Create server
const server = http.createServer(app)
server.listen(PORT, () => console.log(`App working on ${PORT}`))
