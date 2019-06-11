const { Payable, Transaction } = require('../models')
const StatusPayable = require('../enums/StatusPayable')

const Sequelize = require('sequelize')
const Op = Sequelize.Op

class AvailablePayableController {
  async index (req, res) {
    const payables = await Payable.findAll({
      include: [
        {
          model: Transaction,
          as: 'transaction',
          where: {
            userId: {
              [Op.eq]: req.user.id
            }
          }
        }
      ],
      attributes: ['fee'],
      where: {
        status: { [Op.eq]: StatusPayable.PAID }
      }
    })

    const sum = payables.reduce((acc, i) => acc + parseFloat(i.fee), 0)

    return res.json({ available: sum })
  }
}

module.exports = new AvailablePayableController()
