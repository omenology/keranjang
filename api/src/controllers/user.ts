import { Request, Response } from "express";
import Joi from "joi";
import httpError, { HttpError } from "http-errors";

import { logger, CError } from "src/helpers/utils";
import { user } from "../data/models";

// validation body request
const bodySchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(4).max(16).required(),
}).options({ stripUnknown: true });

const limitOffset = Joi.object({
  limit: Joi.number().min(0).default(10),
  offset: Joi.number().min(0).default(0),
});

export const getAllUser = async (req: Request, res: Response) => {
  try {
    const query = limitOffset.validate(req.query);
    const { limit, offset } = query.value;
    if (query.error) throw httpError(400, query.error.message);

    const { rows: data, count: total } = await user.findAndCountAll({ limit, offset });

    res.status(200).send({ info: { limit, offset, total }, data });
  } catch (err: any) {
    const error: HttpError = err;
    logger.error(error);
    res.status(error.statusCode || 500).send({ message: error.message });
  }
};

export const getMyself = async (req: Request, res: Response) => {
  try {
    const data = await user.findByPk(req.decoded.userId);
    if (!data) return res.sendStatus(204);

    return res.status(200).send({ data });
  } catch (err: any) {
    const error: HttpError = err;
    logger.error(error);
    res.status(error.statusCode || 500).send({ message: error.message });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const body = bodySchema.validate(req.body);
    if (body.error) throw httpError(400, body.error.message);

    const data = await user.create({
      ...body.value,
    });
    return res.status(200).send({ data });
  } catch (err: any) {
    const error: HttpError = err;
    logger.error(error);
    if (err.errors) return res.status(400).send({ message: err.errors[0].message });
    res.status(error.statusCode || 500).send({ message: error.message });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const id = Joi.string()
      .guid()
      .validate(req.params.id || req.decoded.userId);
    const body = bodySchema.validate(req.body);

    if (id.error) throw new CError("id fortmat is not valid", { code: 400 });
    if (body.error) throw new CError(body.error.message, { code: 400 });

    const data = await user.findByPk(id.value);
    if (!data) throw new CError("data not found", { code: 204 });

    data?.set(body.value);
    data?.save();
    return res.status(200).send({ data });
  } catch (err: any) {
    const error: CError = err;
    logger.error(error);
    res.status(error.custom?.code || 500).send({ message: error.message });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = Joi.string().guid().validate(req.params.id);
    if (id.error) throw httpError(400, "id fortmat is not valid");

    const data = await user.findByPk(id.value);
    if (!data) return res.sendStatus(204);

    data?.destroy();
    return res.status(200).send({ data });
  } catch (err: any) {
    const error: HttpError = err;
    logger.error(error);
    res.status(error.statusCode || 500).send({ message: error.message });
  }
};
