import { Router } from "express";
import { addToKeranjang, deletBarangFromKeranjang, getKeranjang, createTransaction } from "../controllers";

const route = Router({ mergeParams: true });

route.get("/", getKeranjang);
route.post("/transaction", createTransaction);
route.post("/:id", addToKeranjang);
route.delete("/:id", deletBarangFromKeranjang);

export default route;
