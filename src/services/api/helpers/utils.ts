import cron from "node-cron";
import { createLogger, format, transports } from "winston";
import "winston-daily-rotate-file";
import morgan from "morgan";
import { user, barang, keranjang } from "../data/models";
import { LOG_DIR } from "./constant";

// sync db with model
export const syncModels = async () => {
  await user.sync({ force: true });
  await barang.sync({ force: true });
  await keranjang.sync({ force: true });
};

export const cronTask = cron.schedule("* * 1 * * *", () => {
  console.log("cron every hour");
});

export const logger = createLogger({
  level: "debug",
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.printf(({ timestamp, level, message }) => `${timestamp} ${level} ${message}`)
  ),
  transports: [
    new transports.Console(),
    new transports.DailyRotateFile({
      filename: "api-%DATE%.log",
      datePattern: "YYYY-MM-DD-HH",
      dirname: LOG_DIR,
      maxSize: "10m",
      maxFiles: "14d",
    }),
  ],
});

export const morganMiddleware = morgan(":method :url HTTP/:http-version :status :response-time ms - :res[content-length] :user-agent", {
  stream: {
    write: (msg: string) => logger.http(msg),
  },
});
