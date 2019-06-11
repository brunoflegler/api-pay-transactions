const chai = require('chai')
const factories = require('../factories')

const {
  validateAndFormatTransaction
} = require('./../../src/app/models/hooks/ValidateNumberCard')

const { expect } = chai

describe('Transactions rules', () => {
  it('Validate rule numberCard save four digits ', async () => {
    const transaction = await factories.attrs('Transaction')
    const { numberCard } = validateAndFormatTransaction(transaction)
    expect(numberCard.toString().length).to.equal(4)
  })
})
