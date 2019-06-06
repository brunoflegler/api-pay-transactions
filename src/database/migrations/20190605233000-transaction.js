'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      value: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false
      },
      method_payment: {
        type: Sequelize.ENUM('debit_card', 'credit_card'),
        allowNull: false
      },
      number_card: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      name_holder_card: {
        type: Sequelize.STRING,
        allowNull: false
      },
      expire_at_card: {
        allowNull: false,
        type: Sequelize.DATE
      },
      cvv_card: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('transactions')
  }
}
