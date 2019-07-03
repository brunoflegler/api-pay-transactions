const moment = require('moment')
const StatusPayable = require('../enums/StatusPayable')

class DiscountCreditCard {
  calculate (transaction) {
    return {
      paymentDate: moment().add(30, 'days'),
      fee: transaction.value * 0.95,
      status: StatusPayable.WAITING_FUNDS,
      transactionId: transaction.id
    }
  }
}

module.exports = new DiscountCreditCard()
