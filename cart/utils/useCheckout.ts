import useSWR from "swr";
import { fetcher, API_BASE_URL } from ".";

export const useCheckout = (token) => {
  const { data, error, mutate } = useSWR(`${API_BASE_URL}/api/checkout`, (url) =>
    fetcher(url, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
  );

  return { data, isLoading: !error && !data, mutate, error };
};
