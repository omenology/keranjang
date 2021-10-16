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
  test.todo("tanpa query --> 200 limit 10 dan offset 0", async () => {});
  test.todo("query limit -1 --> error 400 dengan pesan validasi", async () => {});
  test.todo("query limit string --> error 400 dengan pesan validasi", async () => {});
  test.todo("query offset -1 --> error 400 dengan pesan validasi", async () => {});
  test.todo("query offset string --> error 400 dengan pesan validasi", async () => {});
});

describe("controller getMyself", () => {
  test.todo("data tida ada di DB", async () => {});
  test.todo("ambil data diri berhasil", async () => {});
});

describe("controller createUser", () => {
  test.todo("validasi body error", async () => {});
  test.todo("create user berhasil", async () => {});
});

describe("controller updateUser", () => {
  test.todo("validasi id from req.params atau req.decode", async () => {});
  test.todo("validasi body error", async () => {});
  test.todo("user tidak ditemukan di DB", async () => {});
  test.todo("update user berhasil", async () => {});
});
