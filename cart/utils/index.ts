import { IncomingMessage } from "http";
import { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next";
import { Session } from "next-iron-session";
import { NextApiRequestCookies } from "next/dist/server/api-utils";

export { emailOrUsername, tryJsonParse };
export { useBarang } from "./useBarang";
export { useKeranjang } from "./useKeranjang";
export { useLocalForage } from "./useLocalForage";
export { withSession } from "./session";
export { fetcher } from "./fetcher";

export type { infoType, errorType, loadingType, dataCheckoutType, GetServerSidePropsContextWithSession, RequestWithSession, NextApiResponse };
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

interface GetServerSidePropsContextWithSession extends GetServerSidePropsContext {
  req: IncomingMessage & {
    cookies: NextApiRequestCookies;
    session: Session;
  };
}

interface RequestWithSession extends NextApiRequest {
  session: Session;
}

const emailOrUsername = (str: string): { email?: string; username?: string } => {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(str)) {
    return { email: str };
  }
  return { username: str };
};

const tryJsonParse = (jsonStringify: string): dataCheckoutType | boolean => {
  try {
    return JSON.parse(jsonStringify);
  } catch (error) {}
  return false;
};
