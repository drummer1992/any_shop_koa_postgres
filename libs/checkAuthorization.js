'use strict';

const { Session } = require('../models/Session');
const { User } = require('../models/User');

module.exports = async function checkAuthorization(ctx, next) {
  const header = ctx.request.get('Authorization');
  if (!header) return next();

  const token = header.split(' ')[1];
  if (!token) return next();
  const session = await Session.findOne({
    where: { token },
    include: User
  });
  if (!session) {
    ctx.throw(401, 'Неверный аутентификационный токен');
  }
  await session.update({
    lastVisit: Date.now(),
  });

  ctx.user = session.dataValues.user.dataValues;

  return next();
};
