import { Router } from "express";
import authRoute from "./auth";
import barangRoute from "./barang";
import userRoute from "./user";
import keranjangRoute from "./keranjang";
import checkoutRoute from "./checkout";
import { sendMail } from "../helpers/nodemailer";
import { decodeToken } from "../helpers/utils";

const route = Router({ mergeParams: true });

route.use("/auth", authRoute);
route.use("/barang", decodeToken, barangRoute);
route.use("/user", decodeToken, userRoute);
route.use("/keranjang", decodeToken, keranjangRoute);
route.use("/checkout", decodeToken, checkoutRoute);
route.post("/tesemail", async (req, res) => {
  const sendmail = await sendMail("ikbalsukabarang@gmail.com", "lalal");
  console.log(sendmail);
  res.sendStatus(200);
});

export default route;
