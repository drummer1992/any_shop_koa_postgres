'use strict';

const { Category, SubCategory } = require('../models/Category');
const { Product, Image } = require('../models/Product');
const { User } = require('../models/User');
const { Session } = require('../models/Session');
const { Order } = require('../models/Order');
const { Message } = require('../models/Message');

async function createTables(models) {
  for (const model of models) {
    await model.sync();
  }
}

const tables = [
  User,
  Session,
  Message,
  Category,
  SubCategory,
  Product,
  Image,
  Order,
];

module.exports = {
  tables,
  createTables,
};
