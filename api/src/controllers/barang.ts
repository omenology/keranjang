import { Request, Response } from "express";
import Joi, { object } from "joi";
import { Op } from "sequelize";
import httpError, { HttpError } from "http-errors";

import { barang } from "../data/models";
import { logger } from "../helpers/utils";

// validation body request
const bodySchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().default(""),
  price: Joi.number().default(0.0),
  image: Joi.string().default("https://upload.wikimedia.org/wikipedia/commons/thumb/archive/a/ac/20070325222640%21No_image_available.svg/120px-No_image_available.svg.png"),
}).options({ stripUnknown: true });

const paginationQuery = Joi.object({
  limit: Joi.number().min(0).default(10),
  offset: Joi.number().min(0).default(0),
  items: Joi.array().items(Joi.string().guid()).default([]),
}).options({ stripUnknown: true });

const orderQuery = Joi.object({
  id: Joi.string()
    .uppercase()
    .empty("")
    .custom((val) => (val == "DESC" ? "DESC" : "ASC")),
  name: Joi.string()
    .uppercase()
    .empty("")
    .custom((val) => (val == "DESC" ? "DESC" : "ASC")),
  price: Joi.string()
    .uppercase()
    .empty("")
    .custom((val) => (val == "DESC" ? "DESC" : "ASC")),
}).options({ stripUnknown: true });

const tryJsonParse = (jsonStringify: string) => {
  try {
    return JSON.parse(jsonStringify);
  } catch (error) {}
  return undefined;
};

export const getAllBarang = async (req: Request, res: Response) => {
  try {
    req.query.items = tryJsonParse(req.query?.items as string);
    const pQueryValidated = paginationQuery.validate(req.query);
    const { limit, offset, items } = pQueryValidated.value;
    if (pQueryValidated.error) throw httpError(400, pQueryValidated.error.message);

    const oQueryValidated = orderQuery.validate(req.query);
    const order: any[] = Object.keys(oQueryValidated.value).map((val) => [val, oQueryValidated.value[val]]);

    let whereIn = null;
    if (items.length != 0) {
      whereIn = {
        id: {
          [Op.in]: items,
        },
      };
    }
    const { rows: data, count: total } = await barang.findAndCountAll({
      limit,
      offset,
      where: {
        ...whereIn,
      },
      order,
    });

    res.status(200).send({ info: { limit, offset, total }, data });
  } catch (err: any) {
    const error: HttpError = err;
    logger.error(error);
    res.status(error.statusCode || 500).send({ message: error.message });
  }
};

export const createBarang = async (req: Request, res: Response) => {
  try {
    const body = bodySchema.validate(req.body);
    if (body.error) throw httpError(400, body.error.message);

    const data = await barang.create({
      ...body.value,
    });
    res.status(200).send({ data });
  } catch (err: any) {
    const error: HttpError = err;
    logger.error(error);
    res.status(error.statusCode || 500).send({ message: error.message });
  }
};

export const updateBarang = async (req: Request, res: Response) => {
  try {
    const id = Joi.string().guid().validate(req.params.id);
    const body = bodySchema.validate(req.body);

    if (id.error) throw httpError(400, "id fortmat is not valid");

    if (body.error) throw httpError(400, body.error.message);

    const data = await barang.findByPk(id.value);
    if (!data) return res.sendStatus(200);

    data?.set(body.value);
    data?.save();
    return res.status(200).send({ data });
  } catch (err: any) {
    const error: HttpError = err;
    logger.error(error);
    res.status(error.statusCode || 500).send({ message: error.message });
  }
};

export const deleteBarang = async (req: Request, res: Response) => {
  try {
    const id = Joi.string().guid().validate(req.params.id);
    if (id.error) throw httpError(400, "id fortmat is not valid");

    const data = await barang.findByPk(id.value);
    if (!data) return res.sendStatus(204);

    data.destroy();
    return res.status(200).send({ data });
  } catch (err: any) {
    const error: HttpError = err;
    console.log(err);
    logger.error(error);
    res.status(error.statusCode || 500).send({ message: error.message });
  }
};
