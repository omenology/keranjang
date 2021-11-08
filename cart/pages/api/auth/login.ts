import axios from "axios";
import { withSession, RequestWithSession, NextApiResponse } from "../../../utils";

export default withSession(async (req: RequestWithSession, res: NextApiResponse) => {
  try {
    const resLogin = await axios.post("http://localhost:4000/login", {
      ...req.body.payload,
    });
    const resMyself = await axios.get("http://localhost:4000/user/myself", {
      headers: {
        Authorization: "Bearer " + resLogin.data.data.token,
      },
    });

    req.session.set("token", resLogin.data.data.token);
    req.session.set("myself", resMyself.data.data);
    await req.session.save();

    res.status(resLogin.status).json({ data: resLogin.data });
  } catch (err) {
    if (err.response) res.status(err.response.status).json({ data: err.response.data });
    res.status(500).send({ message: "something went wrong" });
  }
});
