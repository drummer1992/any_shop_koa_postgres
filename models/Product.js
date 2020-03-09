'use strict';
const { DataTypes } = require('sequelize');
const sequelize = require('../libs/connection');
const { SubCategory, Category } = require('./Category');
const Product = sequelize.define('product', {
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
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
}, {
  timestamps: false,
  indexes: [{
    name: 'TextSearchIndex',
    fields: ['title', 'description'],
  }],
});

const Image = sequelize.define('image', {
  __id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  url: {
    type: DataTypes.TEXT,
  },
}, {
  timestamps: false,
});

Product.hasMany(Image);
Image.belongsTo(Product);

SubCategory.hasMany(Product);
Product.belongsTo(SubCategory);

Category.hasMany(Product);
Product.belongsTo(Category);


module.exports = { Product, Image };
