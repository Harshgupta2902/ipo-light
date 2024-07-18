// "use server"

// import { NextResponse, userAgent } from 'next/server'

// // Define middleware function
// const middleware = async (request: any) => {
//     const url = request.nextUrl;
//     const pathname = url.pathname;
//     const response = NextResponse.next();
    

//     if (pathname.indexOf(".") === -1) {
//         response.headers.append("x-url", pathname);
//     }

//     return response;
// };

// // Export middleware function
// export default middleware;