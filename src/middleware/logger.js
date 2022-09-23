'use strict';

function logger(req, res, next) {
  console.log(`REQUEST METHOD: ${req.method}, REQUEST ORIGINAL URL: ${req.originalUrl}`);
  next();
}

module.exports = logger;
