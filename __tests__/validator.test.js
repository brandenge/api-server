'use strict';

const { clothesValidator, ingredientsValidator } = require('../src/middleware/validator');

describe('Test validator middleware', () => {
  const next = jest.fn();

  it('Properly calls next() for a valid clothing request', () => {
    const req = {
      body: {
        type: 'pants',
        material: 'cotton',
        color: 'green',
      },
    };
    clothesValidator(req, {}, next);
    expect(next).toHaveBeenCalledWith();
  });

  it('Properly invalidates an incorrect clothing request', () => {
    const req = {
      body: {
        type: 'pants',
        material: 'cotton',
      },
    };
    clothesValidator(req, {}, next);
    expect(next).toHaveBeenCalledWith('ERROR: A clothes request must have type, material, and color properties.');
  });

  it('Properly calls next() for a valid ingredient request', () => {
    const req = {
      body: {
        name: 'banana',
        type: 'fruit',
      },
    };
    ingredientsValidator(req, {}, next);
    expect(next).toHaveBeenCalledWith();
  });

  it('Properly invalidates an incorrect ingredient request', () => {
    const req = {
      body: {
        name: 'banana',
      },
    };
    ingredientsValidator(req, {}, next);
    expect(next).toHaveBeenCalledWith('ERROR: An ingredients request must have a name and type properties.');
  });

});
