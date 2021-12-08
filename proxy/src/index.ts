import express, { Express } from "express";
import helmet from "helmet";
import cors from "cors";

import route from "./router";

const app: Express = express();

/* Use body parser */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// helmet
app.use(helmet()); // Default setting -> DNS prefetching, clickjacking, hide Power By, HSTS, X-Download-Options IE8+, sniffing MIME Type, XSS Protection

// cors
app.use(
  cors({
    origin: "*",
  })
);

// route
app.use("/", route);

// route not found
app.use("*", (req, res) => {
  res.status(404).send("Endpoint Not Found");
});

const server = app.listen(80, () => {
  console.log(`Service start on port : ${80}`);
});
