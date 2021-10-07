import { Request, Response } from "express";
import Joi from "joi";
import { CError, logger } from "src/helpers/utils";

import { keranjang, barang } from "../data/models";

export const addToKeranjang = async (req: Request, res: Response) => {
  try {
    const idBarang = Joi.string().guid().validate(req.params.id);
    if (idBarang.error) throw new CError("id fortmat is not valid", { code: 400 });

    const data = await keranjang.create({
      userId: req.decoded.userId,
      barangId: idBarang.value,
    });
    return res.status(200).send({ data });
  } catch (err: any) {
    const error: CError = err;
    logger.error(error);
    res.status(error.custom?.code || 500).send({ message: error.message });
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
    const error: CError = err;
    logger.error(error);
    res.status(error.custom?.code || 500).send({ message: error.message });
  }
};

export const deletBarangFromKeranjang = async (req: Request, res: Response) => {
  try {
    const idBarang = Joi.string().guid().validate(req.params.id);
    if (idBarang.error) throw new CError("id fortmat is not valid", { code: 400 });

    const data = await keranjang.destroy({
      where: {
        userId: req.decoded.userId,
        barangId: idBarang.value,
      },
    });

    if (data === 0) throw new CError("data not found", { code: 204 });
    return res.status(200).send({ data });
  } catch (err: any) {
    const error: CError = err;
    logger.error(error);
    res.status(error.custom?.code || 500).send({ message: error.message });
  }
};
