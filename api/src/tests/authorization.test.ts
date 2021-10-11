import { generateToken, verifyToken, awt as jwt } from "@jwt/index";
import { Request, Response, NextFunction } from "express";
import { isAuth } from "../controllers/auth";

describe("tes middleware isAuth dan tes function verivy, generate token ", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let nextFunction: NextFunction = jest.fn();

  beforeEach(() => {
    mockRequest = {
      header: jest.fn(),
      headers: {
        // authorization: "Bearer 123",
      },
      decoded: undefined,
    };
    mockResponse = {
      send: jest.fn().mockReturnThis(),
      status: jest.fn().mockReturnThis(),
    };
  });

  test("tes generate token", async () => {
    const payload = { email: "tes", userId: "1", username: "username" };
    const token = await generateToken(payload);
    expect(token).toEqual(expect.any(String));

    const decode = await verifyToken(token);
    expect(decode.error).toBe(undefined);
    expect(decode.data).toEqual({ ...payload, iat: expect.any(Number), exp: expect.any(Number) });
  });

  test("verivy token benar", async () => {
    const spy = jest.spyOn(jwt, "verify").mockImplementation(() => {
      return { email: "tes", userId: "1", username: "username", iat: expect.any(Number), exp: expect.any(Number) };
    });

    const results = verifyToken("token benar");
    expect(results.data).toEqual({ email: "tes", userId: "1", username: "username", iat: expect.any(Number), exp: expect.any(Number) });

    spy.mockRestore();
  });

  test("verivy token error", async () => {
    const decode = await verifyToken("token");
    expect(decode.error).toEqual(expect.any(Error));
  });

  test("isAuth without token", async () => {
    let expectRes = {
      message: expect.any(String),
    };

    await isAuth(mockRequest as Request, mockResponse as Response, nextFunction);

    expect(mockRequest.headers?.authorization).toBeFalsy();
    expect(mockRequest.header).toBeCalled();
    expect(mockResponse.status).toBeCalledWith(401);
    expect(mockResponse.send).toBeCalledWith(expectRes);
    expect(nextFunction).toBeCalledTimes(0);
  });

  test("isAuth invalid token", async () => {
    let expectRes = {
      message: expect.any(String),
    };

    mockRequest.headers = {
      authorization: "Bearer tokensalah",
    };

    await isAuth(mockRequest as Request, mockResponse as Response, nextFunction);

    expect(mockRequest.headers?.authorization).toBeTruthy();
    expect(mockResponse.status).toBeCalledWith(401);
    expect(mockResponse.send).toBeCalledWith(expectRes);
    expect(nextFunction).toBeCalledTimes(0);
  });

  test("isAuth valid Token", async () => {
    const spy = jest.spyOn(jwt, "verify").mockImplementation(() => {
      return { email: "tes", userId: "1", username: "username", iat: expect.any(Number), exp: expect.any(Number) };
    });

    mockRequest.headers = {
      authorization: "Bearer tokenbenar",
    };
    await isAuth(mockRequest as Request, mockResponse as Response, nextFunction);

    expect(mockRequest.headers.authorization).toBe("Bearer tokenbenar");
    expect(mockRequest.decoded).toEqual(expect.any(Object));
    expect(nextFunction).toBeCalledTimes(1);

    spy.mockRestore();
  });

  test.todo("tessss");
});
