'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Contents extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Contents.init({
    id: {
      allowNull:false,
      autoIncrement:true,
      primaryKey:true,
      type: DataTypes.INTEGER
    },
    userid: {
      allowNull:false,
      type: DataTypes.INTEGER
    },
    title: {
      allowNull: false,
      type: DataTypes.STRING(128)
    },
    weather: {
      allowNull: false,
      type: DataTypes.STRING(128)
    },
    content: {
      allowNull: false,
      type: DataTypes.STRING(128)
    },
    imgmain: {
      allowNull: false,
      type: DataTypes.STRING(128)
    },
    // isPublic: {
    //   allowNull: false,
    //   type: DataTypes.boolean()
    // },
    created_at: {
      type: DataTypes.DATE
    },
    updated_at: {
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'Contents',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  return Contents;
};