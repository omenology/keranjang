import { Router } from "express";
import { createUser } from "../controllers";

const route = Router({ mergeParams: true });

route.post("/", createUser);

export default route;
