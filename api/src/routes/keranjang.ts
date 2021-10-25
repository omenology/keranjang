import { Router } from "express";
import { addToKeranjang, deletBarangFromKeranjang, getKeranjang, isAuth, createTransaction } from "../controllers";

const route = Router({ mergeParams: true });

route.get("/", isAuth, getKeranjang);
route.post("/transaction", isAuth, createTransaction);
route.post("/:id", isAuth, addToKeranjang);
route.delete("/:id", isAuth, deletBarangFromKeranjang);

export default route;
