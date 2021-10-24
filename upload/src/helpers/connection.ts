import mongose from "mongoose";

export default mongose.connect("mongodb://root:password@localhost:27017", {
  dbName: "upload-services",
});
