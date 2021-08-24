import { Router } from "express";
import { addToKeranjang, getKeranjang } from "../controllers";

const route = Router({ mergeParams: true });

route.post("/", addToKeranjang);
route.get("/", getKeranjang);

export default route;
