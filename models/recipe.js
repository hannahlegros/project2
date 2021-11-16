'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class recipe extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.recipe.belongsToMany(models.user, {through: 'UserRecipes'})
    }
  };
  recipe.init({
    name: DataTypes.STRING,
    idDrink: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'recipe',
  });
  return recipe;
};