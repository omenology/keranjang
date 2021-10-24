import { Request, Response } from "express";
import { user } from "../data/models";

let mockRequest: Partial<Request>;
let mockResponse: Partial<Response>;

beforeEach(() => {
  mockRequest = {
    query: {
      limit: undefined,
      offset: undefined,
    },
    body: {
      items: undefined,
    },
    decoded: undefined,
  };

  mockResponse = {
    send: jest.fn().mockReturnThis(),
    status: jest.fn().mockReturnThis(),
  };
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("controller getAllUser", () => {
  test.todo("tanpa query --> 200 limit 10 dan offset 0");
  test.todo("query limit -1 --> error 400 dengan pesan validasi");
  test.todo("query limit string --> error 400 dengan pesan validasi");
  test.todo("query offset -1 --> error 400 dengan pesan validasi");
  test.todo("query offset string --> error 400 dengan pesan validasi");
});

describe("controller getMyself", () => {
  test.todo("data tida ada di DB");
  test.todo("ambil data diri berhasil");
});

describe("controller createUser", () => {
  test.todo("validasi body error");
  test.todo("create user berhasil");
});

describe("controller updateUser", () => {
  test.todo("validasi id from req.params atau req.decode");
  test.todo("validasi body error");
  test.todo("user tidak ditemukan di DB");
  test.todo("update user berhasil");
});
