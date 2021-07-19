import mongose from "mongoose";

export default mongose.connect("mongodb://root:password@localhost:27017", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: "upload-services",
});
