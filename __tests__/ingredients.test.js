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

describe('Testing the REST API - HTTP methods and the ingredients endpoints', () => {

  it('Creates a new ingredient', async () => {
    const responseOne = await request.post('/ingredients').send({
      name: 'apple',
      type: 'fruit',
    });
    const responseTwo = await request.post('/ingredients').send({
      name: 'corn',
      type: 'vegetable',
    });

    expect(responseOne.status).toEqual(201);
    expect(responseOne.body.name).toEqual('apple');
    expect(responseOne.body.type).toEqual('fruit');

    expect(responseTwo.status).toEqual(201);
    expect(responseTwo.body.name).toEqual('corn');
    expect(responseTwo.body.type).toEqual('vegetable');
  });

  it('Reads all ingredients', async () => {
    const response = await request.get('/ingredients');
    expect(response.body.length).toEqual(2);
    expect(response.body[0].name).toEqual('apple');
    expect(response.body[0].type).toEqual('fruit');
    expect(response.body[1].name).toEqual('corn');
    expect(response.body[1].type).toEqual('vegetable');
  });

  it('Updates an ingredient', async () => {
    const response = await request.put('/ingredients/1').send({
      name: 'pear',
      type: 'fruit',
    });
    expect(response.body.name).toEqual('pear');
    expect(response.body.type).toEqual('fruit');
  });

  it('Deletes an ingredient', async () => {
    await request.delete('/ingredients/1');
    const response = await request.get('/ingredients');

    expect(response.body.length).toEqual(1);
    expect(response.body[0].name).toEqual('corn');
    expect(response.body[0].type).toEqual('vegetable');
  });
});
