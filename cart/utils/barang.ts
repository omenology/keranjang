import { useEffect, useState } from "react";

import { axios, errorType, infoType, loadingType } from ".";

export type dataBarangType = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
};

export type dataBarangArrType = dataBarangType[];
type queryType = object;

export const useGetBarang = () => {
  const [data, setData] = useState<dataBarangArrType>([]);
  const [info, setInfo] = useState<infoType>(null);
  const [loading, setLoading] = useState<loadingType>(false);
  const [error, setError] = useState<errorType>(false);
  const [query, setQuery] = useState({ limit: "10" });
  const [reRender, setRerender] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/barang/?${new URLSearchParams(query).toString()}`);
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
      const respones = await axios.post("http://localhost:4000/barang/", payload);
      return respones.data;
    } catch (error) {
      console.log(error.response);
    }
  };

  return { data, info, loading, error, addBarang, setData, setQuery };
};
