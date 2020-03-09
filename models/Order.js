'use strict';

const { DataTypes } = require('sequelize');
const sequelize = require('../libs/connection');
const { Product } = require('./Product');
const { User } = require('./User');

const Order = sequelize.define('order', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  phone: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      isPhone(value) {
        const isValidPhone = /\+?\d{6,14}/.test(value);
        if (!isValidPhone) {
          throw new Error('Неверный формат номера телефона.');
        }
      }
    }
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: false,
  }
}, {
  timestamps: false,
});



User.hasMany(Order, {
  onDelete: 'CASCADE',
});
Order.belongsTo(User);

Product.hasMany(Order);
Order.belongsTo(Product);




module.exports = { Order };
