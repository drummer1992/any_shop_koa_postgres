'use strict';

const { DataTypes } = require('sequelize');
const sequelize = require('../libs/connection');

const { User } = require('./User');

const Session = sequelize.define('session', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    unique: true,
    allowNull: false,
  },
  token: {
    type: DataTypes.TEXT,
    unique: true,
    allowNull: false,
  },
  lastVisit: {
    type: DataTypes.DATE,
    defaultValue: Date.now(),
    allowNull: false,
  }
}, {
  timestamps: false,
});

User.hasOne(Session, {
  foreignKey: { name: 'id' },
});
Session.belongsTo(User, {
  foreignKey: { name: 'id' },
});

module.exports = { Session };
