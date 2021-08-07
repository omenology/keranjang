// library import
import express, { Express } from "express";
import helmet from "helmet";
import cors from "cors";

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

// route not found
app.use("*", (req, res) => {
  res.status(404).send("Endpoint Not Found");
});

/* Server initialization */
const host: any = process.env.HOST || "localhost"; // hostname
const port: any = process.env.PORT || 4000; // used port

app.listen(port, host, () => {
  console.log(`Service start on host : ${host} and port : ${port}`);
});
