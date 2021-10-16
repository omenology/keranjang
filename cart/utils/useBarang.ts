import { useEffect, useState } from "react";
import { errorType, infoType, loadingType } from ".";
import { useUtils } from "../context/actions/utils";

export type dataBarangType = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
};

export type dataBarangArrType = dataBarangType[];

export const useBarang = () => {
  const { state: utils } = useUtils();
  const [data, setData] = useState<dataBarangArrType>([]);
  const [info, setInfo] = useState<infoType>(null);
  const [loading, setLoading] = useState<loadingType>(false);
  const [error, setError] = useState<errorType>(false);
  const [query, setQuery] = useState({ limit: "10" });

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await utils.axios.get(`/barang/`, {
          params: query,
        });

        setData(res.data.data);
        setInfo(res.data.info);
        setLoading(false);
        if (error) setError(false);
      } catch (error) {
        setLoading(false);
        if (data.length != 0) setData([]);
        if (!info) setInfo(null);
        if (error.response) setError(`${error.response.status} ${error.response.statusText}`);
        setError("something went wrong");
      }
    })();
  }, [query]);

  const addBarang = async (payload: { name: string; description?: string; price?: any; image?: string | null }) => {
    payload.price = parseInt(payload.price);
    if (payload.image == "") delete payload.image;
    try {
      const respones = await utils.axios.post("http://localhost:4000/barang/", payload);
      return respones.data;
    } catch (error) {
      console.log(error.response);
    }
  };

  const addToKeranjang = async (id: string) => {
    try {
      const response = await utils.axios.post(`/keranjang/${id}`);
      return response.data;
    } catch (error) {
      console.log(error.response);
    }
  };

  return { data, info, loading, error, addBarang, addToKeranjang, setData, setQuery };
};
