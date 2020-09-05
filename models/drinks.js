
module.exports = function(sequelize, DataTypes) {
  var Drinks = sequelize.define("drinks", {
    drink_name: {
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
    thumb_url: {
      type: DataTypes.STRING,
      allowNull: false
    },
    video_url: DataTypes.STRING,
    ingredient_1: DataTypes.STRING,
    ingredient_2: DataTypes.STRING,
    ingredient_3: DataTypes.STRING,
    ingredient_4: DataTypes.STRING,
    ingredient_5: DataTypes.STRING,
    ingredient_6: DataTypes.STRING,
    ingredient_7: DataTypes.STRING,
    ingredient_8: DataTypes.STRING,
    ingredient_9: DataTypes.STRING,
    ingredient_10: DataTypes.STRING,
    ingredient_11: DataTypes.STRING,
    ingredient_12: DataTypes.STRING,
    measurement_1: DataTypes.STRING,
    measurement_2: DataTypes.STRING,
    measurement_3: DataTypes.STRING,
    measurement_4: DataTypes.STRING,
    measurement_5: DataTypes.STRING,
    measurement_6: DataTypes.STRING,
    measurement_7: DataTypes.STRING,
    measurement_8: DataTypes.STRING,
    measurement_9: DataTypes.STRING,
    measurement_10: DataTypes.STRING,
    measurement_11: DataTypes.STRING,
    measurement_12: DataTypes.STRING,
  });
  return Drinks;
}
