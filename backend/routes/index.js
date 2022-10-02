const express = require('express');

const { isProduction } = require('../config/server');
const apiRouter = require('./api');

const router = express.Router();

router.use('/api', apiRouter);

if (isProduction) {
  const { resolve } = require('path');
  const buildFolder = resolve(__dirname, 'webapp');
  const rootHTML = resolve(buildFolder, 'index.html');

  router.use(express.static(buildFolder));

  router.get(/(\/)|(^(?!\/?api).*)/, (req, res) => {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    res.sendFile(rootHTML);
  });
} else {
  router.get('/api/csrf/restore', (req, res) => {
    const token = req.csrfToken();
    res.cookie('XSRF-TOKEN', token).sendStatus(200);
  });
}

module.exports = router;
