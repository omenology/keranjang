import { Request, Response } from "express";

import { keranjang, user, barang } from "../data/models";

export const createKeranjang = async (req: Request, res: Response) => {
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
    const data = await user.findByPk("826a8caf-c493-4005-bf2d-e08a6a1bbcf0", {
      include: {
        model: keranjang,
        include: [barang],
      },
    });

    res.status(200).send({ data });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};
