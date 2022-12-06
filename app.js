const config = require('./utils/config')
const logger = require('./utils/logger')
const express = require('express')

const app = express()

const cors = require('cors')
const mongoose = require('mongoose')
require('express-async-errors')

const subscriptionRouter = require('./controllers/subscription')

const middleware = require('./utils/middleware')

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
    .then(() => {
        logger.info('connected to MongoDB')
    })
    .catch(err => {
        logger.error('error connecting to MongoDB:', err.message)
    })

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/subscriptions', subscriptionRouter)

app.use(middleware.unknownEndPoint)

module.exports = app