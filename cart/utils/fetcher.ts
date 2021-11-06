import axios, { AxiosRequestConfig } from "axios";

export const fetcher = async (url: string, config?: AxiosRequestConfig) => {
  try {
    const res = await axios({
      url,
      ...config,
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};
