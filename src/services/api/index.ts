// library import
import express, { Express } from "express";
import helmet from "helmet";
import cors from "cors";

import { sequelize } from "./helpers/connection";
import routes from "./routes";
import { syncModels } from "./helpers/utils";

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

// routes enrty
app.use("/", routes);
// route not found
app.use("*", (req, res) => {
  res.status(404).send("Endpoint Not Found");
});

/* Server initialization */
const host: any = process.env.HOST || "localhost"; // hostname
const port: any = process.env.PORT || 4000; // used port

// sync models with db
// syncModels();

app.listen(port, host, () => {
  console.log(`Service start on host : ${host} and port : ${port}`);
});

// connection
//   .authenticate()
//   .then(() => {
//   })
//   .catch((reason) => {
//     console.log(reason);
//   });
