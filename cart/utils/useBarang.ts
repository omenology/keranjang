import { useEffect, useState } from "react";
import { useAuth } from "../context";
import { axios, errorType, infoType, loadingType } from ".";

export type dataBarangType = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
};

export type dataBarangArrType = dataBarangType[];

export const useBarang = () => {
  const { state } = useAuth();
  const [data, setData] = useState<dataBarangArrType>([]);
  const [info, setInfo] = useState<infoType>(null);
  const [loading, setLoading] = useState<loadingType>(false);
  const [error, setError] = useState<errorType>(false);
  const [query, setQuery] = useState({ limit: "10" });

  useEffect(() => {
    (async () => {
      try {
        if (state.token) {
          setLoading(true);
          const res = await axios.get(`/barang/?${new URLSearchParams(query).toString()}`, {
            headers: {
              Authorization: `Bearer ${state.token}`,
            },
          });

          setData(res.data.data);
          setInfo(res.data.info);
          setLoading(false);
          if (error) setError(false);
        }
      } catch (error) {
        setLoading(false);
        if (data.length != 0) setData([]);
        if (!info) setInfo(null);
        if (error.response) setError(`${error.response.status} ${error.response.statusText}`);
        setError("something went wrong");
      }
    })();
  }, [query, state.token]);

  const addBarang = async (payload: { name: string; description?: string; price?: any; image?: string | null }) => {
    payload.price = parseInt(payload.price);
    if (payload.image == "") delete payload.image;
    try {
      const respones = await axios.post("http://localhost:4000/barang/", payload, {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      });
      return respones.data;
    } catch (error) {
      console.log(error.response);
    }
  };

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

  return { data, info, loading, error, addBarang, addToKeranjang, setData, setQuery };
};
