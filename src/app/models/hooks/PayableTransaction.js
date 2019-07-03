const MethodPayment = require('../../enums/MethodPayment')

const DiscountDebitCard = require('../../strategies/DiscountDebitCard')
const DiscountCreditCard = require('../../strategies/DiscountCreditCard')

async function createPayableByTransaction (
  transaction,
  { transaction: sequelizeTransaction }
) {
  const payable = validateMethodPayment(transaction, {
    transaction: sequelizeTransaction
  })

  await this.associations.payable.target.create(payable, {
    transaction: sequelizeTransaction
  })
}

function validateMethodPayment (transaction) {
  const methodPayment =
    transaction.methodPayment === MethodPayment.DEBIT_CARD
      ? DiscountDebitCard
      : DiscountCreditCard

  return methodPayment.calculate(transaction)
}

module.exports = {
  createPayableByTransaction,
  validateMethodPayment
}
