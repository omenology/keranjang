import path from "path";
import multer from "multer";
import mime from "mime-types";
import fs from "fs";
import { Request, Response, NextFunction } from "express";
import decodeToken from "jwt-decode";

export const APP_DIR = path.join(__dirname, "../");
export const IMAGES_DIR = path.join(APP_DIR, "storage/images");
export const DOCUMENTS_DIR = path.join(APP_DIR, "storage/documents");

const storageImage = multer.diskStorage({
  filename: (req, file, cb) => {
    const filename = file.fieldname + new Date().getTime() + "." + mime.extension(file.mimetype);
    cb(null, filename);
  },
  destination: (req, file, cb) => {
    fs.mkdirSync(IMAGES_DIR, { recursive: true });
    cb(null, IMAGES_DIR);
  },
});

const storageDocument = multer.diskStorage({
  filename: (req, file, cb) => {
    const filename = file.fieldname + new Date().getTime() + "." + mime.extension(file.mimetype);
    cb(null, filename);
  },
  destination: (req, file, cb) => {
    fs.mkdirSync(DOCUMENTS_DIR, { recursive: true });
    cb(null, DOCUMENTS_DIR);
  },
});

export const midUploadImage = multer({
  storage: storageImage,
  //limits: { fileSize: 5242880, files: 5 },
});

export const midUploadDocument = multer({
  storage: storageDocument,
  limits: { fileSize: 15728640, files: 2 },
});

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorization = req.headers.authorization || req.header("Authorization");
    if (!authorization) return res.status(400).send({ message: "Unauthorized" });

    const [type, token] = authorization?.split(" ");
    if (!type || !token) return res.status(400).send({ message: "Unauthorized" });

    decodeToken(token);
    next();
  } catch (err) {
    return res.status((err as any).name == "InvalidTokenError" ? 400 : 500).send({ message: (err as any).message || "Something went wrong" });
  }
};
