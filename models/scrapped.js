'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Scrapped extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Scrapped.init({
    user_id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    scholarship_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Scrapped',
    tableName: 'user_scrapped_scholarships',
    timestamps: false
  });
  return Scrapped;
};