'use strict';

module.exports = {
  postgres: {
    db: process.env.DB_NAME,
    user: process.env.DB_USER_NAME,
    password: process.env.DB_USER_PASSWORD,
    dialect: process.env.DB_DIALECT,
    host: process.env.DB_HOST,
  },
  crypto: {
    iterations: 1,
    length: 128,
    digest: 'sha512',
  },
  providers: {
    github: {
      app_id: process.env.GITHUB_APP_ID,
      app_secret: process.env.GITHUB_APP_SECRET,
      callback_uri: process.env.GITHUB_CALLBACK_URI ||
      'http://localhost:3000/oauth/github',
      options: {
        scope: ['user:email'],
      },
    },
    vkontakte: {
      app_id: process.env.VKONTAKTE_APP_ID,
      app_secret: process.env.VKONTAKTE_APP_SECRET,
      callback_uri: process.env.VKONTAKTE_CALLBACK_URI ||
      'http://localhost:3000/oauth/vkontakte',
      options: {
        scope: ['email'],
      },
    },
  },
  mailer: {
    user: process.env.MAILER_USER,
    password: process.env.MAILER_PASSWORD,
  },
};

