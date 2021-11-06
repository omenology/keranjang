import { Request, Response } from "express";
import Joi from "joi";
import httpError, { HttpError } from "http-errors";
import axios from "axios";

import { logger } from "../helpers/utils";
import { checkout } from "../data/models";
import { MIDTRANS_SERVER_KEY } from "src/helpers/constant";

const bodySchema = Joi.object({
  order_id: Joi.string().required(),
  item_details: Joi.array().items(Joi.object()).default([]),
  gross_amount: Joi.number().required(),
  shipping_address: Joi.string().required(),
  reciver: Joi.string().required(),
  paymentStatus: Joi.string().required(),
}).options({ stripUnknown: true });

const paginationQuery = Joi.object({
  limit: Joi.number().min(0).default(10),
  offset: Joi.number().min(0).default(0),
}).options({ stripUnknown: true });

export const addToCheckout = async (req: Request, res: Response) => {
  try {
    const body = bodySchema.validate(req.body);
    if (body.error) throw httpError(400, body.error.message);

    const data = await checkout.create({
      ...body.value,
      orderId: body.value.order_id,
      totalPayment: body.value.gross_amount,
      shippingAddress: body.value.shipping_address,
      items: body.value.item_details,
      user: {
        id: req.decoded.userId,
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

export const checkAndUpdate = async (req: Request, res: Response) => {
  try {
    const pQueryValidated = paginationQuery.validate(req.query);
    const { limit, offset } = pQueryValidated.value;
    if (pQueryValidated.error) throw httpError(400, pQueryValidated.error.message);

    const { rows, count: total } = await checkout.findAndCountAll({
      where: {
        user: {
          id: req.decoded.userId,
        },
      },
      limit,
      offset,
    });
    const recentStatus = rows.map(async (val) => {
      if (val.getDataValue("paymentStatus") === "pendding") {
        const response = await axios.get(`https://api.sandbox.midtrans.com/v2/${val.getDataValue("orderId")}/status`, {
          auth: {
            username: MIDTRANS_SERVER_KEY,
            password: "",
          },
        });

        if (response.data.status_code == "200") {
          val.set("paymentStatus", "success");
          val.save();
        }
      }
      return val.get();
    });

    return res.status(200).send({ info: { limit, offset, total }, data: await Promise.all(recentStatus) });
  } catch (err: any) {
    const error: HttpError = err;
    logger.error(error);
    res.status(error.statusCode || 500).send({ message: error.message });
  }
};
