'use strict';

const GithubStrategy = require('passport-github').Strategy;
const config = require('../../config');
const { providers: { github: { app_id, app_secret, callback_uri } } } = config;
const authenticate = require('./authenticate');

module.exports = new GithubStrategy({
  clientID: app_id,
  clientSecret: app_secret,
  callbackURL: callback_uri,
  scope: ['user:email'],
  session: false,
}, (accessToken, refreshToken, profile, done) => {
  const { username, emails } = profile;
  authenticate('github', emails[0].value, username, done);
}
);
