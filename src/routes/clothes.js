'use strict';

const express = require('express');
const { clothesValidator } = require('../middleware/validator');
const { clothesInterface } = require('../models');
const router = express.Router();

router.post('/clothes', clothesValidator, async (req, res, next) => {
  try {
    const newClothing = await clothesInterface.create(req.body);
    res.status(201).send(newClothing);
  } catch (error) {
    next(error);
  }
});

router.get('/clothes', async (req, res, next) => {
  try {
    const allClothing = await clothesInterface.read();
    res.status(200).send(allClothing);
  } catch (error) {
    next(error);
  }
});

router.get('/clothes/:id', async (req, res, next) => {
  try {
    const Clothing = await clothesInterface.read(req.params.id);
    res.status(200).send(Clothing);
  } catch (error) {
    next(error);
  }
});

router.put('/clothes/:id', clothesValidator, async (req, res, next) => {
  try {
    const updatedClothing = await clothesInterface.update(req.body, req.params.id);
    res.status(201).send(updatedClothing);
  } catch (error) {
    next(error);
  }
});

router.delete('/clothes/:id', async (req, res, next) => {
  try {
    const message = await clothesInterface.delete(req.params.id);
    res.status(204).send(message);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
