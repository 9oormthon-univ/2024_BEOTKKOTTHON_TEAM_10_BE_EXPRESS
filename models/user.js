'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    userid: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    password: DataTypes.STRING,
    name: DataTypes.STRING,
    ranking: DataTypes.STRING,
    grade: DataTypes.STRING,
    region_city_province: DataTypes.STRING,
    region_city_country_district: DataTypes.STRING,
    major: DataTypes.STRING,
    onboard: DataTypes.BOOLEAN

  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: false
  });
  return User;
};