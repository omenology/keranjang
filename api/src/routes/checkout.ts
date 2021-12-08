import { Router } from "express";
import { addToCheckout, checkAndUpdate } from "../controllers";

const route = Router({ mergeParams: true });

route.post("/", addToCheckout);
route.get("/", checkAndUpdate);

export default route;
