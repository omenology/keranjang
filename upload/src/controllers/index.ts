import { NextFunction, Request, Response, static as staticFolder } from "express";
import { IMAGES_DIR, DOCUMENTS_DIR } from "../helpers/utils";
import modelFile from "../data/model/file";

export const staticImages = staticFolder(IMAGES_DIR);
export const staticDocuments = staticFolder(DOCUMENTS_DIR);

export const uploadImage = async (req: Request, res: Response, next: NextFunction) => {
  console.log(req.file);
  try {
    if (!req.file) return res.status(400).send({ message: "img required" });
    const dataFile = await modelFile.create({
      fileName: req?.file?.filename,
      url: "http://localhost:4002/images/" + req?.file?.filename,
    });
    return res.status(200).send({ succes: true, dataFile });
  } catch (error: any) {
    next(error);
  }
};
