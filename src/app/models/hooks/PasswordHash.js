'use strict'

const bcrypt = require('bcrypt')

async function passwordHash (user) {
  user.passwordHash = await bcrypt.hash(user.password, 10)
}

module.exports = {
  passwordHash
}
