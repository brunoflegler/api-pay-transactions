const express = require('express')
const Router = express.Router()
const validate = require('express-validation')
const handle = require('express-async-handler')

const controllers = require('./app/controllers')
const validators = require('./app/validators')
const authMiddleware = require('./app/middlewares/auth')

/**
 * users create
 */

Router.post('/users', handle(controllers.UserController.store))

/**
 * sessions
 */

Router.post('/sessions', handle(controllers.SessionController.store))

Router.use(authMiddleware)

/**
 * List user
 */
Router.get('/users', handle(controllers.UserController.index))

/**
 * transactions
 */

Router.get('/transactions', handle(controllers.TransactionController.index))
Router.post(
  '/transactions',
  validate(validators.Transaction),
  handle(controllers.TransactionController.store)
)

/**
 * payables
 */

Router.get('/payables', handle(controllers.PayableController.index))

/**
 * avaiable payables
 */

Router.get(
  '/payables/availables',
  handle(controllers.AvailablePayableController.index)
)

/**
 * waiting funds payables
 */

Router.get(
  '/payables/waitingfunds',
  handle(controllers.WaitingFundsPayableController.index)
)

module.exports = Router
