'use strict';

const VkontakteStrategy = require('passport-vkontakte').Strategy;
const config = require('../../config');
const authenticate = require('./authenticate');
const { providers: { vkontakte: { app_id, app_secret, callback_uri } } } = config;

module.exports = new VkontakteStrategy({
  clientID: app_id,
  clientSecret: app_secret,
  callbackURL: callback_uri,
  scope: ['user:email'],
  session: false,
}, (accessToken, refreshToken, params, profile, done) => {
  authenticate('vkontakte', params.email, profile.displayName, done);
}
);
