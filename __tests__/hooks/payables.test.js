const chai = require('chai')
const factories = require('../factories')

const StatusPayable = require('./../../src/app/enums/StatusPayable')

const {
  validateMethodPayment
} = require('../../src/app/models/hooks/PayableTransaction')

const { expect } = chai

describe('Payables rules', () => {
  it('Validate rule status payable debit card ', async () => {
    const transaction = await factories.attrs('Transaction', {
      methodPayment: 'debit_card'
    })
    const payable = validateMethodPayment(transaction)

    expect(payable.status).to.equal(StatusPayable.PAID)
  })

  it('Validate rule fee 3% payable debit card', async () => {
    const transaction = await factories.attrs('Transaction', {
      methodPayment: 'debit_card',
      value: 100.0
    })
    const payable = validateMethodPayment(transaction)

    expect(payable.fee).to.equal(97.0)
  })

  it('Validate rule status payable credit card ', async () => {
    const transaction = await factories.attrs('Transaction', {
      methodPayment: 'credit_card'
    })
    const payable = validateMethodPayment(transaction)

    expect(payable.status).to.equal(StatusPayable.WAITING_FUNDS)
  })

  it('Validate rule fee 5% payable credit card ', async () => {
    const transaction = await factories.attrs('Transaction', {
      methodPayment: 'credit_card',
      value: 100.0
    })
    const payable = validateMethodPayment(transaction)

    expect(payable.fee).to.equal(95.0)
  })
})
