'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Follower extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Follower.init({
    userid: {
      allowNull: false,
      type: DataTypes.INTEGER
    }, 
    follower_name: {
      type: DataTypes.STRING(128)
    },
    created_at: {
      type: DataTypes.DATE
    },
    updated_at: {
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'Follower',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  return Follower;
};