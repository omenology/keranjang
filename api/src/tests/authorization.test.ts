import { generateToken, verifyToken, jsonwebtoken as jwt } from "@jwt/index";
import { Request, Response, NextFunction } from "express";
import { isAuth } from "../controllers/auth";

const _jwt = require("@jwt/index");

let mockRequest: Partial<Request>;
let mockResponse: Partial<Response>;
let nextFunction: NextFunction = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();

  mockRequest = {
    header: jest.fn(),
    headers: {},
    decoded: undefined,
  };

  mockResponse = {
    send: jest.fn().mockReturnThis(),
    status: jest.fn().mockReturnThis(),
  };
});

describe("tes function verivy token dan generate token", () => {
  test("tes generate token", async () => {
    const payload = { email: "tes", userId: "1", username: "username" };
    const token = await generateToken(payload);
    expect(token).toEqual(expect.any(String));

    const decode = await verifyToken(token);
    expect(decode.error).toBe(undefined);
    expect(decode.data).toEqual({ ...payload, iat: expect.any(Number), exp: expect.any(Number) });
  });

  test("verivy token benar", async () => {
    jest.spyOn(jwt, "verify").mockImplementationOnce(() => {
      return { email: "tes", userId: "1", username: "username", iat: expect.any(Number), exp: expect.any(Number) };
    });

    const results = verifyToken("tokenbenar");
    expect(results.data).toEqual({ email: "tes", userId: "1", username: "username", iat: expect.any(Number), exp: expect.any(Number) });
  });

  test("verivy token error", async () => {
    const decode = await verifyToken("tokensalah");
    expect(decode.error).toEqual(expect.any(jwt.JsonWebTokenError));
  });
});

describe("tes middleware isAuth", () => {
  test("isAuth without token", async () => {
    const verifyToken = jest.spyOn(_jwt, "verifyToken");

    const expectRes = {
      message: "Unauthorized",
    };

    await isAuth(mockRequest as Request, mockResponse as Response, nextFunction);

    expect(mockRequest.headers?.authorization).toBeFalsy();
    expect(mockRequest.header).toBeCalled();
    expect(verifyToken).toBeCalledTimes(0);
    expect(mockResponse.status).toBeCalledWith(401);
    expect(mockResponse.send).toBeCalledWith(expectRes);
    expect(nextFunction).toBeCalledTimes(0);
  });

  test("isAuth invalid token", async () => {
    const verifyToken = jest.spyOn(_jwt, "verifyToken").mockImplementationOnce(() => {
      return {
        error: new jwt.JsonWebTokenError("Invalid token"),
      };
    });

    const expectRes = {
      message: "Invalid token",
    };

    mockRequest.headers = {
      authorization: "Bearer tokensalah",
    };

    await isAuth(mockRequest as Request, mockResponse as Response, nextFunction);

    expect(mockRequest.headers?.authorization).toBeTruthy();
    expect(verifyToken).toBeCalledTimes(1);
    expect(mockResponse.status).toBeCalledWith(401);
    expect(mockResponse.send).toBeCalledWith(expectRes);
    expect(nextFunction).toBeCalledTimes(0);
  });

  test("isAuth valid Token", async () => {
    const verifyToken = jest.spyOn(_jwt, "verifyToken").mockImplementationOnce(() => {
      return {
        data: { email: "tes", userId: "1", username: "username", iat: expect.any(Number), exp: expect.any(Number) },
      };
    });

    mockRequest.headers = {
      authorization: "Bearer tokenbenar",
    };

    await isAuth(mockRequest as Request, mockResponse as Response, nextFunction);

    expect(mockRequest.headers.authorization).toBe("Bearer tokenbenar");
    expect(verifyToken).toBeCalledTimes(1);
    expect(mockRequest.decoded).toEqual(
      expect.objectContaining({
        userId: expect.any(String),
        email: expect.any(String),
        username: expect.any(String),
      })
    );
    expect(nextFunction).toBeCalledTimes(1);
  });
});
