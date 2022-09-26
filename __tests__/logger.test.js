'use strict';

const logger = require('../src/middleware/logger');

describe('Test logger middleware', () => {
  let consoleSpy;
  const req = {};
  const res = {};
  const next = jest.fn();

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation();
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it('Properly logs the output to the console', () => {
    logger(req, res, next);
    expect(consoleSpy).toHaveBeenCalledWith(`REQUEST METHOD: ${req.method}, REQUEST ORIGINAL URL: ${req.originalUrl}`);
  });

  it('Properly calls next()', () => {
    logger(req, res, next);
    expect(next).toHaveBeenCalledWith();
  });

});
