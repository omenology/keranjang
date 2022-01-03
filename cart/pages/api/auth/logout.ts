import { withIronSessionApiRoute } from "iron-session/next";
import { cookieOptions } from "../../../utils";

export default withIronSessionApiRoute(async (req, res) => {
  req.session.destroy();
  res.status(200).send({ message: "logout successful" });
}, cookieOptions);
