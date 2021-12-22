import { Request, Response, NextFunction } from "express";
import {generateToken,verifyToken} from './jwt'
const jwt = require('./jwt')

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

describe("tes",() => {
    test("test",async()=>{
        expect(true).toBe(true);
    })
})

describe("tes middlware verivyToken dan function generate token", () => {
  test("tes generate token", async () => {
    const payload = { email: "tes", userId: "1", username: "username" };
    const token = await generateToken(payload);
    expect(token).toEqual(expect.any(String));

    const verivyToken = jest.spyOn(jwt, "verify").mockImplementationOnce(() => {
      return { email: "tes", userId: "1", username: "username", iat: expect.any(Number), exp: expect.any(Number) };
    });

    verifyToken(mockRequest as Request, mockResponse as Response, nextFunction);
    expect(mockRequest.header).toBeCalled();
    expect(nextFunction).toBeCalledTimes(0);
    expect(mockResponse.status).toBeCalledWith(401);
    expect(verivyToken).toBeCalledTimes(1);
    
    // const decode = await verifyToken(token);
    // expect(decode.error).toBe(undefined);
    // expect(decode.data).toEqual({ ...payload, iat: expect.any(Number), exp: expect.any(Number) });
  });

  // test("verivy token benar", async () => {
  //   jest.spyOn(jwt, "verify").mockImplementationOnce(() => {
  //     return { email: "tes", userId: "1", username: "username", iat: expect.any(Number), exp: expect.any(Number) };
  //   });

  //   const results = verifyToken("tokenbenar");
  //   expect(results.data).toEqual({ email: "tes", userId: "1", username: "username", iat: expect.any(Number), exp: expect.any(Number) });
  // });

  // test("verivy token error", async () => {
  //   const decode = await verifyToken("tokensalah");
  //   expect(decode.error).toEqual(expect.any(jwt.JsonWebTokenError));
  // });
});