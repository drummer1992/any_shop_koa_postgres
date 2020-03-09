'use strict';

module.exports = function mapProduct(product) {
  return {
    id: product.id,
    title: product.title,
    images: product.images.map(image => image.dataValues.url),
    category: product.categoryId,
    subcategory: product.subcategoryId,
    price: product.price,
    description: product.description,
  };
};
