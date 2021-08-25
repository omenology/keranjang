import { Request, Response } from "express";
import Joi from "joi";

import { keranjang, user, barang } from "../data/models";

export const addToKeranjang = async (req: Request, res: Response) => {
  try {
    const idBarang = Joi.string().guid().validate(req.params.id);
    if (idBarang.error) return res.status(400).send({ message: "id fortmat is not valid" });

    const data = await keranjang.create({
      userId: req.decoded.userId,
      barangId: idBarang.value,
    });
    return res.status(200).send({ data });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
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
    });

    res.status(200).send({ info: { limit, offset, total }, data });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

export const deletBarangFromKeranjang = async (req: Request, res: Response) => {
  try {
    const idBarang = Joi.string().guid().validate(req.params.id);
    if (idBarang.error) return res.status(400).send({ message: "id fortmat is not valid" });
    const data = await keranjang.findOne({
      where: {
        userId: req.decoded.userId,
        barangId: idBarang.value,
      },
    });
    if (!data) return res.status(204);
    data.destroy();
    return res.status(200).send({ data });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};
