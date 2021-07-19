// Library import
import express, { Express, Request, Response } from "express";
import cors from "cors";

import connection from "./helpers/connection";
import route from "./routes";

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

connection
  .then(() => {
    app.listen(4000, "localhost");
    console.log("app listening on localhost:4000");
  })
  .catch((err) => {
    console.log(err, "error connect to db");
  });
