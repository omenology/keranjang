import { Router } from "express";
import { createUser, getAllUser, updateUser, deleteUser, forgetPassword } from "../controllers";

const route = Router({ mergeParams: true });

route.get("/", getAllUser);
route.post("/", createUser);
route.put("/", updateUser);
route.put("/:id", updateUser);
route.delete("/:id", deleteUser);
route.post("/forget", forgetPassword);

export default route;
