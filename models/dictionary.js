const { DataTypes } = require("sequelize");
const sequelize = require("./index");

const DictGagauz = sequelize.define(
  "dict_gagauz",
  {
    word: DataTypes.STRING,
    noun: DataTypes.TEXT,
    verb: DataTypes.TEXT,
    izafet: DataTypes.TEXT,
    adverb: DataTypes.TEXT,
    other: DataTypes.TEXT,
    rule: DataTypes.INTEGER,
    synonym: DataTypes.TEXT,
    transcription: DataTypes.STRING,
    stress: DataTypes.STRING,
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = DictGagauz;
