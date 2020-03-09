'use strict';

const { Category, SubCategory } = require('../models/Category');
const mapCategory = require('../mappers/category');

module.exports.categoryList = async function categoryList(ctx) {
  const categories = await Category.findAll({
    include: SubCategory,
  });
  ctx.body = { categories: categories.map(mapCategory) };
};
