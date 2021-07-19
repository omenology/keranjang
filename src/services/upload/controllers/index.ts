import { Request, Response, static as staticFolder } from "express";
import { IMAGES_DIR, DOCUMENTS_DIR } from "../helpers/utils";
import modelFile from "../data/model/file";

export const staticImages = staticFolder(IMAGES_DIR);
export const staticDocuments = staticFolder(DOCUMENTS_DIR);

export const uploadImage = async (req: Request, res: Response) => {
  console.log(req.file);
  try {
    const dataFile = await modelFile.create({
      fileName: req?.file?.filename,
      url: "http://localhost:4000/images/" + req?.file?.filename,
    });
    res.status(200).send({ succes: true, dataFile });
  } catch (error) {
    res.status(500);
  }
};
