import { NextApiRequest, NextApiResponse } from "next";
import { Session, withIronSession } from "next-iron-session";

// optionally add stronger typing for next-specific implementation
export type NextIronRequest = NextApiRequest & { session: Session };
export type NextIronHandler = (req: NextIronRequest, res: NextApiResponse) => void | Promise<void>;

export const withSession = (handler: Function) =>
  withIronSession(handler, {
    password: process.env.SECRET_COOKIE_PASSWORD || "asdjaskldjlkasjdlkasjdlasjdasdasdasdasdasdasdasdasdasdad",
    cookieName: "iron-session",
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    },
    ttl: 60 * 60 * 8,
  });
