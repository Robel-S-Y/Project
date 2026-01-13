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
    await queryInterface.createTable('Orders', {
            id:{
                type:Sequelize.INTEGER,
                primaryKey:true,
                autoIncrement:true,
                allowNull:false
            },
            userId:{
                type:Sequelize.INTEGER,
                allowNull:false
            },
            restaurantId:{
                type:Sequelize.INTEGER,
                allowNull:false
            },
            status:{
                type:Sequelize.ENUM('pending','preparing','delivered'),
                defaultValue:'preparing'
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
     await queryInterface.dropTable('Orders');
  }
};
