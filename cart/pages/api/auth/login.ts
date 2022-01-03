import axios from "axios";
import {withIronSessionApiRoute} from "iron-session/next"
import { API_BASE_URL,cookieOptions } from "../../../utils";

export default withIronSessionApiRoute(async (req, res) => {
  try {
    
    const resLogin = await axios({
      baseURL: API_BASE_URL,
      url: "/api/auth/login",
      method: "post",
      data: req.body.payload,
    });
    req.session.token = resLogin.data.data.token;

    await req.session.save();
  
    res.status(resLogin.status).json({ data: resLogin.data.data });
  } catch (err) {
    if (err.response) res.status(err.response.status).json({ data: err.response.data });
    res.status(500).send({ message: "something went wrong" });
  }
},cookieOptions);
