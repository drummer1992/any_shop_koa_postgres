'use strict';

const { Order } = require('../models/Order');
const { Product, Image } = require('../models/Product');
const { User } = require('../models/User');
const sendMail = require('../libs/sendMail');
const productMapper = require('../mappers/product');
const orderMapper = require('../mappers/order');

module.exports.checkout = async function checkout(ctx) {
  const authorizeUser = ctx.user;

  const {
    product,
    phone,
    address,
  } = ctx.request.body;

  const productById = await Product.findByPk(product, { include: Image });

  const order = await Order.create({
    userId: authorizeUser.id,
    productId: productById.dataValues.id,
    phone,
    address,
  });

  const productMap = productMapper(productById);

  await sendMail({
    template: 'order-confirmation',
    locals: { product: { title: productMap.title }, id: order.id },
    to: authorizeUser.email,
    subject: 'Подтверждение заказа',
  });

  ctx.body = { order: order.id };
};

module.exports.getOrdersList = async function ordersList(ctx) {
  const user = ctx.user;
  const orders = await Order.findAll({
    where: {
      userId: user.id
    },
    include: [User, Product],
  });

  for (const order of orders) {
    const images = await Image.findAll({
      where: {
        productId: order.dataValues.productId
      }
    });
    order.dataValues.product.dataValues.images = images;
  }

  ctx.body = {
    orders: orders.map(orderMapper),
  };
};
