import { Router } from "express";
import { getAllBarang, createBarang, updateBarang, deleteBarang, isAuth } from "../controllers";

const route = Router({ mergeParams: true });

route.get("/", isAuth, getAllBarang);
route.post("/", isAuth, createBarang);
route.put("/:id", isAuth, updateBarang);
route.delete("/:id", isAuth, deleteBarang);

export default route;
