import path from "path";

export const APP_DIR = path.join(__dirname, "../");
export const LOG_DIR = path.join(APP_DIR, "log");

export const TOKEN_LIFE = process.env.TOKEN_LIFE || 8; // hour
export const TOKEN_SECREAT = process.env.TOKEN_SECREAT || "tokenscreat123";
