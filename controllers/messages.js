'use strict';

const { Message } = require('../models/Message');
const messageMaper = require('../mappers/message');

module.exports.messageList = async function messages(ctx) {
  if (!ctx.user) {
    ctx.throw(401, 'Пользователь не залогинен');
  }
  const messages = await Message.findAll({ where: {
    chat: ctx.user.id,
  }, limit: 20 });

  ctx.body = { messages: messages.map(messageMaper) };
};
