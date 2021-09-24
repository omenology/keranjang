import { Request, Response } from "express";
import Joi from "joi";
import { Error } from "sequelize/types";

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
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const body = bodySchema.validate(req.body);
    if (body.error) return res.status(400).send({ message: body.error.message });

    const data = await user.create({
      ...body.value,
    });
    return res.status(200).send({ data });
  } catch (error: any) {
    if (error.original.code == 23505) return res.status(400).send({ message: error.original.detail });

    console.log(error);
    res.sendStatus(500);
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const id = Joi.string().guid().validate(req.params.id);
    const body = bodySchema.validate(req.body);

    if (id.error) return res.status(400).send({ message: "id fortmat is not valid" });
    if (body.error) return res.status(400).send({ message: body.error.message });

    const data = await user.findByPk(id.value);
    if (!data) return res.status(204).send({ message: "data not found" });

    data?.set(body.value);
    data?.save();
    return res.status(200).send({ data });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = Joi.string().guid().validate(req.params.id);
    if (id.error) return res.status(400).send({ message: "id fortmat is not valid" });

    const data = await user.findByPk(id.value);
    if (!data) return res.status(204).send({ message: "data not found" });

    data?.destroy();
    return res.status(200).send({ data });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};
