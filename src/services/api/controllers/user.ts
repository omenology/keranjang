import { Request, Response } from "express";

import { user } from "../data/models";

export const createUser = async (req: Request, res: Response) => {
  try {
    const data = await user.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    res.status(200).send({ data });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};
