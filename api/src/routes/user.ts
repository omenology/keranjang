import { Router } from "express";
import { createUser, getAllUser, getMyself, updateUser, deleteUser, isAuth, forgetPassword } from "../controllers";

const route = Router({ mergeParams: true });

route.get("/", isAuth, getAllUser);
route.get("/myself", isAuth, getMyself);
route.post("/", createUser);
route.put("/", isAuth, updateUser);
route.put("/:id", isAuth, updateUser);
route.delete("/:id", isAuth, deleteUser);
route.post("/forget", forgetPassword);

export default route;
