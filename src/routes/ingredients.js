'use strict';

const express = require('express');
const validator = require('../middleware/validator');
const { IngredientsModel } = require('../models');
const router = express.Router();

router.use(validator);

router.post('/ingredients', async (req, res, next) => {
  try {
    const newIngredient = await IngredientsModel.create(req.body);
    res.status(201).send(newIngredient);
  } catch (error) {
    next(error);
  }
});

router.get('/ingredients', async (req, res, next) => {
  try {
    const allIngredients = await IngredientsModel.findAll();
    res.status(200).send(allIngredients);
  } catch (error) {
    next(error);
  }
});

router.get('/ingredients/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const Ingredient = await IngredientsModel.findOne({ where: { id } });
    res.status(200).send(Ingredient);
  } catch (error) {
    next(error);
  }
});

router.put('ingredients/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    await IngredientsModel.update(req.body, { where: { id } });
    const updatedIngredient = await IngredientsModel.findOne({ where: { id } });
    res.status(201).send(updatedIngredient);
  } catch (error) {
    next(error);
  }
});

router.delete('ingredients/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    await IngredientsModel.destroy({ where: { id } });
    res.status(204).send('Success! Ingredient deleted.');
  } catch (error) {
    next(error);
  }
});

module.exports = router;
