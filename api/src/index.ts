import app from "./app";

/* Server initialization */
const host: any = process.env.HOST || "localhost"; // hostname
const port: any = process.env.PORT || 4000; // used port

// sync models with db
// syncModels();

app.listen(port, host, () => {
  console.log(`Service start on host : ${host} and port : ${port}`);
});
