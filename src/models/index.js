'use strict';

require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const clothesSchema = require('./clothes');
const ingredientsSchema = require('./ingredients');

const DATABASE_URL = process.env.NODE_ENV === 'test' ?
  'sqlite:memory' :
  process.env.DATABASE_URL;

const sequelizeDatabase = new Sequelize(DATABASE_URL);

const ClothesModel = clothesSchema(sequelizeDatabase, DataTypes);
const IngredientsModel = ingredientsSchema(sequelizeDatabase, DataTypes);

module.exports = {
  sequelizeDatabase,
  ClothesModel,
  IngredientsModel,
};
