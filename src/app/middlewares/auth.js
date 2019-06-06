const jwt = require('jsonwebtoken')
const authConfig = require('../../config/auth')
const { promisify } = require('util')

const { Users } = require('../models')

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({ error: 'Authorization not provided' })
  }

  const [bearer, currentUser] = authHeader.split(' ')

  if (bearer !== 'Bearer') {
    return res.status(401).json({ error: 'Authorization not provided' })
  }

  try {
    if (!currentUser) {
      return res.status(401).json({ error: 'User current not provided' })
    }

    req.userCurrent = currentUser

    next()
  } catch (error) {
    return res.status(401).json({ error })
  }
}
