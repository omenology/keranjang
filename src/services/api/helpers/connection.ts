import mongose from "mongoose";
import { Sequelize } from "sequelize";

// export default mongose.connect("mongodb://root:password@localhost:27017", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   dbName: "keranjang",
// });
const sequelize = new Sequelize("postgres://tes:password@localhost:5432/tes");
export default sequelize;
