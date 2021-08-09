import mongose from "mongoose";
import { Sequelize, DataTypes as TypeData } from "sequelize";

// export default mongose.connect("mongodb://root:password@localhost:27017", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   dbName: "keranjang",
// });
export default sequelize;
export const sequelize = new Sequelize(
  "postgres://tes:password@localhost:5432/tes"
);
export const DataTypes = TypeData;
