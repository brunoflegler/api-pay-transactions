const jwt = require('jsonwebtoken')
const authConfig = require('../../config/auth')
const { promisify } = require('util')

const { User } = require('../models')

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided' })
  }

  const [, token] = authHeader.split(' ')

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret)

    const user = await User.findByPk(decoded.id)

    if (!user) {
      return res.status(401).json({ error: 'User not found' })
    }

    req.user = { id: user.id }

    next()
  } catch (err) {
    console.log(err)
    return res.status(401).json({ err })
  }
}
