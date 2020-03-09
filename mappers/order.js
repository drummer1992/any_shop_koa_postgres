'use strict';

const mapProduct = require('./product');

module.exports = function mapOrder({ dataValues: order }) {
  return {
    id: order.id,
    user: order.user.dataValues.id,
    product: mapProduct(order.product.dataValues),
    phone: order.phone,
    address: order.address,
  };
};
