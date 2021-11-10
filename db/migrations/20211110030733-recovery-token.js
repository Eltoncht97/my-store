'use strict';

const { DataTypes } = require('sequelize');
const { USER_TABLE } = require('../models/user.model');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.addColumn(USER_TABLE, 'recovery_token', {
      field: 'recovery_token',
      allowNull: true,
      type: DataTypes.STRING,
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn(USER_TABLE, 'recovery_token');
  },
};
