'use strict';

module.exports = (sequelizeDatabase, DataTypes) => {
  return sequelizeDatabase.define('clothes', {
    type: {
      type: DataTypes.ENUM,
      values: ['hat', 'shirt', 'pants', 'underwear', 'socks', 'footwear'],
      allowNull: false,
    },
    material: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
