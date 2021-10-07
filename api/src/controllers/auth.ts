import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { Op } from "sequelize";

import { generateToken, verifyToken, payload } from "@jwt/index";
import { user } from "../data/models";
import { CError, logger } from "src/helpers/utils";

declare global {
  namespace Express {
    interface Request {
      decoded: payload;
    }
  }
}

export const isAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorization = req.header("authorization");
    if (!authorization) throw new CError("unauthorization", { code: 401 });

    const [type, token] = authorization?.split(" ");
    if (!type || !token) throw new CError("unauthorization", { code: 401 });
    const decoded = verifyToken(token);
    if (decoded.error) throw new CError(decoded.error.message, { code: 401 });

    req.decoded = decoded.data as payload;
    next();
  } catch (err: any) {
    const error: CError = err;
    logger.error(error);
    res.status(error.custom?.code || 500).send({ message: error.message });
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
    if (body.error) throw new CError(body.error.message, { dd: 5 });

    const data = await user.findOne({
      where: {
        [Op.or]: [{ email: body.value.email || "" }, { username: body.value.username || "" }],
        password: body.value.password,
      },
    });
    if (!data) throw new CError(`${body.value.email ? "email" : "username"} or password was wrong`, { code: 401 });

    const { id, email, username } = data?.get();
    const token = generateToken({ email, username, userId: id });

    return res.status(200).send({ data: { token } });
  } catch (err: any) {
    const error: CError = err;
    logger.error(error);
    res.status(error.custom?.code || 500).send({ message: error.message });
  }
};
