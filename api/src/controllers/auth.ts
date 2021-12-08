import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { Op } from "sequelize";
import httpError, { HttpError } from "http-errors";

import { generateToken, verifyToken, payload } from "@jwt/index";
import { user } from "../data/models";
import { logger } from "../helpers/utils";

declare global {
  namespace Express {
    interface Request {
      decoded: payload;
    }
  }
}

export const isAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorization = req.headers.authorization || req.header("Authorization");

    if (!authorization) throw httpError(401);

    const [type, token] = authorization?.split(" ");
    if (!type || !token) throw httpError(401);
    const decoded = verifyToken(token);
    if (decoded.error) throw httpError(401, decoded.error);

    req.decoded = decoded.data as payload;
    next();
  } catch (err: any) {
    const error: HttpError = err;
    logger.error(error);
    res.status(error.statusCode || 500).send({ message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const body = Joi.object({
      email: Joi.string().email(),
      username: Joi.string(),
      password: Joi.string().min(4).max(16).required(),
    })
      .xor("email", "username")
      .validate(req.body);
    console.log(req.body);
    if (body.error) throw httpError(400, body.error);

    const data = await user.findOne({
      where: {
        [Op.or]: [{ email: body.value.email || "" }, { username: body.value.username || "" }],
        password: body.value.password,
      },
    });
    if (!data) throw httpError(401, `${body.value.email ? "email" : "username"} or password was wrong`);

    const { id, email, username } = data?.get();
    const token = generateToken({ email, username, userId: id });

    return res.status(200).send({ data: { token } });
  } catch (err: any) {
    const error: HttpError = err;
    logger.error(error);
    res.status(error.statusCode || 500).send({ message: error.message });
  }
};

export const refreshToken = (req: Request, res: Response) => {
  try {
    const token = generateToken({ email: req.decoded.email, username: req.decoded.username, userId: req.decoded.userId });

    return res.status(200).send({ data: { token } });
  } catch (err: any) {
    const error: HttpError = err;
    logger.error(error);
    res.status(error.statusCode || 500).send({ message: error.message });
  }
};
