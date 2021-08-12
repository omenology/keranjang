import { sequelize, DataTypes } from "../../helpers/connection";

export default sequelize.define(
  "barang",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      defaultValue: "",
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      defaultValue: 0.0,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    quantities: {
      type: DataTypes.NUMBER,
      defaultValue: 0,
      allowNull: false,
    },
  },
  {
    tableName: "barang",
    timestamps: true,
    paranoid: true,
  }
);
