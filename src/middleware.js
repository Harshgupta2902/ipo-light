import { NextResponse } from "next/server";

export default async function middleware(request) {
  const url = request.nextUrl;
  const pathname = url.pathname;
  const response = NextResponse.next();
  if (pathname.indexOf(".") === -1) {
    response.headers.append("x-url", pathname);
  }
  return response;
  next();
}

export const config = {
  runtime: "experimental-edge",
};
