const { Transaction } = require('../models')

const Sequelize = require('sequelize')
const Op = Sequelize.Op

class TransactionController {
  async index (req, res) {

    const transactions = Transaction.find({
      where: {} ,
      order: [['name', 'ASC'], ['createdAt', 'DESC']],
      attributes: ['id', 'value']
    })

    return res.json(transactions)
  }

  async store (req, res) {
    const { ...data } = req.body

    const transaction = await Transaction.create({ ...data})
    return res.json(transaction)
  }

}

module.exports = new TransactionController()
