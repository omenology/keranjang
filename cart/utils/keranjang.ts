import { useEffect, useState } from "react";

import { axios, dataBarangType, errorType, infoType, loadingType } from ".";
import { useAuth } from "../context";

type stateKeranjang = {
  data: {
    id: string;
    createdAt: Date;
    barang: dataBarangType;
  }[];
  info: infoType;
};

export const useGetKeranjang = () => {
  const { state } = useAuth();
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
        const res = await axios.get("/keranjang", {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        });
        setLoading(false);
        setData(res.data);
      } catch (error) {
        setLoading(false);
        if (error.response) setError(`${error.response.status} ${error.response.statusText}`);
        setError("something went wrong");
      }
    })();
  }, []);

  const addToKeranjang = async (id: string) => {
    try {
      const response = await axios.post(`/keranjang/${id}`, null, {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.log(error.response);
    }
  };

  const removeFromKeranjang = async (id: string) => {
    try {
      const response = await axios.delete(`/keranjang/${id}`, {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      });
    } catch (error) {
      console.log(error.response);
    }
  };

  return { data, loading, error, addToKeranjang, removeFromKeranjang };
};
