'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Game extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Player, {
        foreignKey: 'id'
      });
      this.hasOne(models.Board, {
        foreignKey: 'id'
      });
    }
  }
  Game.init({
    turno: DataTypes.INTEGER,
    gameFinalizado: DataTypes.BOOLEAN,
    gameComenzado: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Game',
  });
  return Game;
};