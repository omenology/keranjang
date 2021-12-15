import axios from "axios";
import { withSession, RequestWithSession, NextApiResponse, API_BASE_URL } from "../../../utils";

export default withSession(async (req: RequestWithSession, res: NextApiResponse) => {
  try {
    const resLogin = await axios({
      baseURL: API_BASE_URL,
      url: "/api/auth/login",
      method: "post",
      data: req.body.payload,
    });
    req.session.set("token", resLogin.data.data.token);
    console.log("====");

    await req.session.save();

    res.status(resLogin.status).json({ data: resLogin.data.data });
  } catch (err) {
    if (err.response) res.status(err.response.status).json({ data: err.response.data });
    res.status(500).send({ message: "something went wrong" });
  }
});
