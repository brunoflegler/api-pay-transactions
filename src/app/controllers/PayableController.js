const { Payable, Transaction } = require('../models')

const Sequelize = require('sequelize')
const Op = Sequelize.Op

class PayableController {
  async index (req, res) {
    const { page, limit } = req.query

    const payables = await Payable.findAll({
      include: [
        {
          model: Transaction,
          as: 'transaction',
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
          ],
          where: {
            userId: {
              [Op.eq]: req.user.id
            }
          }
        }
      ],
      offset: page - 1 || 0,
      limit: limit || 5,
      order: [['paymentDate', 'DESC']],
      attributes: ['id', 'paymentDate', 'fee', 'status']
    })

    return res.json(payables)
  }
}

module.exports = new PayableController()
