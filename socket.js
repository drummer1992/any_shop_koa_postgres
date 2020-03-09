'use strict';

const socketIO = require('socket.io');

const { Session } = require('./models/Session');
const { User } = require('./models/User');
const { Message } = require('./models/Message');

function socket(server) {
  const io = socketIO(server);

  io.use(async (socket, next) => {
    const token = socket.handshake.query.token;

    if (!token) {
      return next(new Error('anonymous sessions are not allowed'));
    }
    const session = await Session.findOne({ where: {
      token
    }, include: User });

    if (!session) {
      return next(new Error('wrong or expired session token'));
    }

    socket.user = session.dataValues.user.dataValues;
    next();
  });

  io.on('connection', async socket => {
    const { user: { displayName, id } } = socket;
    socket.on('message', async msg => {
      await Message.create({
        displayName,
        chat: id,
        text: msg,
      });
    });
  });

  return io;
}

module.exports = socket;

