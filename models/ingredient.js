
// ingredients table not currently used

module.exports = function (sequelize, DataTypes) {
  var Ingredient = sequelize.define("Ingredient", {
    ingredient_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
  });

  /* since an ingredient can belong to many users, and a user has many ingredients,
    we have a "many-to-many" relationship. In order to join the two tables, a third table,
    "UserIngredients", is created. This table is a "junction table", which contains foreign keys
    that reference both tables. */
  // Ingredient.associate = function(models) {
  //   Ingredient.belongsToMany(models.User, {
  //     onDelete: "NO ACTION",
  //     through: "UserIngredients"
  //   });
  // };

  // Ingredient.associate = function(models) {
  //   Ingredient.belongsToMany(models.Drink, {
  //     onDelete: "NO ACTION",
  //     through: "DrinkIngredients"
  //   });
  // };
  return Ingredient;
}

