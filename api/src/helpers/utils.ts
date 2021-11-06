import cron from "node-cron";
import morgan from "morgan";
import { createLogger, format, transports } from "winston";
import "winston-daily-rotate-file";
import { Snap } from "midtrans-client";
import { user, barang, keranjang, checkout } from "../data/models";
import { LOG_DIR, MIDTRANS_CLIENT_KEY, MIDTRANS_SERVER_KEY } from "./constant";

// sync db with model
export const syncModels = async () => {
  // await user.sync({ force: true });
  // await barang.sync({ force: true });
  // await keranjang.sync({ force: true });
  await checkout.sync({ force: true });
};

export const cronTask = cron.schedule("* * 1 * * *", () => {
  console.log("cron every hour");
});

export const logger = createLogger({
  level: "debug",
  format: format.combine(
    process.env.NODE_ENV === "production" ? format.uncolorize() : format.colorize(),
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.printf(({ timestamp, level, message }) => `${timestamp} ${level} ${message}`)
  ),
});

//if (process.env.NODE_ENV === "test") logger.silent = true;
if (process.env.NODE_ENV === "production") {
  logger.add(
    new transports.DailyRotateFile({
      filename: "api-%DATE%.log",
      datePattern: "YYYY-MM-DD-HH",
      dirname: LOG_DIR,
      maxSize: "10m",
      maxFiles: "14d",
    })
  );
} else {
  logger.add(new transports.Console());
}

export const morganMiddleware = morgan(":method :url HTTP/:http-version :status :response-time ms - :res[content-length] :user-agent", {
  stream: {
    write: (msg: string) => logger.http(msg),
  },
});

export const snap = new Snap({
  isProduction: false,
  clientKey: MIDTRANS_CLIENT_KEY,
  serverKey: MIDTRANS_SERVER_KEY,
});
