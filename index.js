'use strict';

const fs = require('fs');
const path = require('path');
const app = require('./app');
const socket = require('./socket');
const https = require('https');

const { https: { https_port, https_key, https_cert, https_domain } } = require('./config');

const config = {
  domain: https_domain,
  https: {
    port: https_port,
    options: {
      key: fs.readFileSync(path.resolve(process.cwd(), https_key)),
      cert: fs.readFileSync(path.resolve(process.cwd(), https_cert)),
    },
  }
};

const serverCallback = app.callback();

const httpsServer = https.createServer(config.https.options, serverCallback);

httpsServer.listen(config.https.port, err => {
  if (err) {
    console.error('HTTPS server FAIL: ', err, (err && err.stack));
  } else {
    console.dir({
      message: `HTTPS server OK: https://${config.domain}:${config.https.port}`,
    });
  }
});


socket(httpsServer);
