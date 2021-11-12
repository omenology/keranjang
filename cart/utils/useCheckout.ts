import useSWR from "swr";
import { fetcher } from ".";

export const useCheckout = (token) => {
  const { data, error, mutate } = useSWR("http://localhost:4000/checkout", (url) =>
    fetcher(url, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
  );

  return { data, isLoading: !error && !data, mutate, error };
};
