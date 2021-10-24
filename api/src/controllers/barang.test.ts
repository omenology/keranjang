import { Request, Response } from "express";
import { Model } from "mongoose";
import { InstanceDestroyOptions } from "sequelize/types";
import { barang } from "../data/models";
import { getAllBarang, createBarang, deleteBarang } from "./barang";

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
    params: undefined,
  };

  mockResponse = {
    send: jest.fn().mockReturnThis(),
    status: jest.fn().mockReturnThis(),
    sendStatus: jest.fn(),
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
    expect(findAndCountAll).toBeCalledWith(
      expect.objectContaining({
        limit: 10,
        offset: 0,
      })
    );
    expect(mockResponse.status).toBeCalledWith(200);
    expect(mockResponse.send).toBeCalledWith(expectRes);
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

  test("query order by id, value string asal akan diisi nialu default ASC ", async () => {
    const findAndCountAll = jest.spyOn(barang, "findAndCountAll");

    mockRequest.query = {
      id: "",
    };
    await getAllBarang(mockRequest as Request, mockResponse as Response);
    expect(findAndCountAll).toBeCalledTimes(1);
    expect(findAndCountAll).toBeCalledWith(expect.not.objectContaining({ order: [["id", expect.any(String)]] }));
    findAndCountAll.mockReset();
    mockRequest.query = {
      id: "ssss",
    };
    await getAllBarang(mockRequest as Request, mockResponse as Response);
    expect(findAndCountAll).toBeCalledTimes(1);
    expect(findAndCountAll).toBeCalledWith(expect.objectContaining({ order: [["id", "ASC"]] }));
  });

  test("query order dengan banyak column", async () => {
    const findAndCountAll = jest.spyOn(barang, "findAndCountAll");

    mockRequest.query = {
      id: "ASC",
      name: "DESC",
    };
    await getAllBarang(mockRequest as Request, mockResponse as Response);
    expect(findAndCountAll).toBeCalledTimes(1);
    expect(findAndCountAll).toBeCalledWith(
      expect.objectContaining({
        order: [
          ["id", "ASC"],
          ["name", "DESC"],
        ],
      })
    );
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
  test("validasi params id error", async () => {
    mockRequest.params = {
      id: "formatsalah",
    };
    await deleteBarang(mockRequest as Request, mockResponse as Response);
    expect(mockResponse.status).toBeCalledWith(400);
    expect(mockResponse.send).toBeCalledWith({ message: "id fortmat is not valid" });
  });

  test("validasi params id succes dan data tidak ada di database", async () => {
    const findByPk = jest.spyOn(barang, "findByPk");
    mockRequest.params = {
      id: "5d99f215-880c-486b-8b14-7c9579405621",
    };
    await deleteBarang(mockRequest as Request, mockResponse as Response);
    expect(findByPk).toBeCalledTimes(1);
    expect(findByPk).toBeCalledWith(mockRequest.params.id);
    expect(mockResponse.sendStatus).toBeCalledWith(204);
  });

  test("validasi params id succes dan delete data success", async () => {
    const findByPk = jest.spyOn(barang, "findByPk").mockResolvedValueOnce({
      destroy: jest.fn(),
      id: "c0053e31-34d8-4e12-b290-5dd77e156f82",
      name: "barang3",
      price: 300,
      description: "aslkdj",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/archive/a/ac/20070325222640%21No_image_available.svg/120px-No_image_available.svg.png",
      createdAt: "2021-10-16T14:42:30.523Z",
      updatedAt: "2021-10-16T14:42:30.523Z",
    } as any);

    mockRequest.params = {
      id: "90a6de11-f0af-4507-a6a7-32836586b8c2",
    };
    await deleteBarang(mockRequest as Request, mockResponse as Response);
    let { destroy } = await findByPk.mock.results[0].value;

    expect(findByPk).toBeCalledTimes(1);
    expect(destroy).toBeCalledTimes(1);
    expect(findByPk).toBeCalledWith(mockRequest.params.id);

    expect(mockResponse.status).toBeCalledWith(200);
    expect(mockResponse.send).toBeCalledWith({
      data: expect.objectContaining({
        id: expect.any(String),
        name: expect.any(String),
        description: expect.any(String),
        image: expect.any(String),
        price: expect.any(Number),
        createdAt: expect.any(String),
      }),
    });
  });
});
