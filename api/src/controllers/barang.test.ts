import { Request, Response } from "express";
import { barang } from "../data/models";
import { getAllBarang, createBarang } from "./barang";

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

describe("controller getAllbarang", () => {
  test("tanpa query --> 200 limit 10 dan offset 0", async () => {
    const findAndCountAll = jest.spyOn(barang, "findAndCountAll").mockResolvedValueOnce({
      count: expect.any(Number),
      rows: [
        expect.objectContaining({
          id: "61099115-fc5f-4002-9791-1cdd8f323b5d",
          name: "barang1",
          price: 100,
          description: "barang",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/archive/a/ac/20070325222640%21No_image_available.svg/120px-No_image_available.svg.png",
          createdAt: "2021-10-05T12:15:38.700Z",
          updatedAt: "2021-10-05T12:15:38.700Z",
        }),
      ],
    });
    const expectRes = {
      info: {
        limit: 10,
        offset: 0,
        total: expect.any(Number),
      },
      data: [
        expect.objectContaining({
          id: expect.any(String),
          name: expect.any(String),
          price: expect.any(Number),
          description: expect.any(String),
          image: expect.any(String),
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        }),
      ],
    };

    await getAllBarang(mockRequest as Request, mockResponse as Response);
    expect(findAndCountAll).toBeCalledTimes(1);
    expect(findAndCountAll).toBeCalledWith({
      limit: 10,
      offset: 0,
      where: {},
    });
    expect(mockResponse.status).toBeCalledWith(200);
    expect(mockResponse.send).toBeCalledWith(expectRes);
    console.log(await findAndCountAll.mock.results[0].value, "========");
  });

  test("query limit -1 --> error 400 dengan pesan validasi", async () => {
    const findAndCountAll = jest.spyOn(barang, "findAndCountAll");

    mockRequest.query = {
      limit: "-1",
    };

    await getAllBarang(mockRequest as Request, mockResponse as Response);
    expect(findAndCountAll).toBeCalledTimes(0);
    expect(mockResponse.send).toBeCalledWith({
      message: '"limit" must be greater than or equal to 0',
    });
    expect(mockResponse.status).toBeCalledWith(400);
  });

  test("query limit string --> error 400 dengan pesan validasi", async () => {
    const findAndCountAll = jest.spyOn(barang, "findAndCountAll");

    mockRequest.query = {
      limit: "string",
    };

    await getAllBarang(mockRequest as Request, mockResponse as Response);
    expect(findAndCountAll).toBeCalledTimes(0);
    expect(mockResponse.send).toBeCalledWith({
      message: '"limit" must be a number',
    });
    expect(mockResponse.status).toBeCalledWith(400);
  });

  test("query offset -1 --> error 400 dengan pesan validasi", async () => {
    const findAndCountAll = jest.spyOn(barang, "findAndCountAll");

    mockRequest.query = {
      offset: "-1",
    };

    await getAllBarang(mockRequest as Request, mockResponse as Response);
    expect(findAndCountAll).toBeCalledTimes(0);
    expect(mockResponse.send).toBeCalledWith({
      message: '"offset" must be greater than or equal to 0',
    });
    expect(mockResponse.status).toBeCalledWith(400);
  });

  test("query offset string --> error 400 dengan pesan validasi", async () => {
    const findAndCountAll = jest.spyOn(barang, "findAndCountAll");

    mockRequest.query = {
      offset: "string",
    };

    await getAllBarang(mockRequest as Request, mockResponse as Response);
    expect(findAndCountAll).toBeCalledTimes(0);
    expect(mockResponse.send).toBeCalledWith({
      message: '"offset" must be a number',
    });
    expect(mockResponse.status).toBeCalledWith(400);
  });
});

describe("controller createBarang", () => {
  test.todo("validasi body success");
  test.todo("validasi body error");
});

describe("controller updateBarang", () => {
  test.todo("validasi params id success");
  test.todo("validasi params id error");
  test.todo("validasi body succes");
  test.todo("validasi body error");
  test.todo("data tidak ada di DB");
  test.todo("update success");
});

describe("controller deleteBarang", () => {
  test.todo("validasi params id success");
  test.todo("validasi params id error");
});
