"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Gameuser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Gameuser.hasMany(models.Historiesuser, {
        foreignKey: "idgameuser",
        as: "historiesusers",
      });
    }
  }
  Gameuser.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      placeOfBirth: DataTypes.STRING,
      dateOfBirth: DataTypes.DATEONLY,
      address: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Gameuser",
    }
  );
  return Gameuser;
};
