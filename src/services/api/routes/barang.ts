import { Router } from "express";
import {
  getAllBarang,
  createBarang,
  deleteBarang,
  deletePermanent,
} from "../controllers";

const route = Router({ mergeParams: true });

route.get("/", getAllBarang);
route.post("/", createBarang);
route.delete("/:id/permanent", deletePermanent);
route.delete("/:id", deleteBarang);

export default route;
