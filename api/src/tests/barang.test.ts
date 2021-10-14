import { Request, Response } from "express";
import { barang } from "../data/models";
import { getAllBarang } from "../controllers/barang";

let mockRequest: Partial<Request>;
let mockResponse: Partial<Response>;

beforeEach(() => {
  jest.clearAllMocks();

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

describe("controller getAllbarang tes limit dan offset", () => {
  test("tanpa query limit", async () => {
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
  });

  test("query limit error", async () => {
    const findAndCountAll = jest.spyOn(barang, "findAndCountAll");
    const expectRes = {
      message: '"limit" must be greater than or equal to 0',
    };

    mockRequest.query = {
      limit: "-1",
      offset: "0",
    };

    await getAllBarang(mockRequest as Request, mockResponse as Response);
    expect(findAndCountAll).toBeCalledTimes(0);
    expect(mockResponse.status).toBeCalledWith(400);
    expect(mockResponse.send).toBeCalledWith(expectRes);
  });
});
