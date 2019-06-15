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

Router.post(
  '/users',
  validate(validators.User),
  handle(controllers.UserController.store)
)

/**
 * sessions
 */

Router.post('/sessions', handle(controllers.SessionController.store))

/**
 * List user
 */
Router.get('/users', authMiddleware, handle(controllers.UserController.index))

/**
 * transactions
 */

Router.get(
  '/transactions',
  authMiddleware,
  handle(controllers.TransactionController.index)
)
Router.post(
  '/transactions',
  authMiddleware,
  validate(validators.Transaction),
  handle(controllers.TransactionController.store)
)

/**
 * payables
 */

Router.get(
  '/payables',
  authMiddleware,
  handle(controllers.PayableController.index)
)

/**
 * avaiable payables
 */

Router.get(
  '/payables/availables',
  authMiddleware,
  handle(controllers.AvailablePayableController.index)
)

/**
 * waiting funds payables
 */

Router.get(
  '/payables/waitingfunds',
  authMiddleware,
  handle(controllers.WaitingFundsPayableController.index)
)

module.exports = Router
