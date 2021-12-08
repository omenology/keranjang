import mongose from "mongoose";

export default mongose.connect("mongodb://root:password@mongo", {
  dbName: "upload-services",
});
