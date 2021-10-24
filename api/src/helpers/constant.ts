import path from "path";

export const APP_DIR = path.join(__dirname, "../");
export const LOG_DIR = path.join(APP_DIR, "log");

export const TOKEN_LIFE = process.env.TOKEN_LIFE || 8; // hour
export const TOKEN_SECREAT = process.env.TOKEN_SECREAT || "tokenscreat123";

export const HOST_SMTP = process.env.HOST_SMTP || "smtp.ethereal.email";
export const PORT_SMTP = process.env.PORT_SMTP || 587;

//midtrans
export const MIDTRANS_MERCHANT_ID = process.env.MIDTRANS_MERCHANT_ID || "G397084350";
export const MIDTRANS_CLIENT_KEY = process.env.MIDTRANS_CLIENT_KEY || "SB-Mid-client-8NaNSQNWSjYfRHQ3";
export const MIDTRANS_SERVER_KEY = process.env.MIDTRANS_SERVER_KEY || "SB-Mid-server-51rD29SSeYB79Ce9FRoiNsJy";
