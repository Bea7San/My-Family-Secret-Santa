const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "family",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
      },
      code: {
        type: DataTypes.STRING,
        unique: true,
      },
    },
    { timestamps: false }
  );
};
