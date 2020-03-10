'use strict';

const { Category, SubCategory } = require('../models/Category');

const { Product, Image } = require('../models/Product');

const uuid = require('uuid/v4');

const catData = require('./data/categories');
const productData = require('./data/products');

const categories = {/*categoryName: categoryID*/};

for (const cat in catData) {
  categories[cat] = null;
}

async function insertCategory() {
  for (const title in categories) {
    const id = uuid();
    categories[title] = id;
    await Category.create({
      id,
      title,
    });
  }
}

const catSubCat = {/*
  categotyName : {
    id: ...,
    subcategories: [
      {
        subcategoryName: id
      }
    ]
  }
  ...
*/};

async function insertSubCategory() {
  for (const category in catData) {
    const subcats = catData[category];

    for (const title of subcats) {
      const id = uuid();
      const categoryId = categories[category];

      const arrayWithSubCategories = [];

      if (!catSubCat[category]) {
        catSubCat[category] = {
          id: categories[category],
          subcategories: arrayWithSubCategories
        };
        arrayWithSubCategories.push({ [title]: id });
      } else {
        catSubCat[category].subcategories.push({ [title]: id });
      }

      await SubCategory.create({
        id,
        categoryId,
        title,
      });
    }
  }

}

async function insertProduct() {

  for (const product of productData) {
    const id = uuid();

    let subcategory = null;

    for (const sub of catSubCat[product.category].subcategories) {
      if (sub[product.subcategory]) {
        subcategory = sub;
        break;
      }
    }

    await Product.create({
      id,
      title: product.title,
      description: product.description.replace(/(<([^>]+)>)/ig, ''),
      price: parseInt(product.price),
      categoryId: catSubCat[product.category].id,
      subcategoryId: subcategory[product.subcategory],
    });

    if (product.images) {
      for (const url of product.images) {
        await Image.create({
          productId: id,
          url,
        });
      }
    }
  }
}


module.exports = {
  insertCategory,
  insertSubCategory,
  insertProduct,
};
