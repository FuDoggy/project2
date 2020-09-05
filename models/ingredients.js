
module.exports = function(sequelize, DataTypes) {
    var Ingredients = sequelize.define("Ingredients", {
      ingredient_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
    });
    return Drinks;
  }
  