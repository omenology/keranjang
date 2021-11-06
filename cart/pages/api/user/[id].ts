import axios from "axios";
import { withSession, RequestWithSession, NextApiResponse } from "../../../utils";

export default withSession(async (req: RequestWithSession, res: NextApiResponse) => {
  try {
    const { id } = req.query;
    console.log(id);
    res.status(200).json({ id: id });
  } catch (err) {
    res.status(500).send({ message: "something went wrong" });
  }
});
