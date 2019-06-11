'use strict'

const { User } = require('../models')

class UserController {
  async index (req, res) {
    const users = await User.findAll({})
    return res.json(users)
  }

  async store (req, res) {
    const { ...data } = req.body

    const user = await User.create({ ...data })
    return res.json(user)
  }
}

module.exports = new UserController()
