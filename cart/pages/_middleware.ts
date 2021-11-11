import { NextRequest, NextResponse } from "next/server";

export const middleware = async (req: NextRequest) => {
  if (req.nextUrl.pathname.split("/")[1] == "api") return NextResponse.next();
  switch (req.nextUrl.pathname) {
    case "/login":
    case "/forget":
    case "/register":
      if (req.cookies["iron-session"]) return NextResponse.redirect("/");
      return NextResponse.next();
    default:
      if (req.cookies["iron-session"]) return NextResponse.next();
      return NextResponse.redirect("/login");
  }
};
