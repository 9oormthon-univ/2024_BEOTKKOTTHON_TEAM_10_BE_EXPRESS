'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Userdevice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Userdevice.init({
    userid: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    devicetoken: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Userdevice',
    tableName: 'Userdevice',
    timestamps: false
  });
  return Userdevice;
};