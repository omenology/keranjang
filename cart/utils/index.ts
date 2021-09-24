import Axios from "axios";

export { emailOrUsername, axios };
export { useGetBarang } from "./barang";
export { useGetKeranjang } from "./keranjang";

export type { infoType, errorType, loadingType };
export type { dataBarangType, dataBarangArrType } from "./barang";

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
