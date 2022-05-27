'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Comments.init({
    id: {
      allowNull:false,
      autoIncrement:true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    userid: {
      allowNull:false,
      type: DataTypes.INTEGER
    },
    contentsid:{
      allowNull:false,
      type: DataTypes.INTEGER
    },
    text: {
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
    modelName: 'Comments',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  return Comments;
};