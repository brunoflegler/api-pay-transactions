const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../../src/server')

const { User } = require('../../src/app/models')
const factories = require('../factories')

const { expect } = chai
chai.use(chaiHttp)

describe('Authenticate a user', () => {
  beforeEach(async () => {
    await User.destroy({
      where: {}
    })
  })

  describe('Sign in', () => {
    it('GET /users it should be not able list users', async () => {
      const user = await factories.create('User')
      const token = await user.generateToken()

      const response = await chai
        .request(server)
        .get('/users')
        .set('Authorization', `Bearer ${token}`)
      expect(response).to.be.status(200)
    })

    it('POST /sessions it should be able validate password user', async () => {
      const user = await factories.create('User', { password: '654321' })

      const response = await chai
        .request(server)
        .post('/sessions')
        .send({
          email: user.email,
          password: '123456'
        })

      expect(response).to.be.status(400)
    })

    it('POST /sessions it should be able authenticate a user', async () => {
      const user = await factories.create('User', { password: '123456' })

      const response = await chai
        .request(server)
        .post('/sessions')
        .send({
          email: user.email,
          password: '123456'
        })

      expect(response.body).to.be.property('token')
      expect(response).to.be.status(200)
    })

    it('POST /sessions it should be able validate user exists ', async () => {
      const user = await factories.attrs('User', { password: '123456' })

      const response = await chai
        .request(server)
        .post('/sessions')
        .send({
          email: user.email,
          password: '123456'
        })

      expect(response.body).to.be.property('message')
      expect(response).to.be.status(400)
    })

    it('POST /sessions it should be able validate password ', async () => {
      const user = await factories.attrs('User', { password: '123456' })

      const response = await chai
        .request(server)
        .post('/sessions')
        .send({
          email: user.email,
          password: '1234568='
        })

      expect(response.body).to.be.property('message')
      expect(response).to.be.status(400)
    })
  })

  describe('Sign up', () => {
    it('POST /users it should be able to sign up', async () => {
      const user = await factories.attrs('User')

      const response = await chai
        .request(server)
        .post('/users')
        .send(user)

      expect(response).to.have.status(200)
      expect(response.body).to.have.property('email')
    })

    it('POST /users it should be able validate email duplicated', async () => {
      const user = await factories.create('User')
      const userDuplicated = await factories.attrs('User', {
        email: user.email
      })
      const response = await chai
        .request(server)
        .post('/users')
        .send(userDuplicated)

      expect(response).to.have.status(500)
    })

    it('POST /users it should be able validate fields', async () => {
      const user = {}

      const response = await chai
        .request(server)
        .post('/users')
        .send(user)

      expect(response).to.have.status(500)
    })
  })
})
