'use strict';

const express = require('express');
const validator = require('../middleware/validator');
const { ClothesModel } = require('../models');
const router = express.Router();

router.use(validator);

router.post('/ingredients', async (req, res, next) => {
  try {
    const newClothing = await ClothesModel.create(req.body);
    res.status(201).send(newClothing);
  } catch (error) {
    next(error);
  }
});

router.get('/ingredients', async (req, res, next) => {
  try {
    const allClothing = await ClothesModel.findAll();
    res.status(200).send(allClothing);
  } catch (error) {
    next(error);
  }
});

router.get('/ingredients/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const Clothing = await ClothesModel.findOne({ where: { id } });
    res.status(200).send(Clothing);
  } catch (error) {
    next(error);
  }
});

router.put('ingredients/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    await ClothesModel.update(req.body, { where: { id } });
    const updatedClothing = await ClothesModel.findOne({ where: { id } });
    res.status(201).send(updatedClothing);
  } catch (error) {
    next(error);
  }
});

router.delete('ingredients/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    await ClothesModel.destroy({ where: { id } });
    res.status(204).send('Success! Clothing deleted.');
  } catch (error) {
    next(error);
  }
});

module.exports = router;
