const express = require('express')
const Router = express.Router()
const validate = require('express-validation')
const handle = require('express-async-handler')

const controllers = require('./app/controllers')
const validators = require('./app/validators')
const authMiddleware = require('./app/middlewares/auth')

Router.use('/v1', authMiddleware)

/**
 * transactions
 */

Router.get('/v1/transactions', handle(controllers.TransactionController.index))

module.exports = Router
