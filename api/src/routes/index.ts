import { Router } from "express";
import barangRoute from "./barang";
import userRoute from "./user";
import keranjangRoute from "./keranjang";
import checkoutRoute from "./checkout";
import { login } from "../controllers";
import { sendMail } from "src/helpers/nodemailer";

const route = Router({ mergeParams: true });

route.post("/login", login);
route.use("/barang", barangRoute);
route.use("/user", userRoute);
route.use("/keranjang", keranjangRoute);
route.use("/checkout", checkoutRoute);
route.post("/tesemail", async (req, res) => {
  const sendmail = await sendMail("ikbalsukabarang@gmail.com", "lalal");
  console.log(sendmail);
  res.sendStatus(200);
});

export default route;
