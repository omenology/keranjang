import { BuildOptions, Model } from "sequelize/types";
import { sequelize, DataTypes } from "../../helpers/connection";

interface barangAttributes extends Model {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  createdAt?: Date;
  updatedAt?: Date;
}

type BarangStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): barangAttributes;
};

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
      type: DataTypes.TEXT,
      defaultValue: "",
    },
    image: {
      type: DataTypes.STRING,
      defaultValue: "",
      allowNull: false,
    },
  },
  {
    tableName: "barang",
    timestamps: true,
    freezeTableName: true,
    hooks: {
      afterUpdate: (ins, opt) => {
        console.log("after update");
      },
      afterDestroy: (ins) => {
        console.log("after destroy");
      },
      beforeDestroy: () => {
        console.log("befor destroy");
      },
      afterFind: (ins, opt) => {
        console.log("after find");
      },
      beforeFind: () => {
        console.log("before find");
      },
    },
  }
) as BarangStatic;
