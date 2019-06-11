const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../../src/index')

const { User, Transaction } = require('../../src/app/models')
const factories = require('../factories')

const { expect } = chai
chai.use(chaiHttp)

describe('Transactions by user', () => {
  beforeEach(async () => {
    await Transaction.destroy({
      where: {}
    })
  })

  it('POST /transactions it should be not able transactions without authenticate', async () => {
    const response = await chai
      .request(server)
      .post('/transactions')
      .send({})
    expect(response).to.be.status(401)
  })

  it('POST /transactions it should be not able transactions without required fields', async () => {
    const user = await factories.create('User')
    const token = await user.generateToken()

    const response = await chai
      .request(server)
      .post('/transactions')
      .set('Authorization', `Bearer ${token}`)
      .send({})
    expect(response).to.be.status(400)
  })

  it('POST /transactions it should be able create transaction', async () => {
    const transaction = await factories.attrs('Transaction')
    const user = await factories.create('User')
    const token = await user.generateToken()

    const response = await chai
      .request(server)
      .post('/transactions')
      .set('Authorization', `Bearer ${token}`)
      .send(transaction)
    expect(response).to.be.status(200)
  })
})
