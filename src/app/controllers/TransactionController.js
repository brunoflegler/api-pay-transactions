'use strict'

const { Transaction } = require('../models')

const Sequelize = require('sequelize')
const Op = Sequelize.Op
const db = require('./../../app/models')

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
    const sequelizeTransaction = await db.sequelize.transaction()

    try {
      const transaction = await Transaction.create(
        {
          ...data,
          userId: req.user.id
        },
        {
          transaction: sequelizeTransaction
        }
      )

      await sequelizeTransaction.commit()
      return res.json(transaction)
    } catch (err) {
      await sequelizeTransaction.rollback()
      return res.status(500).json({ message: 'Transaction error' })
    }
  }
}

module.exports = new TransactionController()
