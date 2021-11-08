import { withSession, RequestWithSession, NextApiResponse, axiosInstance } from "../../utils";

export default withSession(async (req: RequestWithSession, res: NextApiResponse) => {
  try {
    const resCheckout = await axiosInstance.get("checkout", {
      headers: {
        Authorization: "Bearer " + req.session.get("token"),
      },
    });

    res.status(200).json({ data: resCheckout.data });
  } catch (err) {
    res.status(500).send({ message: "something went wrong" });
  }
});
