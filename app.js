'use strict';

require('dotenv').config();

const path = require('path');
const fs = require('fs');
const Koa = require('koa');

const Router = require('koa-router');
const handleSequelizeValidationError = require('./libs/validationErrors');
const mustBeAuthenticated = require('./libs/mustBeAuthenticated');
const { recommendationsList } = require('./controllers/recommendations');
const {
  productsBySubcategory, productsByQuery, productList, productById,
} = require('./controllers/products');
const { categoryList } = require('./controllers/categories');
const { login } = require('./controllers/login');
const { oauth, oauthCallback } = require('./controllers/oauth');
const { me } = require('./controllers/me');
const { register, confirm } = require('./controllers/registration');
const { checkout, getOrdersList } = require('./controllers/orders');
const { messageList } = require('./controllers/messages');

const app = new Koa();

const chechAuthorization = require('./libs/checkAuthorization');
const functionLogin = require('./libs/functionLogin');

app.use(require('koa-bodyparser')());
app.use(require('koa-static')(path.join(__dirname, 'public')));

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    if (err.status) {
      ctx.status = err.status;
      ctx.body = { error: err.message };
    } else {
      console.error(err);
      ctx.status = 500;
      ctx.body = { error: 'Internal server error' };
    }
  }
});

app.use(functionLogin);

const router = new Router({ prefix: '/api' });

router.use(chechAuthorization);

router.get('/recommendations', recommendationsList);
router.get('/categories', categoryList);
router.get('/products', productsBySubcategory, productsByQuery, productList);
router.get('/products/:id', productById);

router.post('/login', login);

router.get('/oauth/:provider', oauth);
router.post('/oauth_callback', handleSequelizeValidationError, oauthCallback);

router.get('/me', mustBeAuthenticated, me);

router.post('/register', handleSequelizeValidationError, register);
router.post('/confirm', confirm);

router.get('/orders', mustBeAuthenticated, getOrdersList);
router.post('/orders', mustBeAuthenticated, handleSequelizeValidationError, checkout);

router.get('/messages', messageList);

app.use(router.routes());

// this for HTML5 history in browser
const index = fs.readFileSync(path.join(__dirname, 'public/index.html'));
app.use(async ctx => {
  if (!ctx.url.startsWith('/api')) {
    ctx.set('content-type', 'text/html');
    ctx.body = index;
  }
});

module.exports = app;
