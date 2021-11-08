import router from "next/router";
import useSWR from "swr";
import { fetcher } from ".";

export const useTes = () => {
  const { data, error, mutate } = useSWR("/api/barang", fetcher);

  //if (data) router.push("/register");

  return { data, isLoading: !error && !data, mutate, error };
};
