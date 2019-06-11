'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('payables', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      transaction_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      payment_date: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      fee: {
        allowNull: false,
        type: Sequelize.NUMERIC(10, 2)
      },
      status: {
        allowNull: false,
        type: Sequelize.ENUM('paid', 'waiting_funds')
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('payables')
  }
}
