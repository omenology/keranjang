import Axios from "axios";

export { emailOrUsername, axios, tryJsonParse };
export { useBarang } from "./useBarang";
export { useKeranjang } from "./useKeranjang";
export { useLocalForage } from "./useLocalForage";
export { useSocket } from "./useSocket";

export type { infoType, errorType, loadingType, dataCheckoutType };
export type { dataBarangType, dataBarangArrType } from "./useBarang";

type infoType = {
  limit: number;
  offset: number;
  total: number;
};
type errorType = string | boolean;
type loadingType = boolean;
type dataCheckoutType = {
  items: {
    barangId: string;
    quantity: number;
  }[];
  reciver: string;
  shippingAddress: string;
  totalPayment: number;
};

const emailOrUsername = (str: string): { email?: string; username?: string } => {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(str)) {
    return { email: str };
  }
  return { username: str };
};

const axios = Axios.create({ baseURL: "http://localhost:4000" });

const tryJsonParse = (jsonStringify: string): dataCheckoutType | boolean => {
  try {
    return JSON.parse(jsonStringify);
  } catch (error) {}
  return false;
};
