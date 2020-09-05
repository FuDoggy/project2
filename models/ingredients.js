
module.exports = function (sequelize, DataTypes) {
  var Ingredients = sequelize.define("Ingredients", {
    ingredient_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
  });

  Ingredients.associate = function(models) {
    Ingredients.hasMany(models.User, {
      onDelete: "cascade"
    });
  };
  return Ingredients;
}

