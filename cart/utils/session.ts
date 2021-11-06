import { NextApiRequest, NextApiResponse } from "next";
import { Session, withIronSession } from "next-iron-session";

// optionally add stronger typing for next-specific implementation
export type NextIronRequest = NextApiRequest & { session: Session };
export type NextIronHandler = (req: NextIronRequest, res: NextApiResponse) => void | Promise<void>;

export const withSession = (handler: any) =>
  withIronSession(handler, {
    password: process.env.SECRET_COOKIE_PASSWORD || "asdjaskldjlkasjdlkasjdlasjdasdasdasdasdasdasdasdasdasdad",
    cookieName: "next-iron-session/examples/next.js",
    cookieOptions: {
      // the next line allows to use the session in non-https environments like
      // Next.js dev mode (http://localhost:3000)
      // secure: process.env.NODE_ENV === "production",
    },
    ttl: 60 * 60 * 8,
  });
