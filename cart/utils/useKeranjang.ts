import { useState } from "react";
import axios from "axios";
import useSWR, { SWRResponse } from "swr";
import { fetcher, infoType, dataBarangType, API_BASE_URL } from ".";

type dataKeranjangType = {
  id: string;
  createdAt: Date;
  barang: dataBarangType;
};

type responseKeranjangType = {
  info: infoType;
  data: dataKeranjangType[];
};

type queryType = {
  limit?: number;
  offset?: number;
  search?: string;
};

type bodyTransaction = {
  gross_amount: number;
  shipping_address: string;
  reciver: string;
  item_details: {
    id: string;
    price: number;
    quantity: number;
    name: string;
  }[];
};

export const useKeranjang = (token: string) => {
  const [query, setQuery] = useState<queryType>({ limit: 10, offset: 0 });
  const { data, error, mutate } = useSWR(`${API_BASE_URL}/api/keranjang?${new URLSearchParams(query as any).toString()}`, (url) =>
    fetcher(url, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
  ) as SWRResponse<responseKeranjangType, Error>;

  const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  const removeFromKeranjang = async (id: string) => {
    try {
      const response = await axiosInstance.delete(`/api/keranjang/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const createTransaction = async (payload: bodyTransaction): Promise<{ token: string; redirect_url: string }> => {
    try {
      const response = await axiosInstance.post(`/api/keranjang/transaction`, payload);
      return response.data.data;
    } catch (error) {
      throw error;
    }
  };

  const transactionSuccess = async (payload: object) => {
    try {
      const response = await axiosInstance.post(`/api/checkout`, payload);
      return response.data.data;
    } catch (error) {
      throw error;
    }
  };

  return { data, loading: !error && !data, error, mutate, setQuery, removeFromKeranjang, createTransaction, transactionSuccess };
};
