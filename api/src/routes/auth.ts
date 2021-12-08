import { Router } from "express";
import { createUser, forgetPassword } from "../controllers";

const route = Router({ mergeParams: true });

route.post("/register", createUser);
route.post("/forget", forgetPassword);

export default route;
