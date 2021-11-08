import { withSession, RequestWithSession, NextApiResponse, axiosInstance } from "../../../utils";

export default withSession(async (req: RequestWithSession, res: NextApiResponse) => {
  try {
    const resMyself = await axiosInstance.get("/user/myself/", {
      headers: {
        Authorization: "Bearer " + req.session.get("token"),
      },
    });

    req.session.set("myself", resMyself.data.data);
    await req.session.save();

    res.status(resMyself.status).json({ data: resMyself.data });
  } catch (err) {
    res.status(500).send({ message: "something went wrong" });
  }
});
