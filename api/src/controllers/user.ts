import { Request, Response } from "express";
import Joi from "joi";
import { logger, CError } from "src/helpers/utils";

import { user } from "../data/models";

// validation body request
const bodySchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(4).max(16).required(),
}).options({ stripUnknown: true });

export const getAllUser = async (req: Request, res: Response) => {
  try {
    const { value: limit } = Joi.number().default(10).validate(req.query.limit);
    const { value: offset } = Joi.number().default(0).validate(req.query.offset);
    const { rows: data, count: total } = await user.findAndCountAll({ limit, offset });

    res.status(200).send({ info: { limit, offset, total }, data });
  } catch (err: any) {
    const error: CError = err;
    logger.error(error);
    res.status(error.custom?.code || 500).send({ message: error.message });
  }
};

export const getMyself = async (req: Request, res: Response) => {
  try {
    const data = await user.findByPk(req.decoded.userId);
    if (!data) throw new CError("data not found", { code: 204 });

    return res.status(200).send({ data });
  } catch (err: any) {
    const error: CError = err;
    logger.error(error);
    res.status(error.custom?.code || 500).send({ message: error.message });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const body = bodySchema.validate(req.body);
    if (body.error) throw new CError(body.error.message, { code: 400 });

    const data = await user.create({
      ...body.value,
    });
    return res.status(200).send({ data });
  } catch (err: any) {
    const error: CError = err;
    logger.error(error);
    if (err.errors) return res.status(400).send({ message: err.errors[0].message });
    res.status(error.custom?.code || 500).send({ message: error.message });
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
    if (id.error) throw new CError("id fortmat is not valid", { code: 400 });

    const data = await user.findByPk(id.value);
    if (!data) throw new CError("data not found", { code: 204 });

    data?.destroy();
    return res.status(200).send({ data });
  } catch (err: any) {
    const error: CError = err;
    logger.error(error);
    res.status(error.custom?.code || 500).send({ message: error.message });
  }
};
