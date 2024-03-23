'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Userdevice', {
      userid: {
        primaryKey: true,
        type: Sequelize.STRING
      },
      devicetoken: {
        type: Sequelize.STRING
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Userdevice');
  }
};