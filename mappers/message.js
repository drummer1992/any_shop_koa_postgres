'use strict';

module.exports = function(msg) {
  return {
    date: msg.date,
    text: msg.text,
    id: msg.chat,
    user: msg.displayName,
  };
};
