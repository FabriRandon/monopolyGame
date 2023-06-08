'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Player extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Game, {
        foreignKey: 'id'
      });
    }
  }
  Player.init({
    nombre: DataTypes.STRING,
    dinero: DataTypes.INTEGER,
    bancarrota: DataTypes.BOOLEAN,
    squareActual: DataTypes.INTEGER,
    idGame: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Player',
  });
  return Player;
};