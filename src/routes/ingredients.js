'use strict';

const express = require('express');
const { ingredientsValidator } = require('../middleware/validator');
const { ingredientsInterface } = require('../models');
const router = express.Router();

router.post('/ingredients', ingredientsValidator, async (req, res, next) => {
  try {
    const newIngredient = await ingredientsInterface.create(req.body);
    res.status(201).send(newIngredient);
  } catch (error) {
    next(error);
  }
});

router.get('/ingredients', async (req, res, next) => {
  try {
    const ingredients = await ingredientsInterface.read();
    res.status(200).send(ingredients);
  } catch (error) {
    next(error);
  }
});

router.get('/ingredients/:id', async (req, res, next) => {
  try {
    const ingredient = await ingredientsInterface.read(req.params.id);
    res.status(200).send(ingredient);
  } catch (error) {
    next(error);
  }
});

router.put('/ingredients/:id', ingredientsValidator, async (req, res, next) => {
  try {
    const updatedIngredient = await ingredientsInterface.update(req.body, req.params.id);
    res.status(201).send(updatedIngredient);
  } catch (error) {
    next(error);
  }
});

router.delete('/ingredients/:id', async (req, res, next) => {
  try {
    const message = await ingredientsInterface.delete(req.params.id);
    res.status(204).send(message);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
