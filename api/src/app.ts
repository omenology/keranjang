// library import
import express, { Express } from "express";
import helmet from "helmet";
import cors from "cors";

import routes from "./routes";
import { syncModels, cronTask, morganMiddleware } from "./helpers/utils";

// checkout, histori, filter get
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

export default app;
