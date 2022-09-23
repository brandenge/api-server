'use strict';

function clothesValidator(req, res, next) {
  const { type, material, color } = req.body;
  if (type && material && color) next();
  else next('ERROR: A clothes request must have type, material, and color properties.');
}

function ingredientsValidator(req, res, next) {
  const { name, type } = req.body;
  if (name && type) next();
  else next('ERROR: An ingredients request must have a name and type properties.');
}

module.exports = { clothesValidator, ingredientsValidator };
