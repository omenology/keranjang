import { useState } from "react";
import axios from "axios";
import useSWR, { SWRResponse } from "swr";
import { fetcher, infoType, API_BASE_URL } from ".";

export type dataBarangType = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
};

type responseBarangType = {
  info: infoType;
  data: dataBarangType[];
};

type queryType = {
  limit?: number;
  offset?: number;
  search?: string;
  order?: object;
};

type payloadBarang = {
  name: string;
  description?: string;
  price?: any;
  image?: string | null;
};

export const useBarang = (token: string) => {
  const [query, setQuery] = useState<queryType>({ limit: 9, offset: 0 });
  const cleanQuery = { ...query, ...query?.order };
  delete cleanQuery.order;
  const { data, error, mutate } = useSWR(`${API_BASE_URL}/api/barang?${new URLSearchParams(cleanQuery as any).toString()}`, (url) =>
    fetcher(url, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
  ) as SWRResponse<responseBarangType, Error>;

  const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  const addBarang = async (payload: payloadBarang): Promise<responseBarangType> => {
    payload.price = parseInt(payload.price);
    if (payload.image == "") delete payload.image;
    try {
      const respones = await axiosInstance.post("/api/barang/", payload);
      mutate({ ...data, data: data.data.concat(respones.data.data) }, false);
      return respones.data;
    } catch (error) {
      throw error;
    }
  };

  const removeBarang =async (barangId:string) => {
    try {
      await axiosInstance.delete(`/api/barang/${barangId}`);
      mutate()
    } catch (error) {
      console.log(error)
    }
  }

  const addToKeranjang = async (id: string) => {
    try {
      const response = await axiosInstance.post(`/api/keranjang/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  return { data, loading: !error && !data, error, mutate, query, setQuery, addBarang, removeBarang, addToKeranjang };
};
