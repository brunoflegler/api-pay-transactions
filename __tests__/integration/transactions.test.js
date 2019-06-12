const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../../src/index')

const { Transaction } = require('../../src/app/models')
const factories = require('../factories')

const { expect } = chai
chai.use(chaiHttp)

describe('Transactions by user', () => {
  beforeEach(async () => {
    await Transaction.destroy({
      where: {}
    })
  })

  it('GET /transactions it should be not able list transactions', async () => {
    const user = await factories.create('User')
    const token = await user.generateToken()

    const response = await chai
      .request(server)
      .get('/transactions')
      .set('Authorization', `Bearer ${token}`)
    expect(response).to.be.status(200)
  })

  it('GET /transactions it should be not able doing transactions without found user', async () => {
    const response = await chai
      .request(server)
      .get('/transactions')
      .set(
        'Authorization',
        `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTY2LCJpYXQiOjE1NjAzMzg2NjEsImV4cCI6MTU2MDM0MjI2MX0.2GJsHpPDNauCts9hD1L-EkBAiI5_LM8hPIoOkB_7TEg`
      )
    expect(response).to.be.status(401)
  })

  it('GET /transactions it should be not able doing transactions token badly formatted ', async () => {
    const response = await chai
      .request(server)
      .get('/transactions')
      .set(
        'Authorization',
        `Bearer eyJhbGciasdadfasOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTY2LCJpYXQiOjE1NjAzMzg2NjEsImV4cCI6MTU2MDM0MjI2MX0.2GJsHpPDNauCts9hD1L-EkBAiI5_LM8hPIoOkB_7TEg`
      )
    expect(response).to.be.status(401)
  })

  it('POST /transactions it should be not able transactions without authenticate token', async () => {
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
