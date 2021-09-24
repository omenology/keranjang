import { sequelize, DataTypes } from "../../helpers/connection";

export default sequelize.define(
  "checkout",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    items: {
      type: DataTypes.ARRAY(DataTypes.UUID),
      allowNull: false,
    },
    totalPayment: {
      type: DataTypes.FLOAT,
      defaultValue: 0.0,
      allowNull: false,
    },
    user: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    shippingAddress: {
      type: DataTypes.TEXT,
    },
    reciver: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "checkout",
    timestamps: true,
    freezeTableName: true,
  }
);
