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

type payloadCheckout = {
  items: string[];
  totalPayment: number;
  reciver: string;
  shippingAddress: string;
};

export const useKeranjang = () => {
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
        if (state.token) {
          setLoading(true);
          const res = await axios.get("/keranjang", {
            headers: {
              Authorization: `Bearer ${state.token}`,
            },
          });
          setLoading(false);
          setData(res.data);
        }
      } catch (error) {
        setLoading(false);
        if (error.response) setError(`${error.response.status} ${error.response.statusText}`);
        setError("something went wrong");
      }
    })();
  }, [state.token]);

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

  const checkout = async (payload: payloadCheckout) => {
    try {
      const response = await axios.post(`/checkout/`, payload, {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      });
      console.log(response);
    } catch (error) {
      console.log(error.response);
    }
  };

  return { data, loading, error, removeFromKeranjang, checkout };
};
