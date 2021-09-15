import React, { useEffect, useState } from "react";
import axios from "axios";

export const emailOrUsername = (str: string): { email?: string; username?: string } => {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(str)) {
    return { email: str };
  }
  return { username: str };
};

export const addBarang = async (payload: { name: string; description?: string; price?: any; image?: string | null }) => {
  payload.price = parseInt(payload.price);
  if (payload.image == "") delete payload.image;
  try {
    const respones = await axios.post("http://localhost:4000/barang/", payload);
    return respones.data;
  } catch (error) {
    console.log(error.respones);
  }
};

export type dataBarangType = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
};

export type dataBarangArrType = dataBarangType[];

type stateBarang = {
  data: dataBarangArrType;
  info: {
    limit: number;
    offset: number;
    total: number;
  } | null;
  loading: boolean;
  err: string | boolean;
};

export const useGetBarang = (): stateBarang => {
  const [reqBarang, setReqBarang] = useState<stateBarang>({
    data: [],
    info: null,
    loading: true,
    err: false,
  });

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get("http://localhost:4000/barang/");
        setReqBarang({
          data: res.data.data,
          info: res.data.info,
          loading: false,
          err: false,
        });
      } catch (error) {
        setReqBarang({
          data: [],
          info: null,
          loading: false,
          err: error?.response?.status,
        });
      }
    })();
  }, []);

  return { ...reqBarang };
};
