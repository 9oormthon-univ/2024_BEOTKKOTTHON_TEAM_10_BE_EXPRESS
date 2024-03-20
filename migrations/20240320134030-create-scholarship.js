'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Scholarships', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      provider: {
        type: Sequelize.STRING
      },
      start_date: {
        type: Sequelize.STRING
      },
      end_date: {
        type: Sequelize.STRING
      },
      amount: {
        type: Sequelize.STRING
      },
      support_ranking: {
        type: Sequelize.STRING
      },
      support_grade: {
        type: Sequelize.STRING
      },
      support_city_province: {
        type: Sequelize.STRING
      },
      support_city_county_district: {
        type: Sequelize.STRING
      },
      support_major: {
        type: Sequelize.STRING
      },
      required_documents: {
        type: Sequelize.TEXT
      },
      site: {
        type: Sequelize.STRING
      },
      support_tartget: {
        type: Sequelize.STRING
      },
      d_day: {
        type: Sequelize.INTEGER
      },
      amount2: {
        type: Sequelize.STRING
      },
      description2: {
        type: Sequelize.STRING
      },
      description3: {
        type: Sequelize.STRING
      },
      description4: {
        type: Sequelize.STRING
      },
      support_target2: {
        type: Sequelize.STRING
      },
      support_target3: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Scholarships');
  }
};