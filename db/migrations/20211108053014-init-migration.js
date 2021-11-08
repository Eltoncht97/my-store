'use strict';

const { DataTypes, Sequelize } = require("sequelize");
const { CATEGORY_TABLE, CategorySchema } = require("../models/category.model");
const { CUSTOMER_TABLE, CustomerSchema } = require("../models/customer.model");
const { ORDER_PRODUCT_TABLE, OrderProductSchema } = require("../models/order-product.model");
const { ORDER_TABLE } = require("../models/order.model");
const { PRODUCT_TABLE, ProductSchema } = require("../models/product.model");
const { USER_TABLE, UserSchema } = require("../models/user.model");

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(USER_TABLE, UserSchema)
    await queryInterface.createTable(CUSTOMER_TABLE, CustomerSchema)
    await queryInterface.createTable(CATEGORY_TABLE, CategorySchema)
    await queryInterface.createTable(PRODUCT_TABLE, ProductSchema)
    await queryInterface.createTable(ORDER_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      customerId: {
        field: 'customer_id',
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: CUSTOMER_TABLE,
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      createdAt: {
        allowNull:false,
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW
      }
    })
    await queryInterface.createTable(ORDER_PRODUCT_TABLE, OrderProductSchema)
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable(USER_TABLE)
    await queryInterface.dropTable(CUSTOMER_TABLE)
    await queryInterface.dropTable(CATEGORY_TABLE)
    await queryInterface.dropTable(PRODUCT_TABLE)
    await queryInterface.dropTable(ORDER_TABLE)
    await queryInterface.dropTable(ORDER_PRODUCT_TABLE)
  }
};
