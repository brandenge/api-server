'use strict';

function validator(req, res, next) {
  if (req.params.name) {
    next();
  } else {
    next('There is no name provided. The path must have an id parameter');
  }
}

module.exports = validator;
