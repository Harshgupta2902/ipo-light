"use serve";

import { NextResponse, userAgent } from "next/server";

export default middleware = async (request) => {
  const url = request.nextUrl;
  const pathname = url.pathname;
  const response = NextResponse.next();
  if (pathname.indexOf(".") === -1) {
    response.headers.append("x-url", pathname);
  }
  return response;
};
