'use strict';

const express = require('express');
const logger = require('./middleware/logger');
const clothesRouter = require('./routes/clothes');
const ingredientsRouter = require('./routes/ingredients');
const notFound = require('./error-handlers/404');
const errorHandler = require('./error-handlers/500');
const PORT = process.env.PORT || 3002;

const app = express();
app.use(express.json());
app.use(logger);
app.use(clothesRouter);
app.use(ingredientsRouter);
app.use('*', notFound);
app.use(errorHandler);

function start() {
  app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
}

module.exports = { app, start };
