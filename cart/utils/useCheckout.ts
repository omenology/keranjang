import useSWR from "swr";
import { fetcher } from ".";

export const useCheckout = () => {
  const { data, error, mutate } = useSWR("http://localhost:3000/api/checkout", fetcher);

  return { data, isLoading: !error && !data, mutate, error };
};
