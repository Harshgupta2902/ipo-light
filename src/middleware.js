import { NextResponse } from "next/server";

export default async function middleware(request) {
  const url = request.nextUrl;
  const pathname = url.pathname;

  if (redirects[pathname]) {
    const url = request.nextUrl.clone();
    url.pathname = redirects[pathname];
    return NextResponse.redirect(url);
  }

  const response = NextResponse.next();
  if (pathname.indexOf(".") === -1) {
    // console.log("pathname:::::::::;;;", pathname);
    response.headers.append("x-url", pathname);
  }

  if (redirects[pathname]) {
    const url = request.nextUrl.clone();
    url.pathname = redirects[pathname];
    return NextResponse.redirect(url);
  }

  return response;
}

const redirects = {
  "/mutualfunds/details/tata-small-cap-fund-M_TASC":
    "/mutualfunds/details/tata-small-cap-fund-direct-growth",
  "/mutualfunds/details/tata-small-cap-fundidcw-payout-M_TASS":
    "/mutualfunds/screener",
  "/mutualfunds/details/nippon-india-gold-savings-fund-M_NIGU":
    "/mutualfunds/screener",
  "/mutualfunds/details/icici-pru-banking--fin-serv-fund-M_ICINK":
    "/mutualfunds/screener",
};

export const config = {
  runtime: "experimental-edge",
};

// import { NextResponse } from "next/server";

// const redirects = {
//   "/mutualfunds/details/tata-small-cap-fund-M_TASC":
//     "/mutualfunds/details/tata-small-cap-fund-direct-growth",
//   "/mutualfunds/details/tata-small-cap-fundidcw-payout-M_TASS":
//     "/mutualfunds/screener",
//   "/mutualfunds/details/nippon-india-gold-savings-fund-M_NIGU":
//     "/mutualfunds/screener",
//   "/mutualfunds/details/icici-pru-banking--fin-serv-fund-M_ICINK":
//     "/mutualfunds/screener",
// };

// export default async function middleware(request) {
//   const url = request.nextUrl;
//   const searchParams = url.searchParams;
//   const pathname = url.pathname;

//   console.log("pathname:::::::::;;;", pathname);
//   if (!pathname.includes(".")) {
//     response.headers.append("x-url", pathname);
//   }

//   if (redirects[pathname]) {
//     const url = request.nextUrl.clone();
//     url.pathname = redirects[pathname];
//     return NextResponse.redirect(url);
//   }

//   const response = NextResponse.next();

//   return response;
// }

// export const config = {
//   runtime: "experimental-edge",
// };
