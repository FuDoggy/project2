
module.exports = function(sequelize, DataTypes) {
  var Drink = sequelize.define("Drink", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    alcoholic: {
      type : DataTypes.BOOLEAN,
      allowNull: false
    },
    recipe: {
      type: DataTypes.STRING(9999),
      allowNull: false
    },
    thumbnail: {
      type: DataTypes.STRING,
      allowNull: false
    },
    instructions: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    glass: {
      type: DataTypes.STRING,
      allowNull: false
    },
    video_url: {
      type: DataTypes.STRING,
    },
    category: DataTypes.STRING
  },
  
  );

  Drink.associate = function(models) {
    Drink.hasOne(models.User, {
      onDelete: "NO ACTION"
    });
  }
  //ingredients table not currently used
  // create a junction table for a many-to-many relationship
  Drink.associate = function(models) {
    Drink.belongsToMany(models.Ingredient, {
      onDelete: "NO ACTION",
      through: "DrinkIngredients"
    });
  }

  return Drink;
}
