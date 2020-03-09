'use strict';

const uuid = require('uuid/v4');
const { Session } = require('../models/Session');

module.exports = function functionLogin(ctx, next) {
  ctx.login = async function(user) {
    const { id } = user;
    const token = uuid();
    try {
      await Session.destroy({
        where: { id },
      });
    } catch (error) {
      console.log(error.name);
    }
    await Session.create({ token, id, lastVisit: Date.now() });

    return token;
  };

  return next();
};
