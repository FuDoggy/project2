
module.exports = function(sequelize, DataTypes) {
  var Drinks = sequelize.define("drinks", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    alcoholic: {
      type : DataTypes.BOOLEAN,
      allowNull: false
    },
    recipe: {
      type: DataTypes.STRING,
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
    }
  });
  return Drinks;
}
