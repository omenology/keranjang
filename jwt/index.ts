import jwt from "jsonwebtoken";

import { TOKEN_SECREAT, TOKEN_LIFE } from "./helpers/constants";

export type payload = { userId: string; username: string; email: string };
export type decodeToken = { data: payload | null; message: string };

export const generateToken = (payload: payload): string => {
  return jwt.sign(payload, TOKEN_SECREAT, { expiresIn: `${TOKEN_LIFE}h` });
};

export const verifyToken = (token: string): decodeToken => {
  try {
    const data = jwt.verify(token, TOKEN_SECREAT) as payload;
    return {
      data,
      message: "success",
    };
  } catch (err: any) {
    return {
      data: null,
      message: err.message,
    };
  }
};
