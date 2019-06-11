const factoryGirl = require('factory-girl')
const faker = require('faker')
const { factory } = factoryGirl

const { User, Transaction } = require('../src/app/models')

/**
 * User
 */

factory.define('User', User, {
  email: factory.seq('User.email', u => `user_${u}@email.com`),
  password: faker.internet.password()
})

/**
 * Transactions
 */

factory.define('Transaction', Transaction, {
  value: faker.commerce.price,
  description: faker.commerce.productName,
  methodPayment: 'credit_card',
  numberCard: `1111222233334444`,
  nameHolderCard: faker.name.title,
  expireAtCard: '06/21',
  cvvCard: '111'
})

module.exports = factory
