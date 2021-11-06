import { NextRequest, NextResponse } from "next/server";
import ironStore from "iron-store";

export const middleware = async (req: NextRequest) => {
  // const tes = await ironStore({
  //   sealed: req.cookies["next-iron-session/examples/next.js"],
  //   password: "asdjaskldjlkasjdlkasjdlasjdasdasdasdasdasdasdasdasdasdad",
  // });

  // console.log("middleware");

  return NextResponse.next();
};
