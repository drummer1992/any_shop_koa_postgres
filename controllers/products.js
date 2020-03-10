'use strict';

const { Product, Image } = require('../models/Product');
const mapProduct = require('../mappers/product');
const { Op } = require('sequelize');
const uuid = require('uuid/v4');

module.exports.productsBySubcategory = async function productsBySubcategory(ctx, next) {
  const { subcategory: subcategoryId } = ctx.query;

  if (!subcategoryId) return next();

  const products = await Product.findAll({
    where: {
      subcategoryId,
    },
    include: Image,
    limit: 20,
  });
  ctx.body = { products: products.map(mapProduct) };
};

module.exports.productsByQuery = async function productsByQuery(ctx, next) {
  const { query } = ctx.query;
  if (!query) return next();

  const products = await Product
    .findAll({
      where: {
        title: {
          [Op.iLike]: `%${query}%`,
        }
      },
      include: Image,
    });
  ctx.body = { products: products.map(mapProduct) };
};

module.exports.productList = async function productList(ctx) {
  const products = await Product.findAll({
    include: Image
  });
  ctx.body = { products: products.map(mapProduct) };
};

module.exports.productById = async function productById(ctx) {
  const { params: { id } } = ctx;
  const isValidId = id.length === uuid().length;
  if (!isValidId) {
    ctx.throw(400, 'invalid product id');
  }
  const product = await Product.findOne({
    where: { id },
    include: Image,
  });

  if (!product) {
    ctx.throw(404, `no product with ${id} id`);
  }

  ctx.body = { product: mapProduct(product) };
};
