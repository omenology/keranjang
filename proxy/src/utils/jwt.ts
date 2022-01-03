import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import httpError, { HttpError } from "http-errors";

import { TOKEN_LIFE, TOKEN_SECREAT } from "./constants";

type payload = { userId: string; username: string; email: string };

declare global {
  namespace Express {
    interface Request {
      decoded: payload;
    }
  }
}

export const generateToken = (payload: payload): string => {
  return jwt.sign(payload, TOKEN_SECREAT, { expiresIn: `${TOKEN_LIFE}h` });
};

export const verifyToken = async(req: Request, res: Response, next: NextFunction) => {

  try {
    if (/\/(auth)\b(?!\/refreshtoken\b)(\/\w+)?/gi.test(req.url)) return next();
    
    const authorization = req.headers.authorization || req.header("Authorization");
    if (!authorization) throw httpError(401);
    
    const [type, token] = authorization?.split(" ");
    if (!type || !token) throw httpError(401);
    
  
    const decoded = jwt.verify(token, TOKEN_SECREAT);
    req.decoded = decoded as payload;
   
    return next();
  } catch (err: any) {
    const error: HttpError = err;
    if(error.name === "JsonWebTokenError") error.statusCode = 401;
    return res.status(error.statusCode || 500).send({ message: error.message });
  }
};
