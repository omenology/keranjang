import { withSession, RequestWithSession, NextApiResponse } from "../../../utils";

export default withSession(async (req: RequestWithSession, res: NextApiResponse) => {
  req.session.destroy();
  res.status(200).send({ message: "logout successful" });
});
