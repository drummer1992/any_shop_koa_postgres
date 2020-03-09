'use strict';

module.exports = async function handleSequelizeValidationError(ctx, next) {
  try {
    await next();
  } catch (err) {
    if (err.name !== 'SequelizeValidationError') throw err;

    ctx.status = 400;

    const errors = {};

    for (const field of Object.keys(err.errors)) {
      errors[field] = err.errors[field].message;
    }
    ctx.body = { errors };
  }
};
