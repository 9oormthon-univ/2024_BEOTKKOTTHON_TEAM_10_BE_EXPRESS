'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Count extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Count.init({
    count: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Count',
    tableName: 'CountScholarship',
    timestamps: false
  });
  return Count;
};