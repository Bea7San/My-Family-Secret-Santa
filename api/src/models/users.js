const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "user",
    {
      userId: {
        type: DataTypes.INTEGER,
      },
      userName: {
        type: DataTypes.STRING,
        unique: true,
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      giftsList: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
      directFamily: {
        type: DataTypes.ARRAY(DataTypes.INTEGER)
      },
      lastThree: {
        type: DataTypes.ARRAY(DataTypes.INTEGER)
      },
      secretSanta: {
        type: DataTypes.INTEGER,
      }
    },
    { timestamps: false }
  );
};
