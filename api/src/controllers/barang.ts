import { Request, Response } from "express";
import Joi from "joi";
import { Op } from "sequelize";

import { barang } from "../data/models";
import { logger, CError } from "src/helpers/utils";

// validation body request
const bodySchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().default(""),
  price: Joi.number().default(0.0),
  image: Joi.string().default("https://upload.wikimedia.org/wikipedia/commons/thumb/archive/a/ac/20070325222640%21No_image_available.svg/120px-No_image_available.svg.png"),
}).options({ stripUnknown: true });

export const getAllBarang = async (req: Request, res: Response) => {
  try {
    const { value: limit } = Joi.number().default(10).validate(req.query.limit);
    const { value: offset } = Joi.number().default(0).validate(req.query.offset);
    const { value: items, error: itemsError } = Joi.array().items(Joi.string().guid()).default([]).validate(req.body.items);
    if (itemsError) throw new CError(itemsError.message, { code: 400 });

    let con = null;
    if (items.length != 0) {
      con = {
        id: {
          [Op.in]: items,
        },
      };
    }
    const { rows: data, count: total } = await barang.findAndCountAll({
      limit,
      offset,
      where: {
        ...con,
      },
    });

    res.status(200).send({ info: { limit, offset, total }, data });
  } catch (err: any) {
    const error: CError = err;
    logger.error(error);
    res.status(error.custom?.code || 500).send({ message: error.message });
  }
};

export const createBarang = async (req: Request, res: Response) => {
  try {
    const body = bodySchema.validate(req.body);
    if (body.error) throw new CError(body.error.message, { code: 400 });

    const data = await barang.create({
      ...body.value,
    });
    res.status(200).send({ data });
  } catch (err: any) {
    const error: CError = err;
    logger.error(error);
    res.status(error.custom?.code || 500).send({ message: error.message });
  }
};

export const updateBarang = async (req: Request, res: Response) => {
  try {
    const id = Joi.string().guid().validate(req.params.id);
    const body = bodySchema.validate(req.body);

    if (id.error) throw new CError("id fortmat is not valid", { code: 400 });

    if (body.error) throw new CError(body.error.message, { code: 400 });

    const data = await barang.findByPk(id.value);
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

export const deleteBarang = async (req: Request, res: Response) => {
  try {
    const id = Joi.string().guid().validate(req.params.id);
    if (id.error) throw new CError("id fortmat is not valid", { code: 400 });

    const data = await barang.findByPk(id.value);
    if (!data) throw new CError("data not found", { code: 204 });

    data?.destroy();
    return res.status(200).send({ data });
  } catch (err: any) {
    const error: CError = err;
    logger.error(error);
    res.status(error.custom?.code || 500).send({ message: error.message });
  }
};
