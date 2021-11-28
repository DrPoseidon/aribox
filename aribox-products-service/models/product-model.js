const { DataTypes } = require('sequelize');

module.exports = {
  productid: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mainimage: {
    type: DataTypes.STRING,
    allowNull: false
  },
  materials: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.NUMBER,
    allowNull: false
  },
  discount: {
    type: DataTypes.NUMBER,
    allowNull: false
  },
};
