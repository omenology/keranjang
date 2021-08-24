import { Request, Response } from "express";
import Joi from "joi";

import { keranjang, user, barang } from "../data/models";

export const addToKeranjang = async (req: Request, res: Response) => {
  try {
    // 49edb524-beac-493f-aeb4-7a9d2f3aad39 barang
    // 88b0007e-8b92-4210-8cfb-4519a1396a88 user
    const data = await keranjang.create({
      userId: "826a8caf-c493-4005-bf2d-e08a6a1bbcf0",
      barangId: "0b6a458d-78cc-4ffa-b285-3ed5a9ef6ca4",
    });
    res.status(200).send({ data });
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
        userId: "useridfromjwt",
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
        userId: "useridfromjwt",
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
