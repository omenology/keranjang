import axios from "axios";
import { withSession, RequestWithSession, NextApiResponse } from "../../../utils";

export default withSession(async (req: RequestWithSession, res: NextApiResponse) => {
  try {
    const data = await axios.get("http://localhost:4000/user/myself/", {
      headers: {
        Authorization: "Bearer " + req.session.get("token"),
      },
      validateStatus: (status) => true,
    });

    res.status(data.status).json({ data: data.data });
  } catch (err) {
    res.status(500).send({ message: "something went wrong" });
  }
});
