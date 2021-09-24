import { sequelize, DataTypes } from "../../helpers/connection";

export default sequelize.define(
  "keranjang",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
  },
  {
    tableName: "keranjang",
    timestamps: true,
    freezeTableName: true,
    hooks: {
      afterDestroy: (instance, option) => {
        console.log("after destroy ker");
      },
    },
  }
);
