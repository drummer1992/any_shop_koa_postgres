'use strict';
require('dotenv').config();
const sequelize = require('../libs/connection');
const { tables, createTables } = require('./createTables');
const { insertCategory, insertSubCategory, insertProduct } = require('./insertData');

async function main() {
  try {
    await sequelize.sync();
    await sequelize.authenticate();
    await createTables(tables);
    await insertCategory();
    await insertSubCategory();
    await insertProduct();
    console.dir({ message: 'DataBase successfully created' });
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      console.dir({ message: 'DataBase already exists' });
    } else {
      console.log(error);
    }
  }
  await sequelize.close();
}

main();

