import { Router } from "express";
import { addToCheckout, isAuth, checkAndUpdate } from "../controllers";

const route = Router({ mergeParams: true });

route.post("/", isAuth, addToCheckout);
route.get("/", isAuth, checkAndUpdate);
route.post("/cancale", isAuth);
route.post("/proceed", isAuth);

export default route;
