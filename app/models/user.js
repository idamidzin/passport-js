'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
    }
  };
  User.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      token: DataTypes.STRING
    },
    {
      sequelize,
      tableName: 'user',
      modelName: 'User'
    }
  );
  return User;
};