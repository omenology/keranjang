import { Router } from "express";

const route = Router({ mergeParams: true });

route.use("/barang", (req, res) => {
  res.send({ tes: "mantap" }).status(200);
});

export default route;
