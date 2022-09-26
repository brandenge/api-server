'use strict';

const supertest = require('supertest');
const { app } = require('../src/server');
const { sequelizeDatabase } = require('../src/models');
const request = supertest(app);

beforeAll(async () => {
  await sequelizeDatabase.sync();
});

afterAll(async () => {
  await sequelizeDatabase.drop();
});

describe('Testing the REST API - HTTP methods and the clothes endpoints', () => {

  it('Creates a new clothing item', async () => {
    const responseOne = await request.post('/clothes').send({
      type: 'hat',
      material: 'leather',
      color: 'black',
    });
    const responseTwo = await request.post('/clothes').send({
      type: 'shirt',
      material: 'cotton',
      color: 'blue',
    });

    expect(responseOne.status).toEqual(201);
    expect(responseOne.body.type).toEqual('hat');
    expect(responseOne.body.material).toEqual('leather');
    expect(responseOne.body.color).toEqual('black');

    expect(responseTwo.status).toEqual(201);
    expect(responseTwo.body.type).toEqual('shirt');
    expect(responseTwo.body.material).toEqual('cotton');
    expect(responseTwo.body.color).toEqual('blue');
  });

  it('Reads all clothing', async () => {
    const response = await request.get('/clothes');
    expect(response.body.length).toEqual(2);
    expect(response.body[0].type).toEqual('hat');
    expect(response.body[0].material).toEqual('leather');
    expect(response.body[0].color).toEqual('black');
    expect(response.body[1].type).toEqual('shirt');
    expect(response.body[1].material).toEqual('cotton');
    expect(response.body[1].color).toEqual('blue');
  });

  it('Updates a clothing item', async () => {
    const response = await request.put('/clothes/1').send({
      type: 'hat',
      material: 'cloth',
      color: 'gray',
    });

    expect(response.body.type).toEqual('hat');
    expect(response.body.material).toEqual('cloth');
    expect(response.body.color).toEqual('gray');
  });

  it('Deletes a clothing item', async () => {
    await request.delete('/clothes/1');
    const response = await request.get('/clothes');

    expect(response.body.length).toEqual(1);
    expect(response.body[0].type).toEqual('shirt');
    expect(response.body[0].material).toEqual('cotton');
    expect(response.body[0].color).toEqual('blue');
  });
});
