import { Dispatch, SetStateAction, useState } from "react";
import axios from "axios";
import useSWR, { KeyedMutator } from "swr";
import { fetcher, infoType } from ".";

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
};

type payloadBarang = {
  name: string;
  description?: string;
  price?: any;
  image?: string | null;
};

export const useBarang = (token: string) => {
  const [query, setQuery] = useState({ limit: "10", offset: "0" });
  const { data, error, mutate } = useSWR(`http://localhost:4000/barang?${new URLSearchParams(query).toString()}`, (url) =>
    fetcher(url, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
  );

  const axiosInstance = axios.create({
    baseURL: "http://localhost:4000/",
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  const addBarang = async (payload: payloadBarang) => {
    payload.price = parseInt(payload.price);
    if (payload.image == "") delete payload.image;
    try {
      const respones = await axiosInstance.post("http://localhost:4000/barang/", payload);
      mutate({ ...data, data: data.data.concat(respones.data.data) }, false);
      return respones.data;
    } catch (error) {
      throw error;
    }
  };

  const addToKeranjang = async (id: string) => {
    try {
      const response = await axiosInstance.post(`/keranjang/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  return { data, loading: !error && !data, error, mutate, setQuery, addBarang, addToKeranjang } as {
    data: responseBarangType;
    loading: boolean;
    error: Error;
    mutate: KeyedMutator<any>;
    setQuery: Dispatch<SetStateAction<queryType>>;
    addBarang: (payload: payloadBarang) => Promise<responseBarangType>;
    addToKeranjang: () => Promise<void>;
  };
};
