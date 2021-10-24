import { Router } from "express";
import { staticImages, staticDocuments, uploadImage } from "../controllers";
import { midUploadImage, midUploadDocument, isAuth } from "../helpers/utils";

const route = Router({ mergeParams: true });

route.use("/images", staticImages);
route.use("/documents", staticDocuments);
route.post("/image", isAuth, midUploadImage.single("img"), uploadImage);
route.post("/document", isAuth, midUploadDocument.single("doc"));

export default route;
