// // Library import
import express, { Express, NextFunction, Request, Response } from "express";
import cors from "cors";

import connection from "./helpers/connection";
import route from "./routes";
import { MulterError } from "multer";

// init app
const app: Express = express();

// cors
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
    optionsSuccessStatus: 200,
  })
);

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// route
app.use("/", route);
app.use("*", (req: Request, res: Response) => {
  res.status(404).send("Endpoint Not Found");
});

app.use((err: MulterError, req: Request, res: Response, next: NextFunction) => {
  if (err?.code) res.status(400).send({ message: err.message });
  res.status(500).send({ message: err.message });
});

connection
  .then(() => {
    app.listen(4002, "localhost");
    console.log("app listening on localhost:4002");
  })
  .catch((err) => {
    console.log("asdasdasdasdassad");
    console.log(err, "error connect to db");
  });
