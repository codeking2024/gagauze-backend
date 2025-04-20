// models/DictGagauz.js
const { DataTypes } = require("sequelize");
const sequelize = require("./index");

const DictGagauz = sequelize.define(
  "dict_gagauz",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    word: {
      type: DataTypes.STRING(50),
      allowNull: true,
      collate: "utf8mb4_bin",
    },
    type: {
      type: DataTypes.TINYINT,
      allowNull: true,
    },
    comment: {
      type: DataTypes.STRING(400),
      allowNull: true,
    },
    similar: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    wcase: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    done: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    rule: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    synonym: {
      type: DataTypes.STRING(255),
      allowNull: true,
      collate: "utf8mb4_bin",
    },
    metaphor: {
      type: DataTypes.STRING(255),
      allowNull: true,
      collate: "utf8mb4_bin",
    },
    noun: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    izafet: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    adverb: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    verb: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    other: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    info: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    future_or_past_perfect: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    stress: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    transcription: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    adjective_rus: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    user_comment: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
    tableName: "dict_gagauz",
  }
);

module.exports = DictGagauz;
