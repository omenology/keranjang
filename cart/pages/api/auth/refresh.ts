import axios from "axios";
import { withIronSessionApiRoute } from "iron-session/next";
import { cookieOptions, API_BASE_URL } from "../../../utils";

export default withIronSessionApiRoute(async (req, res) => {
  try {
    const response = await axios({
      baseURL: API_BASE_URL,
      url: "/api/auth/refreshtoken",
      method: "get",
      headers: {
        Authorization:`Bearer ${req.session.token}`,
      },
    });
    
    req.session.token = response.data.data.token;
    await req.session.save();

    res.status(response.status).json({ data: response.data });
  } catch (err) {
    if (err.response) res.status(err.response.status).json({ data: err.response.data });
    res.status(500).send({ message: "something went wrong" });
  }
},cookieOptions);
