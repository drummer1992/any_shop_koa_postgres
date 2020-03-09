'use strict';

const { KoaPassport } = require('koa-passport');
const passport = new KoaPassport();

const localStrategy = require('./strategies/local');
const vkontakteStrategy = require('./strategies/vkontakte');
const githubStrategy = require('./strategies/github');

passport.use(localStrategy);
passport.use(vkontakteStrategy);
passport.use(githubStrategy);

module.exports = passport;
