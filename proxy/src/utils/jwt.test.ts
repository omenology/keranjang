import { Request, Response, NextFunction } from "express";
import { generateToken, verifyToken } from "./jwt";
import jwt from "jsonwebtoken";

let mockRequest: Partial<Request>;
let mockResponse: Partial<Response>;
let nextFunction: NextFunction = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();

  mockRequest = {
    header: jest.fn(),
    headers: {},
  };

  mockResponse = {
    send: jest.fn().mockReturnThis(),
    status: jest.fn().mockReturnThis(),
  };
});

describe("tes", () => {
  test("test", async () => {
    expect(true).toBe(true);
  });
});

describe("tes middlware verivyToken dan function generate token", () => {
  test("tes generate token", async () => {
    const payload = { email: "tes", userId: "1", username: "username" };
    const token = await generateToken(payload);

    expect(token).toEqual(expect.any(String));
  });

  test("middleware verivy token benar", async () => {
    mockRequest.headers = {
      authorization: "Bearer tokenbenear",
    };

    const vt = jest.spyOn(jwt, "verify").mockImplementationOnce(() => {
      return {
        email: "tes",
        userId: "1",
        username: "username",
        iat: expect.any(Number),
        exp: expect.any(Number),
      };
    });

    await verifyToken(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction
    );

    expect(mockRequest.headers?.authorization).toBeTruthy();
    expect(vt).toBeCalled();
    expect(nextFunction).toBeCalled();
  });

  test("middleware verivy token salah", async () => {
    mockRequest.headers = {
      authorization: "Bearer tokensalah",
    };

    const vt = jest.spyOn(jwt, "verify");

    await verifyToken(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction
    );

    expect(mockRequest.headers?.authorization).toBeTruthy();
    expect(vt).toBeCalled();
    expect(nextFunction).not.toBeCalled();
    expect(mockResponse.status).toBeCalledWith(401);
    expect(mockResponse.send).toBeCalledWith({ message: "jwt malformed" });
  });

  test("middleware verivy tanpa token", async () => {
    const vt = jest.spyOn(jwt, "verify");

    await verifyToken(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction
    );

    expect(mockRequest.headers?.authorization).toBeFalsy();
    expect(vt).not.toBeCalled();
    expect(nextFunction).not.toBeCalled();
    expect(mockResponse.status).toBeCalledWith(401);
    expect(mockResponse.send).toBeCalledWith({ message: "Unauthorized" });
  });
});
