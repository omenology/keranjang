import path from "path";
import multer from "multer";
import mime from "mime-types";
import fs from "fs";

export const APP_DIR = path.join(__dirname, "../");
export const IMAGES_DIR = path.join(APP_DIR, "storage/images");
export const DOCUMENTS_DIR = path.join(APP_DIR, "storage/documents");

const storageImage = multer.diskStorage({
  filename: (req, file, cb) => {
    const filename =
      file.fieldname +
      new Date().getTime() +
      "." +
      mime.extension(file.mimetype);
    cb(null, filename);
  },
  destination: (req, file, cb) => {
    fs.mkdirSync(IMAGES_DIR, { recursive: true });
    cb(null, IMAGES_DIR);
  },
});

const storageDocument = multer.diskStorage({
  filename: (req, file, cb) => {
    const filename =
      file.fieldname +
      new Date().getTime() +
      "." +
      mime.extension(file.mimetype);
    cb(null, filename);
  },
  destination: (req, file, cb) => {
    fs.mkdirSync(DOCUMENTS_DIR, { recursive: true });
    cb(null, DOCUMENTS_DIR);
  },
});

export const midUploadImage = multer({
  storage: storageImage,
  limits: { fileSize: 5242880, files: 5 },
});
export const midUploadDocument = multer({
  storage: storageDocument,
  limits: { fileSize: 15728640, files: 2 },
});
