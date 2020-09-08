
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
      type: DataTypes.STRING
    },
    category: {
      type: DataTypes.STRING
    },
    rum: {
      type: DataTypes.BOOLEAN
    },
    whiskey: {
      type: DataTypes.BOOLEAN
    },
    tequila: {
      type: DataTypes.BOOLEAN
    },
    vodka: {
      type: DataTypes.BOOLEAN
    },
    gin: {
      type: DataTypes.BOOLEAN
    }

  });

  Drink.associate = function(models) {
    Drink.belongsTo(models.User, {
      onDelete: "NO ACTION"
    });
    //ingredients table not currently used. 
    // create a junction table for a many-to-many relationship
    //   Drink.belongsToMany(models.Ingredient, {
    //     onDelete: "NO ACTION",
    //     through: "DrinkIngredients"
    //   });
  }


  return Drink;
}
