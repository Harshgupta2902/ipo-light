import { NextResponse } from "next/server";

export default async function middleware(request) {
  const url = request.nextUrl;
  const searchParams = url.searchParams;
  const pathname = url.pathname;
  const response = NextResponse.next();
  // console.log(`url.href::::::::::::::::::::::::${url}`);
  // console.log(`url.searchParams::::::::::::::::::::::::${searchParams}`);
  if (pathname.indexOf(".") === -1) {
    response.headers.append("x-url", pathname);
  }
  if (searchParams.has("page")) {
    const page = searchParams.get("page");
    response.headers.append("mf-search", page);
  }
  return response;
}

export const config = {
  runtime: "experimental-edge",
};
