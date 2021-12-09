import mongose from "mongoose";

import { USERNAME_DB, PASSWORD_DB, HOST_DB } from "./constant";

export default mongose.connect(`mongodb://${USERNAME_DB}:${PASSWORD_DB}@${HOST_DB}`, {
  dbName: "upload-services",
});
