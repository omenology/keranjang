import { useEffect, useState } from "react";

import { dataBarangType, errorType, infoType, loadingType } from ".";
import { useUtils } from "../context/actions/utils";

type stateKeranjang = {
  data: {
    id: string;
    createdAt: Date;
    barang: dataBarangType;
  }[];
  info: infoType;
};

type payloadCheckout = {
  items: string[];
  totalPayment: number;
  reciver: string;
  shippingAddress: string;
};

export const useKeranjang = () => {
  const { state: utils } = useUtils();
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
        const res = await utils.axios.get("/keranjang");
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
      await utils.axios.delete(`/keranjang/${id}`);
    } catch (error) {
      console.log(error.response);
    }
  };

  const checkout = async (payload: payloadCheckout) => {
    try {
      const response = await utils.axios.post(`/checkout/`, payload);
      console.log(response);
    } catch (error) {
      console.log(error.response);
    }
  };

  return { data, loading, error, removeFromKeranjang, checkout };
};
