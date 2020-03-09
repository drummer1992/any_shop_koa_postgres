'use strict';
const { DataTypes } = require('sequelize');
const sequelize = require('../libs/connection');
const crypto = require('crypto');
const { crypto: config } = require('../config');

const User = sequelize.define('user', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  email: {
    type: DataTypes.TEXT,
    validate: {
      isEmail: {
        msg: 'Некорректный email.',
      },
      notNull: {
        msg: 'E-mail пользователя не должен быть пустым.',
      },
    },
    unique: {
      msg: 'Такой email уже существует',
    },
    allowNull: false,
  },
  displayName: {
    type: DataTypes.STRING,
    validate: {
      notNull: { msg: 'У пользователя должно быть имя' },
    },
    unique: { msg:  'Такое имя уже существует' },
    allowNull: false,
  },
  verificationToken: DataTypes.TEXT,
  passwordHash: DataTypes.TEXT,
  salt: DataTypes.TEXT,
}, {
  indexes: [{
    unique: true,
    fields: ['verificationToken'],
  }],
  timestamps: false,
});

function generatePassword(salt, password) {
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(
      password, salt,
      config.iterations,
      config.length,
      config.digest,
      (err, key) => {
        if (err) return reject(err);
        resolve(key.toString('hex'));
      }
    );
  });
}

function generateSalt() {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(config.length, (err, buffer) => {
      if (err) return reject(err);
      resolve(buffer.toString('hex'));
    });
  });
}


User.prototype.setPassword = async function setPassword(password) {
  this.salt = await generateSalt();
  this.passwordHash = await generatePassword(this.salt, password);
};

User.prototype.checkPassword = async function checkPassword(password) {
  if (!password) return false;

  const hash = await generatePassword(this.salt, password);
  return hash === this.passwordHash;
};



module.exports = { User };
