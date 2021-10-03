import Axios from "axios";
import localforage from "localforage";

export { emailOrUsername, axios };
export { useBarang } from "./useBarang";
export { useKeranjang } from "./useKeranjang";
export { useLocalForage } from "./useLocalForage";

export type { infoType, errorType, loadingType };
export type { dataBarangType, dataBarangArrType } from "./useBarang";

const emailOrUsername = (str: string): { email?: string; username?: string } => {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(str)) {
    return { email: str };
  }
  return { username: str };
};

const axios = Axios.create({ baseURL: "http://localhost:4000" });

type infoType = {
  limit: number;
  offset: number;
  total: number;
};
type errorType = string | boolean;
type loadingType = boolean;
