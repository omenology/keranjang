import useSWR from "swr";
import { fetcher } from ".";

export const useTes = () => {
  const { data, error, mutate } = useSWR("/api/barang", fetcher);

  return { data, isLoading: !error && !data, mutate, error };
};
