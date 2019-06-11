const moment = require('moment')
const StatusPayable = require('./../enums/StatusPayable')

class DiscountDebitCard {
  calculate (transaction) {
    return {
      paymentDate: moment(),
      fee: transaction.value * 0.97,
      status: StatusPayable.PAID,
      transactionId: transaction.id
    }
  }
}

module.exports = new DiscountDebitCard()
