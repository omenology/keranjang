import axios from "axios";
import { withSession, RequestWithSession, NextApiResponse } from "../../utils";

export default withSession(async (req: RequestWithSession, res: NextApiResponse) => {
  try {
    console.log("hit");
    const data = await axios.get("http://localhost:4000/barang", {
      headers: {
        Authorization:
          "Bearer " +
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsQG1haWwuY29tIiwidXNlcm5hbWUiOiJ1c2VybmFtZTEiLCJ1c2VySWQiOiJiNzg1YTU2NC0yNTEzLTQ0ZmItOWEyOS1kZjhiMzlmOGIxNjgiLCJpYXQiOjE2MzYwMDA0NjcsImV4cCI6MTYzNjAyOTI2N30.SZV8e3e2JmgpBxvCtj2e4oNW-NUpsVu0Kl7fiDLa_xY",
      },
      validateStatus: (status) => true,
    });

    res.status(data.status).json({ data: data.data });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "something went wrong" });
  }
});
