import jwt from "jsonwebtoken";

import { TOKEN_SECREAT, TOKEN_LIFE } from "./helpers/constants";

export const awt = jwt;

export type payload = { userId: string; username: string; email: string };
export type decodeToken = { data?: payload; error?: Error };

export const generateToken = (payload: payload): string => {
  return jwt.sign(payload, TOKEN_SECREAT, { expiresIn: `${TOKEN_LIFE}h` });
};

export const verifyToken = (token: string): decodeToken => {
  try {
    const data = jwt.verify(token, TOKEN_SECREAT) as payload;
    return {
      data,
    };
  } catch (err: any) {
    return {
      error: err,
    };
  }
};
