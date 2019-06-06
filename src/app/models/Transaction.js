'use strict'

module.exports = (sequelize, DataTypes) => {
  const Schedule = sequelize.define(
    'Transaction',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      value: {
        type: DataTypes.NUMERIC(10,2),
        allowNull: false,
        field: 'value'
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
        type: DataTypes.DATE,
        allowNull: false,
        field: 'expire_at_card'
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
        defaultValue: new Date()
      },
    },
    {
      tableName: 'transactions'
    }
  )


  return Transaction
}
