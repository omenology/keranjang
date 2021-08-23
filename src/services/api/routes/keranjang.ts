import { Router } from "express";
import { createKeranjang, getKeranjang } from "../controllers";

const route = Router({ mergeParams: true });

route.post("/", createKeranjang);
route.get("/", getKeranjang);

export default route;
