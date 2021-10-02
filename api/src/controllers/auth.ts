import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { Op } from "sequelize";

import { generateToken, verifyToken } from "@jwt/index";
import { user } from "../data/models";

type payload = { userId: string; username: string; email: string };
type decodeToken = { data: payload | null; message: string };

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
    if (!authorization) return res.status(401).send({ message: "unauthorization" });

    const [type, token] = authorization?.split(" ");
    if (!type || !token) return res.status(401).send({ message: "unauthorization" });

    const { data, message } = verifyToken(token);
    if (!data) return res.status(401).send({ message });

    req.decoded = data;
    next();
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
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
    if (body.error) return res.status(400).send({ message: body.error.message });

    const data = await user.findOne({
      where: {
        [Op.or]: [{ email: body.value.email || "" }, { username: body.value.username || "" }],
        password: body.value.password,
      },
    });
    if (!data) if (!data) return res.status(401).send({ message: "email, username or password was wrong" });

    const { id, email, username } = data?.get();
    const token = generateToken({ email, username, userId: id });

    return res.status(200).send({ data: { token } });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};
