'use strict';
const { DataTypes } = require('sequelize');
const sequelize = require('../libs/connection');

const Category = sequelize.define('category', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true,
  }
}, {
  timestamps: false
});

const SubCategory = sequelize.define('subcategory', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true,
  }
}, {
  timestamps: false
});

Category.hasMany(SubCategory);
SubCategory.belongsTo(Category, {
  onDelete: 'CASCADE',
});


module.exports = { Category, SubCategory };
