'use strict';

const { Product, Image } = require('../models/Product');
const mapProduct = require('../mappers/product');

module.exports.recommendationsList = async function recommendationsList(ctx) {
  const products = await Product.findAll({
    include: Image,
    limit: 6,
  });
  ctx.body = { recommendations: products.map(mapProduct) };
};
