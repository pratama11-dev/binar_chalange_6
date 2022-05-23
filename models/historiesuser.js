"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Historiesuser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Historiesuser.belongsTo(models.Gameuser, {
        foreignKey: "idgameuser",
        as: "gameuser",
      });
    }
  }
  Historiesuser.init(
    {
      idgameuser: DataTypes.INTEGER,
      nameOfGame: DataTypes.STRING,
      level: DataTypes.STRING,
      joinDate: DataTypes.DATEONLY,
    },
    {
      sequelize,
      modelName: "Historiesuser",
    }
  );
  return Historiesuser;
};
