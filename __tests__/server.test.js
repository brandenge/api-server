'use strict';

const supertest = require('supertest');
const { app } = require('../src/server');
const request = supertest(app);

describe('Testing miscellaneous routes and error handlers', () => {

  it('Handles a requst to an invalid route', async () => {
    const response = await request.get('/bad-endpoint');
    expect(response.status).toEqual(404);
  });

  it('Handles a requst to an invalid method', async () => {
    const response = await request.trace('/clothes/1');
    expect(response.status).toEqual(404);
  });

});
