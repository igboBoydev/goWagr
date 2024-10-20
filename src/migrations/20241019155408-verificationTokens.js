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
    await queryInterface.createTable("verification_tokens", {
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
      code: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      type: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      user_id: {
        allowNull: true,
        type: Sequelize.INTEGER.UNSIGNED,
      },
      trial_count: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.INTEGER,
      },
      is_expired: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.INTEGER,
      },
      is_retry: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.INTEGER,
      },
      is_delivered: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.INTEGER,
      },
      is_verified: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.INTEGER,
      },
      is_used: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.INTEGER,
      },
      expiry_duration: {
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
    await queryInterface.dropTable("verification_tokens");
  },
};
