import { Request, Response } from "express";
import Joi from "joi";

import { barang, keranjang } from "../data/models";

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
    const { rows: data, count: total } = await barang.findAndCountAll({ limit, offset });

    res.status(200).send({ info: { limit, offset, total }, data });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

export const createBarang = async (req: Request, res: Response) => {
  try {
    const body = bodySchema.validate(req.body);
    if (body.error) return res.status(400).send({ message: body.error.message });
    const data = await barang.create({
      ...body.value,
    });
    res.status(200).send({ data });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

export const updateBarang = async (req: Request, res: Response) => {
  try {
    const id = Joi.string().guid().validate(req.params.id);
    const body = bodySchema.validate(req.body);

    if (id.error) return res.status(400).send({ message: "id fortmat is not valid" });
    if (body.error) return res.status(400).send({ message: body.error.message });

    const data = await barang.findByPk(id.value);
    if (!data) return res.status(204).send({ message: "data not found" });

    data?.set(body.value);
    data?.save();
    return res.status(200).send({ data });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

export const deleteBarang = async (req: Request, res: Response) => {
  try {
    const id = Joi.string().guid().validate(req.params.id);
    if (id.error) return res.status(400).send({ message: "id fortmat is not valid" });

    const data = await barang.findByPk(id.value);
    if (!data) return res.status(204).send({ message: "data not found" });

    data?.destroy();
    return res.status(200).send({ data });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};
