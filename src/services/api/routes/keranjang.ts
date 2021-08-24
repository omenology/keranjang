import { Router } from "express";
import { addToKeranjang, getKeranjang, isAuth } from "../controllers";

const route = Router({ mergeParams: true });

route.post("/", isAuth, addToKeranjang);
route.get("/", isAuth, getKeranjang);

export default route;
