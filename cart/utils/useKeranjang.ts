import { useEffect, useState } from "react";

import { dataBarangType, errorType, infoType, loadingType } from ".";
import { useUtils } from "../context";

type stateKeranjang = {
  data: {
    id: string;
    createdAt: Date;
    barang: dataBarangType;
  }[];
  info: infoType;
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

export const useKeranjang = () => {
  const { axios } = useUtils();
  const [data, setData] = useState<stateKeranjang>({
    data: [],
    info: {
      limit: 10,
      offset: 0,
      total: 0,
    },
  });
  const [loading, setLoading] = useState<loadingType>(false);
  const [error, setError] = useState<errorType>(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await axios.get("/keranjang");
        setLoading(false);
        setData(res.data);
      } catch (error) {
        setLoading(false);
        if (error.response) setError(`${error.response.status} ${error.response.statusText}`);
        setError("something went wrong");
      }
    })();
  }, []);

  const removeFromKeranjang = async (id: string) => {
    try {
      await axios.delete(`/keranjang/${id}`);
    } catch (error) {
      console.log(error.response);
    }
  };

  const createTransaction = async (payload: bodyTransaction) => {
    try {
      const response = await axios.post(`/keranjang/transaction`, payload);
      return response.data.data;
    } catch (error) {
      console.log(error.response);
    }
  };

  const transactionSuccess = async (payload) => {
    try {
      const response = await axios.post(`/checkout`, payload);
      return response.data.data;
    } catch (error) {
      console.log(error.response);
    }
  };

  return { data, loading, error, removeFromKeranjang, createTransaction, transactionSuccess };
};
