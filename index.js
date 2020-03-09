'use strict';

const app = require('./app');
const socket = require('./socket');

const server = app.listen(process.env.PORT, () => {
  console.dir({
    message: `App is running on http://localhost:${process.env.PORT}`,
  });
});

socket(server);
