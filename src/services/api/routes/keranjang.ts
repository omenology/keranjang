import { Router } from "express";
import { addToKeranjang, deletBarangFromKeranjang, getKeranjang, isAuth } from "../controllers";

const route = Router({ mergeParams: true });

route.get("/", isAuth, getKeranjang);
route.post("/:id", isAuth, addToKeranjang);
route.delete("/:id", isAuth, deletBarangFromKeranjang);

export default route;
