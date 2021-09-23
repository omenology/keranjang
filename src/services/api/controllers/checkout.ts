import { Request, Response } from "express";
import Joi from "joi";

import { logger } from "../helpers/utils";
import { checkout } from "../data/models";

const bodySchema = Joi.object({
  items: Joi.array().items(Joi.string().guid()).default([]),
  totalPayment: Joi.number().required(),
  user: Joi.object({
    username: Joi.string(),
    email: Joi.string().email(),
  }).required(),
  shippingAddress: Joi.string().required(),
}).options({ stripUnknown: true });

export const addToCheckout = async (req: Request, res: Response) => {
  try {
    const body = bodySchema.validate(req.body);
    if (body.error) return res.status(400).send({ message: body.error.message });

    const data = await checkout.create({
      ...body.value,
    });
    res.status(200).send({ data });
  } catch (error) {
    logger.error(error);
    res.sendStatus(500);
  }
};
