const { Payable, Transaction } = require('../models')

const Sequelize = require('sequelize')
const Op = Sequelize.Op

class PayableController {
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
        status: { [Op.eq]: req.params.status }
      }
    })

    const sum = payables.reduce((acc, i) => acc + parseFloat(i.fee), 0)

    return res.json({ total: sum })
  }
}

module.exports = new PayableController()
