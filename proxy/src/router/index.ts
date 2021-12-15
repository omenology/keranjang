import { Request, Response, Router } from "express";
import { createProxyMiddleware, fixRequestBody } from "http-proxy-middleware";
import swaggerUI from "swagger-ui-express";

import { verifyToken, generateToken } from "../utils/jwt";
import connection from "../utils/connection";
import { API_URL, API_UPLOAD_URL } from "../utils/constants";

const docs = require("../docs-openapi.json");

const route = Router({ mergeParams: true });

route.use("/api/documentation", swaggerUI.serve, swaggerUI.setup(docs));
route.post("/api/auth/login", async (req: Request, res: Response) => {
  try {
    const { email, username, password } = req.body;
    if (!(email || username) || !password) return res.status(400).json({ message: `${!(email || username) ? "email or username required" : "password required"}` });

    const result = await connection.query(`SELECT * FROM "user" WHERE (email = $1 OR username = $2) AND password = $3`, [email, username, password]);
    if (result.rowCount <= 0) return res.status(401).json({ message: "email, username or password are wrong" });

    const token = generateToken({ userId: result.rows[0].id, email, username });
    return res.status(200).json({ data: { token } });
  } catch (err) {
    console.log((err as any).message);
    return res.status(500).json({ message: "something went wrong" });
  }
});
route.get("/api/auth/refreshtoken", verifyToken, async (req: Request, res: Response) => {
  try {
    const token = generateToken({ userId: req.decoded?.userId, email: req.decoded?.email, username: req.decoded?.username });
    return res.status(200).json({ data: { token } });
  } catch (error) {
    return res.status(500).json({ message: "something went wrong" });
  }
});
route.use(
  "/api-socket",
  verifyToken,
  createProxyMiddleware({
    target: "http://localhost:4001",
    ws: true,
    changeOrigin: true,
  })
);
route.get("/api-upload", createProxyMiddleware({ target: API_UPLOAD_URL, changeOrigin: true, pathRewrite: { "/api-upload": "" } }));
route.use("/api-upload", verifyToken, createProxyMiddleware({ target: API_UPLOAD_URL, changeOrigin: true, onProxyReq: fixRequestBody, pathRewrite: { "/api-upload": "" } }));
route.use("/api", verifyToken, createProxyMiddleware({ target: API_URL, changeOrigin: true, onProxyReq: fixRequestBody, pathRewrite: { "/api": "" } }));

export default route;
