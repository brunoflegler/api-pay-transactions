'use strict'

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const { passwordHash } = require('./hooks/PasswordHash')
const authConfig = require('./../../config/auth')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'email'
      },
      password: {
        type: DataTypes.VIRTUAL,
        allowNull: false
      },
      passwordHash: {
        type: DataTypes.STRING,
        field: 'password_hash'
      }
    },
    {
      tableName: 'users',
      hooks: {
        beforeCreate: passwordHash
      }
    }
  )

  User.prototype.compareHash = function (password) {
    return bcrypt.compare(password, this.passwordHash)
  }

  User.prototype.generateToken = function () {
    return jwt.sign({ id: this.id }, authConfig.secret, {
      expiresIn: authConfig.ttl
    })
  }

  return User
}
