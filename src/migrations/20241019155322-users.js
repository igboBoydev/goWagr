"use strict";

// /** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable("users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      uuid: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      firstName: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      lastName: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      phone: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      email: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      is_email_verified: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.INTEGER,
      },
      is_phone_verified: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.INTEGER,
      },
      password: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      referral_link: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      gender: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      is_locked: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.INTEGER,
      },
      username: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      has_accepted_terms: {
        allowNull: true,
        type: Sequelize.BOOLEAN,
      },
      referer_id: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      createdAt: {
        type: "TIMESTAMP",
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false,
      },
      updatedAt: {
        type: "TIMESTAMP",
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable("users");
  },
};
