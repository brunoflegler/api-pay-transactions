'use strict'

const { Transaction } = require('../models')

const Sequelize = require('sequelize')
const Op = Sequelize.Op

class TransactionController {
  async index (req, res) {
    const { page, limit } = req.query

    const transactions = await Transaction.findAll({
      where: {
        userId: {
          [Op.eq]: req.user.id
        }
      },
      order: [['createdAt', 'DESC']],
      offset: page - 1 || 0,
      limit: limit || 5,
      attributes: [
        'id',
        'value',
        'description',
        'methodPayment',
        'numberCard',
        'nameHolderCard',
        'expireAtCard',
        'cvvCard',
        'createdAt'
      ]
    })

    return res.json(transactions)
  }

  async store (req, res) {
    const { ...data } = req.body

    const transaction = await Transaction.create({
      ...data,
      userId: req.user.id
    })

    return res.json(transaction)
  }
}

module.exports = new TransactionController()
