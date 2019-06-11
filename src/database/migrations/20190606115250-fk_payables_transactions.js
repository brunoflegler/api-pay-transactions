"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addConstraint("payables", ["transaction_id"], {
            type: "FOREIGN KEY",
            name: "fk_payables_x_transaction_id",
            references: {
                table: "transactions",
                field: "id"
            },
            onDelete: "cascade",
            onUpdate: "cascade"
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.removeConstraint(
            "payables",
            "fk_payables_x_transaction_id"
        );
    }
};
