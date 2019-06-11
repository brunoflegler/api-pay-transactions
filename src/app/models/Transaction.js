'use strict'

const moment = require('moment')

const { createPayableByTransaction } = require('./hooks/PayableTransaction')
const { validateAndFormatTransaction } = require('./hooks/ValidateNumberCard')

module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define(
    'Transaction',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      value: {
        type: DataTypes.NUMERIC(10, 2),
        allowNull: false,
        field: 'value'
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'description'
      },
      methodPayment: {
        type: DataTypes.ENUM('debit_card', 'credit_card'),
        allowNull: false,
        field: 'method_payment'
      },
      numberCard: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'number_card'
      },
      nameHolderCard: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'name_holder_card'
      },
      expireAtCard: {
        type: DataTypes.DATEONLY,
        field: 'expire_at_card',
        get: function () {
          return moment(this.getDataValue('expireAtCard')).format('MM/YY')
        },
        set: function (val) {
          return this.setDataValue('expireAtCard', moment(val, 'MM/YY'))
        }
      },
      cvvCard: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'cvv_card'
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: DataTypes.NOW
      }
    },
    {
      tableName: 'transactions',
      hooks: {
        beforeCreate: validateAndFormatTransaction,
        afterCreate: createPayableByTransaction
      }
    }
  )

  Transaction.associate = models => {
    Transaction.hasOne(models.Payable, {
      as: 'payable'
    })
    Transaction.belongsTo(models.User, {
      as: 'user'
    })
  }

  return Transaction
}
