import { Request, Response } from "express";
import Joi from "joi";
import httpError, { HttpError } from "http-errors";
import { randomBytes } from "crypto";

import { logger, snap } from "src/helpers/utils";
import { keranjang, barang } from "../data/models";

export const addToKeranjang = async (req: Request, res: Response) => {
  try {
    const idBarang = Joi.string().guid().validate(req.params.id);
    if (idBarang.error) throw httpError(400, "id fortmat is not valid");

    const data = await keranjang.create({
      userId: req.decoded.userId,
      barangId: idBarang.value,
    });
    return res.status(200).send({ data });
  } catch (err: any) {
    const error: HttpError = err;
    logger.error(error);
    res.status(error.statusCode || 500).send({ message: error.message });
  }
};

export const getKeranjang = async (req: Request, res: Response) => {
  try {
    const { value: limit } = Joi.number().default(10).validate(req.query.limit);
    const { value: offset } = Joi.number().default(0).validate(req.query.offset);
    const { rows: data, count: total } = await keranjang.findAndCountAll({
      where: {
        userId: req.decoded.userId,
      },
      include: [
        {
          model: barang,
        },
      ],
    });

    res.status(200).send({ info: { limit, offset, total }, data });
  } catch (err: any) {
    const error: HttpError = err;
    logger.error(error);
    res.status(error.statusCode || 500).send({ message: error.message });
  }
};

export const deletBarangFromKeranjang = async (req: Request, res: Response) => {
  try {
    const idBarang = Joi.string().guid().validate(req.params.id);
    if (idBarang.error) throw httpError(400, "id fortmat is not valid");

    const data = await keranjang.destroy({
      where: {
        userId: req.decoded.userId,
        barangId: idBarang.value,
      },
    });

    if (data === 0) return res.sendStatus(204);
    return res.status(200).send({ data });
  } catch (err: any) {
    const error: HttpError = err;
    logger.error(error);
    res.status(error.statusCode || 500).send({ message: error.message });
  }
};

export const createTransaction = async (req: Request, res: Response) => {
  try {
    const body = Joi.object({
      gross_amount: Joi.number().required(),
      shipping_address: Joi.string().required(),
      reciver: Joi.string(),
      item_details: Joi.array().items(
        Joi.object({
          id: Joi.string().guid(),
          price: Joi.number(),
          quantity: Joi.number(),
          name: Joi.string(),
        })
      ),
    })
      .options({ stripUnknown: true })
      .validate(req.body);
    if (body.error) throw httpError(400, body.error.message);

    const parameter: parameterSnap = {
      transaction_details: {
        order_id: `order-${randomBytes(5).toString("hex")}`,
        gross_amount: body.value.gross_amount,
      },
      credit_card: {
        secure: true,
      },
      item_details: body.value.item_details,
      customer_details: {
        email: req.decoded.email,
        first_name: req.decoded.username,
        shipping_address: {
          address: body.value.shipping_address,
          first_name: body.value.reciver,
        },
      },
    };
    const snapRes = await snap.createTransaction(parameter);
    return res.status(200).send({ data: snapRes });
  } catch (err: any) {
    const error: HttpError = err;
    logger.error(error);
    res.status(error.statusCode || error.httpStatusCode || 500).send({ message: error.message });
  }
};
