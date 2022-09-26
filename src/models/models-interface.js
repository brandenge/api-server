'use strict';

class ModelInterface {
  constructor(model) {
    this.model = model;
  }

  async create(json) {
    console.log('json:', json);
    try {
      const record = await this.model.create(json);
      return record;
    } catch(error) {
      console.error('Error in ModelInterface create:', error);
      return error;
    }
  }

  async read(id = null) {
    try {
      let record;
      if (id) {
        record = await this.model.findOne({ where: { id } });
      } else {
        record = await this.model.findAll();
      }
      return record;
    } catch(error) {
      console.error('Error in ModelInterface read:', error);
      return error;
    }
  }

  async update(data, id) {
    try {
      await this.model.update(data, { where: { id } });
      let record = await this.model.findOne({ where: { id } });
      return record;
    } catch (error) {
      console.error('Error in ModelInterface update:', error);
      return error;
    }
  }

  async delete(id) {
    try {
      await this.model.destroy({ where: { id } });
      return 'Record successfully deleted.';
    } catch (error) {
      console.error('Error in ModelInterface delete:', error);
      return error;
    }
  }
}

module.exports = ModelInterface;
