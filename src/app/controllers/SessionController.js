'use strict'

const { User } = require('../models')

const Sequelize = require('sequelize')
const Op = Sequelize.Op

class SessionController {
  async store (req, res) {
    const { email, password } = req.body

    const user = await User.findOne({ where: { email: { [Op.eq]: email } } })

    if (!user) {
      return res.status(400).json({ message: 'User not found' })
    }

    if (!(await user.compareHash(password))) {
      return res.status(400).json({ message: 'Invalid password' })
    }

    return res.json({ token: user.generateToken() })
  }
}

module.exports = new SessionController()
