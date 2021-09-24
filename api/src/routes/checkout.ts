import { Router } from "express";
import { addToCheckout, isAuth } from "../controllers";

const route = Router({ mergeParams: true });

route.post("/", isAuth, addToCheckout);
route.post("/cancale", isAuth);
route.post("/proceed", isAuth);

export default route;
