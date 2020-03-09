'use strict';

const { DataTypes } = require('sequelize');
const sequelize = require('../libs/connection');
const { User } = require('./User');

const Message = sequelize.define('message', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  displayName: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  chat: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: false,
  }
}, {
  updatedAt: false,
  createdAt: 'date',
});

User.hasMany(Message, {
  foreignKey: 'chat'
});
Message.belongsTo(User, {
  foreignKey: 'chat',
});

module.exports = { Message };
