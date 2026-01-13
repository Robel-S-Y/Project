'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('OrderItems', {
            id:{
                type:Sequelize.INTEGER,
                primaryKey:true,
                autoIncrement:true,
                allowNull:false
            },
            orderId:{
                type:Sequelize.INTEGER,
                allowNull:false
            },
            menuItemId:{
                type:Sequelize.INTEGER,
                allowNull:false
            },
            quantity:{
                type:Sequelize.INTEGER,
                allowNull:false
            },
            createdAt:{
              type:Sequelize.DATE,
              allowNull:false,
              defaultValue:Sequelize.fn('NOW')
            },
            updatedAt:{
              type:Sequelize.DATE,
              allowNull:false,
              defaultValue:Sequelize.fn('NOW')
            }
          });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     await queryInterface.dropTable('OrderItems');
  }
};
