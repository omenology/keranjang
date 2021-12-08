import { Router } from "express";
import { getAllBarang, createBarang, updateBarang, deleteBarang } from "../controllers";

const route = Router({ mergeParams: true });

route.get("/", getAllBarang);
route.post("/", createBarang);
route.put("/:id", updateBarang);
route.delete("/:id", deleteBarang);

export default route;
