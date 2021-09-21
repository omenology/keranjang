// library import
import express, { Express } from "express";
import helmet from "helmet";
import cors from "cors";

import routes from "./routes";
import { syncModels, cronTask, morganMiddleware } from "./helpers/utils";

// checkout, histori, filter get
// morgan log
// corn job
// swager

const app: Express = express();

// cors config
app.use(
  cors({
    origin: "*",
  })
);

/* Use body parser */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// helmet
app.use(helmet()); // Default setting -> DNS prefetching, clickjacking, hide Power By, HSTS, X-Download-Options IE8+, sniffing MIME Type, XSS Protection

// logger
app.use(morganMiddleware);

// routes enrty
app.use("/", routes);
// route not found
app.use("*", (req, res) => {
  res.status(404).send("Endpoint Not Found");
});

// cron job
cronTask.start();

/* Server initialization */
const host: any = process.env.HOST || "localhost"; // hostname
const port: any = process.env.PORT || 4000; // used port

// sync models with db
// syncModels();

app.listen(port, host, () => {
  console.log(`Service start on host : ${host} and port : ${port}`);
});
