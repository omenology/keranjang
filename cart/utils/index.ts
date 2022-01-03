import axios from "axios";
import { IncomingMessage } from "http";
import { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next";
import { NextApiRequestCookies } from "next/dist/server/api-utils";

export { emailOrUsername, tryJsonParse, cookieOptions };
export { useBarang } from "./useBarang";
export { useKeranjang } from "./useKeranjang";
export { useCheckout } from "./useCheckout";
export { withSession } from "./session";
export { fetcher } from "./fetcher";

export { API_BASE_URL, SECRET_COOKIE_PASSWORD } from "./constant";

export type { infoType, dataCheckoutType,  NextApiResponse, payloadLogin, payloadRegister };
export type { dataBarangType } from "./useBarang";

declare module "iron-session" {
  interface IronSessionData {
    token?: string
  }
}

type infoType = {
  limit: number;
  offset: number;
  total: number;
};
type dataCheckoutType = {
  items: {
    barangId: string;
    quantity: number;
  }[];
  reciver: string;
  shippingAddress: string;
  totalPayment: number;
};
type payloadLogin = { password: string; email?: string; username?: string };
type payloadRegister = { email: string; username: string; password: string };

// interface GetServerSidePropsContextWithSession extends GetServerSidePropsContext {
//   req: IncomingMessage & {
//     cookies: NextApiRequestCookies;
//     session: Session;
//   };
// }

const cookieOptions = {
  cookieName: "iron-session",
  password: "aksldjklsayrlkasda4657a575as7ASDe3££q78&*$^*^&%5878457878787878",
  ttl: 60 * 60 * 8,
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
