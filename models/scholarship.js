'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Scholarship extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Scholarship.init({
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    provider: DataTypes.STRING,
    start_date: DataTypes.STRING,
    end_date: DataTypes.STRING,
    amount: DataTypes.STRING,
    support_ranking: DataTypes.STRING,
    support_grade: DataTypes.STRING,
    support_city_province: DataTypes.STRING,
    support_city_country_district: DataTypes.STRING,
    support_major: DataTypes.STRING,
    required_documents: DataTypes.TEXT,
    site: DataTypes.STRING,
    support_target: DataTypes.STRING,
    d_day: DataTypes.INTEGER,
    amount2: DataTypes.STRING,
    description2: DataTypes.STRING,
    description3: DataTypes.STRING,
    description4: DataTypes.STRING,
    support_target2: DataTypes.STRING,
    support_target3: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Scholarship',
    tableName: 'scholarships',
    timestamps: false
  });
  return Scholarship;
};