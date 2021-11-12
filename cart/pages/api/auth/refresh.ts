import axios from "axios";
import { withSession, RequestWithSession, NextApiResponse } from "../../../utils";

export default withSession(async (req: RequestWithSession, res: NextApiResponse) => {
  try {
    const response = await axios.get("http://localhost:4000/refreshtoken", {
      headers: {
        Authorization: req.session.get("token"),
      },
    });

    req.session.set("token", response.data.data.token);
    await req.session.save();

    res.status(response.status).json({ data: response.data });
  } catch (err) {
    if (err.response) res.status(err.response.status).json({ data: err.response.data });
    res.status(500).send({ message: "something went wrong" });
  }
});
