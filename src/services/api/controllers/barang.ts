import { Request, Response } from "express";

import { barang, keranjang } from "../data/models";

export const getAllBarang = async (req: Request, res: Response) => {
  try {
    const data = await barang.findAll();
    res.status(200).send({ data });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

export const createBarang = async (req: Request, res: Response) => {
  try {
    const data = await barang.create({
      name: req.body.name,
      price: req.body.price,
      quantities: 3,
    });
    res.status(200).send({ data });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

export const deleteBarang = async (req: Request, res: Response) => {
  console.log(req.params.id);
  try {
    const data = await barang.findByPk("0b6a458d-78cc-4ffa-b285-3ed5a9ef6ca4");
    data?.destroy();
    res.status(200).send({ data });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

export const deletePermanent = async (req: Request, res: Response) => {
  console.log(req.params.id);
  try {
    //49edb524-beac-493f-aeb4-7a9d2f3aad39
    const data = await barang.destroy({
      where: {
        id: "b49118fe-d795-40d6-8c95-169d0d7ff5a6",
      },
      force: true,
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};
