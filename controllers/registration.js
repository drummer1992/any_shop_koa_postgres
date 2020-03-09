'use strict';

const uuid = require('uuid/v4');
const { User } = require('../models/User');
const sendMail = require('../libs/sendMail');

module.exports.register = async ctx => {
  const verificationToken = uuid();
  const user = User.build({
    email: ctx.request.body.email,
    displayName: ctx.request.body.displayName,
    verificationToken,
  });

  await user.setPassword(ctx.request.body.password);
  await user.save();
  await sendMail({
    to: user.email,
    subject: 'Подтвердите почту',
    locals: { token: verificationToken },
    template: 'confirmation',
  });

  ctx.body = { status: 'ok' };
};

module.exports.confirm = async ctx => {

  const user = await User.findOne({
    where: {
      verificationToken: ctx.request.body.verificationToken,
    }
  });

  if (!user) {
    ctx.throw(400, 'Ссылка подтверждения недействительна или устарела');
  }

  await user.update({
    verificationToken: null,
  });

  const token = uuid();

  ctx.body = { token };
};
