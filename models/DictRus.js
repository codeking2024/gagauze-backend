// models/DictRus.js
const { DataTypes } = require("sequelize");
const sequelize = require("./index");

const DictRus = sequelize.define(
  "dict_rus",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    word: {
      type: DataTypes.STRING(100),
      allowNull: false,
      collate: "utf8_general_ci",
    },
    type: {
      type: DataTypes.TINYINT,
      allowNull: true,
    },
    code: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    code_parent: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    plural: {
      type: DataTypes.TINYINT,
      allowNull: true,
      defaultValue: 0,
    },
    perfect: {
      type: DataTypes.TINYINT,
      allowNull: true,
    },
    gender: {
      type: DataTypes.TINYINT,
      allowNull: true,
    },
    transit: {
      type: DataTypes.TINYINT,
      allowNull: true,
    },
    time: {
      type: DataTypes.TINYINT,
      allowNull: true,
      defaultValue: 0,
    },
    kind: {
      type: DataTypes.TINYINT,
      allowNull: true,
    },
    face: {
      type: DataTypes.TINYINT,
      allowNull: true,
    },
    inf: {
      type: DataTypes.TINYINT,
      allowNull: true,
    },
    vozv: {
      type: DataTypes.TINYINT,
      allowNull: true,
    },
    nakl: {
      type: DataTypes.TINYINT,
      allowNull: true,
    },
    wcase: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    soul: {
      type: DataTypes.TINYINT,
      allowNull: true,
    },
    parent: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    done: {
      type: DataTypes.STRING(255),
      allowNull: true,
      collate: "utf8_general_ci",
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
    tableName: "dict_rus",
  }
);

module.exports = DictRus;
