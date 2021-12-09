// import mongose from "mongoose";
import { Sequelize, DataTypes as TypeData } from "sequelize";
import { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_HOST, POSTGRES_DB } from "./constant";

// export default mongose.connect("mongodb://root:password@localhost:27017", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   dbName: "keranjang",
// });

const sequelizeInstance = new Sequelize(`postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}/${POSTGRES_DB}`, {
  logging: process.env.NODE_ENV === "test" ? false : true,
});

export default sequelizeInstance;
export const sequelize = sequelizeInstance;
export const DataTypes = TypeData;
