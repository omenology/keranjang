import { Router } from "express";
import { createUser, getAllUser, getMyself, updateUser, deleteUser, isAuth } from "../controllers";

const route = Router({ mergeParams: true });

route.get("/", isAuth, getAllUser);
route.get("/myself", isAuth, getMyself);
route.post("/", createUser);
route.put("/", isAuth, updateUser);
route.put("/:id", isAuth, updateUser);
route.delete("/:id", isAuth, deleteUser);

export default route;
