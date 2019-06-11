const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../../src/index')

const { Transaction, User } = require('../../src/app/models')
const factories = require('../factories')

const { expect } = chai
chai.use(chaiHttp)

describe('Payables by user', () => {
  beforeEach(async () => {
    await Transaction.destroy({
      where: {}
    })

    await User.destroy({
      where: {}
    })
  })

  it('POST /payables/availables it should be everything the customer has already received ', async () => {
    const user = await factories.create('User')

    await factories.create('Transaction', {
      value: 100,
      methodPayment: 'debit_card',
      userId: user.id
    })

    await factories.create('Transaction', {
      value: 100,
      methodPayment: 'debit_card',
      userId: user.id
    })

    const token = await user.generateToken()

    const response = await chai
      .request(server)
      .get('/payables/availables')
      .set('Authorization', `Bearer ${token}`)

    const { available } = response.body

    // discount 3% = (100 + 100) * 0.97
    expect(available).to.equals(194.0)
  })

  it('POST /payables/waitingfunds it should be everything the customer has to receive', async () => {
    const user = await factories.create('User')

    await factories.create('Transaction', {
      value: 100,
      methodPayment: 'credit_card',
      userId: user.id
    })

    await factories.create('Transaction', {
      value: 100,
      methodPayment: 'credit_card',
      userId: user.id
    })

    const token = await user.generateToken()

    const response = await chai
      .request(server)
      .get('/payables/waitingfunds')
      .set('Authorization', `Bearer ${token}`)

    const { available } = response.body

    // discount 5% = (100 + 100) * 0.95
    expect(available).to.equals(190.0)
  })
})
