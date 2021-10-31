import { Request, Response } from "express";
import Joi from "joi";
import httpError, { HttpError } from "http-errors";

import { logger } from "../helpers/utils";
import { checkout } from "../data/models";

const bodySchema = Joi.object({
  order_id: Joi.string().required(),
  item_details: Joi.array().items(Joi.object()).default([]),
  gross_amount: Joi.number().required(),
  shipping_address: Joi.string().required(),
  reciver: Joi.string().required(),
  paymentStatus: Joi.string().required(),
}).options({ stripUnknown: true });

export const addToCheckout = async (req: Request, res: Response) => {
  try {
    const body = bodySchema.validate(req.body);
    if (body.error) throw httpError(400, body.error.message);

    const data = await checkout.create({
      ...body.value,
      user: {
        username: req.decoded.username,
        email: req.decoded.email,
      },
    });
    return res.status(200).send({ data });
  } catch (err: any) {
    const error: HttpError = err;
    logger.error(error);
    res.status(error.statusCode || 500).send({ message: error.message });
  }
};
