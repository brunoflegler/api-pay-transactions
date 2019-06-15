'use strict'

const { User } = require('../models')

const Sequelize = require('sequelize')
const Op = Sequelize.Op

class UserController {
  async index (req, res) {
    const users = await User.findAll({
      attributes: ['id', 'email']
    })
    return res.json(users)
  }

  async store (req, res) {
    const { ...data } = req.body

    const hasUser = await User.findOne({
      where: { email: { [Op.eq]: data.email } }
    })

    if (hasUser) {
      return res.status(500).send({ message: 'User already exists' })
    }

    const {
      dataValues: { password, passwordHash, ...user }
    } = await User.create({ ...data })

    return res.json(user)
  }
}

module.exports = new UserController()
