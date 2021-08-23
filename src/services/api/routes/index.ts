import { Router } from "express";
import barangRoute from "./barang";
import userRoute from "./user";
import keranjangRoute from "./keranjang";

const route = Router({ mergeParams: true });

route.use("/barang", barangRoute);
route.use("/user", userRoute);
route.use("/keranjang", keranjangRoute);

export default route;
