'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('transactions', ['user_id'], {
      type: 'FOREIGN KEY',
      name: 'fk_transaction_x_user_id',
      references: {
        table: 'users',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint(
      'transactions',
      'fk_transaction_x_user_id'
    )
  }
}
