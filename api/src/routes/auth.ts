import { Router } from "express";
import { createUser, login, forgetPassword } from "../controllers";

const route = Router({ mergeParams: true });

route.get("/login", login);
route.post("/register", createUser);
route.post("/forget", forgetPassword);

export default route;
