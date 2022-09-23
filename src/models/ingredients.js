'use strict';

module.exports = (sequelizeDatabase, DataTypes) => {
  return sequelizeDatabase.define('ingredients', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM,
      values: ['fruit', 'vegetable', 'meat', 'dairy', 'grain', 'dessert'],
      allowNull: false,
    },
  });
};
