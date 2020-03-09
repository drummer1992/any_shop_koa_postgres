'use strict';

const sequelize = require('sequelize');

sequelize.Promise = global.Promise;

const { Sequelize } = sequelize;

const { postgres: config } = require('../config');


const db = new Sequelize(config.db, config.user, config.password, {
  host: config.host,
  dialect: config.dialect,
});

module.exports = db;
