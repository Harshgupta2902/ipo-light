import { headers } from "next/headers";
import Link from "next/link";


export async function generateMetadata() {
    const headersList = headers();
    const completepathname = headersList.get("x-url");
    const pathname = completepathname?.replace('/ifsc-code/', "");
    const ifsc = pathname?.split('/').pop();

    let data = null;
    try {
        data = await fetchIfscData(ifsc ?? "");
    } catch (err) {
        console.error(`Error fetching IFSC DATA: ${err}`);
    }

    const metaTitle = `${data.IFSC} - ${data.BANK} ${data.BRANCH} BRANCH IFSC CODE`;
    const metaDescription = `Find Bank Details for IFSC:-${data.IFSC} of ${data.BANK} ${data.BRANCH} BRANCH, MICR Code, Branch Code, Address, and Phone Number for NEFT, RTGS, ECS.`;
    const keywords = `${data.IFSC}, ${data.BANK}, ${data.BRANCH}, ${data.MICR}, ${data.ADDRESS}, ${data.CENTRE}`;
    return {
        title: metaTitle,
        description: metaDescription,
        robots: "index, follow",
        author: "IpoTec",
        keywords: keywords,
        copyright: "Copyright 2024 @ IpoTec",
        url: "https://www.ipotec.in/",
        openGraph: {
            title: metaTitle,
            description: metaDescription,
            site: "https://www.ipotec.in/",
            images: "https://www.ipotec.in/og_image.png",
            type: "website",
            url: `https://www.ipotec.in${completepathname}`,
        },
        twitter: {
            card: "summary_large_image",
            title: metaTitle,
            description: metaDescription,
            images: "https://www.ipotec.in/og_image.png",
        },
        alternates: {
            canonical: `https://www.ipotec.in${completepathname}`,
        },
    };
}


const fetchIfscData = async (ifsc: string) => {
    try {
        const response = await fetch(`https://ifsc.razorpay.com/${ifsc}`);
        if (!response.ok) {
            throw new Error("Data not found");
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching GmpIpo", error);
        throw error;
    }
};


const IfscDetails = async () => {
    const headersList = headers();
    const completepathname = headersList.get("x-url");
    const pathname = completepathname?.replace('/ifsc-code/', "");
    const ifsc = pathname?.split('/').pop();

    const segments = completepathname?.split('/').filter(segment => segment);

    let data = null;
    try {
        data = await fetchIfscData(ifsc ?? "");
    } catch (err) {
        console.error(`Error fetching IFSC DATA: ${err}`);
    }
    return (
        <div className="section">

            <div className="container">
                <nav className="flex" aria-label="Breadcrumb">
                    <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                        {segments?.map((segment, index) => {
                            const isLast = index === segments.length - 1;
                            return (
                                <li key={index} className="inline-flex items-center">
                                    {isLast ? (
                                        <span className="text-sm font-medium text-gray-700 md:ms-2">
                                            {segment}
                                        </span>
                                    ) : (
                                        <>

                                            <span className="inline-flex items-center text-sm font-medium text-gray-700">
                                                {segment}
                                            </span>
                                            <svg className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                                            </svg>
                                        </>
                                    )}
                                </li>
                            );
                        })}
                    </ol>
                </nav>
                <br />
                <div className="container relative overflow-x-auto sm:rounded content">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                        <tbody>
                            {Object.entries(data).map(([key, value]) => {
                                return (value === null || value === '' ? null :
                                    <tr key={key}>
                                        <td><strong>{key}</strong></td>
                                        <td>{value?.toString()}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>


    );
};

export default IfscDetails;
