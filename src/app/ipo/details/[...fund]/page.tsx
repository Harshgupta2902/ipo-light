
import Link from "next/link";
import { endpoints } from "@/api/endpoints";
import "@/style/main.css";
import Loader from "@/app/Loader";
import NotFound from "@/app/not-found";
import { headers } from "next/headers";


export interface Root {
    ulAfterHeadingsResult: UlAfterHeadingsResult[]
    tables: Table[]
    slug: string
    link: string
}

export interface UlAfterHeadingsResult {
    heading: string
    items: string[]
}

export interface Table {
    name: string
    data: string
}



export interface AdditionalIpoData {
    upcomingData: UpcomingData[]
    gmp: Gmp[]
    buyback: Buyback[]
    sme: Sme[]
}

export interface UpcomingData {
    company_name: string
    date: string
    size: string
    price: string
    status: string
    link: string
    slug: string
}

export interface Gmp {
    company_name: string
    link: string
    type: string
    ipo_gmp: string
    price: string
    gain: string
    kostak: string
    subject: string
    slug: string
}

export interface Buyback {
    company_name: string
    date: string
    open: string
    close: string
    price: string
    link: string
    slug: string
}

export interface Sme {
    company_name: string
    date: string
    price: string
    Platform: string
    slug: string
    link?: string
}


const fetchIpoDetails = async (pathname: any) => {
    try {
        const response = await fetch(`${endpoints.ipoDetails}?link=${pathname}`);
        if (!response.ok) {
            throw new Error('Data not found');
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching MF details", error);
        throw error;
    }
}

const fetchAdditionalIpo = async () => {
    try {
        const response = await fetch(endpoints.additionalIpo);
        if (!response.ok) {
            throw new Error('Data not found');
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching MF details", error);
        throw error;
    }
}



const IpoDetails = async () => {
    let ipoDetails = null;
    let additionalData = null;
    let error = null;
    let loading = false;

    const headersList = headers();
    const completePathname = headersList.get("x-url");
    const pathname = completePathname?.replace("/ipo/details/", "")


    try {
        const response = await fetchIpoDetails(pathname);
        if (response.error) {
            error = true;
        } else {
            ipoDetails = response;
            additionalData = await fetchAdditionalIpo();

        }
    } catch (err) {
        console.error(`error ${err}`);

    }

    if (error) return <NotFound />;
    if (loading) return <Loader />;
    return (
        <section className="lg:pt-20">
            <div className="container">
                <main className="mx-auto max-w-8xl sm:px-6 lg:px-8 ">
                    <section aria-labelledby="products-heading " className="mt-[4rem]">
                        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                            <div className="lg:col-span-3">
                                {ipoDetails?.ulAfterHeadingsResult.map((section: any, index: any) => (
                                    <div key={index} className="mb-[2.5rem]">
                                        <h3 className="mb-5">{section.heading}</h3>
                                        <ul className="space-y-1 text-gray-500 list-inside">
                                            {section.items.map((item: any, i: any) => (
                                                <li key={i} className="flex">
                                                    <svg
                                                        className="w-3.5 h-3.5 me-2 mt-[6px] text-green-500"
                                                        aria-hidden="true"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="currentColor"
                                                        viewBox="0 0 20 20"
                                                    >
                                                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                                    </svg>
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                                <div className="row">
                                    {ipoDetails && ipoDetails.tables && [...ipoDetails.tables.slice(1), ipoDetails.tables[0]].map(
                                        (table, index) => (
                                            <div key={index} className="container content text-center">
                                                <>
                                                    <h3 className="mb-4">{table.name}</h3>
                                                    <div className="rounded bg-body px-6 shadow">
                                                        <div className="flex flex-col">
                                                            <div className="-m-1.5 overflow-x-auto">
                                                                <div className="align-middle">
                                                                    <table
                                                                        className="w-full text-sm text-left rtl:text-right text-gray-500 table"
                                                                        dangerouslySetInnerHTML={{
                                                                            __html: table.data,
                                                                        }}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                            <form className="hidden lg:block">
                                {additionalData &&
                                    additionalData.upcomingData &&
                                    additionalData.upcomingData.length > 0 && (
                                        <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 mb-6">
                                            <h5 className="text-xl font-bold leading-none text-gray-900 mb-4">
                                                Latest IPOs
                                            </h5>
                                            <div className="flow-root">
                                                <ul role="list" className="divide-y divide-gray-200">
                                                    {additionalData.upcomingData.map(
                                                        (item: UpcomingData) => (
                                                            <li className="py-3 sm:py-4" key={item.slug}>
                                                                <>
                                                                    <Link
                                                                        className="text-sm font-medium text-gray-900 truncate"
                                                                        href={`/ipo/details/${item.slug}`}
                                                                        target={"_blank"}
                                                                        rel="noopener noreferrer"
                                                                        prefetch={false}
                                                                    >
                                                                        {item.company_name}
                                                                    </Link>
                                                                    <p className="text-sm text-gray-500 truncate">
                                                                        {`${item.date === "TBA"
                                                                            ? "Coming Soon"
                                                                            : `${item.date}`
                                                                            }`}
                                                                    </p>
                                                                </>
                                                            </li>
                                                        )
                                                    )}
                                                </ul>
                                            </div>
                                        </div>
                                    )}
                                {additionalData &&
                                    additionalData.sme &&
                                    additionalData.sme.length > 0 && (
                                        <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 mb-6">
                                            <h5 className="text-xl font-bold leading-none text-gray-900 mb-4">
                                                SME IPOs
                                            </h5>
                                            <div className="flow-root">
                                                <ul role="list" className="divide-y divide-gray-200">
                                                    {additionalData.sme.map((item: Sme) => (
                                                        <li className="py-3 sm:py-4" key={item.slug}>
                                                            <>
                                                                <Link
                                                                    className="text-sm font-medium text-gray-900 truncate"
                                                                    href={`/ipo/details/${item.slug}`}
                                                                    target={"_blank"}
                                                                    rel="noopener noreferrer"
                                                                    prefetch={false}
                                                                >
                                                                    {item.company_name}
                                                                </Link>
                                                                <p className="text-sm text-gray-500 truncate">
                                                                    {`${item.date === "TBA"
                                                                        ? "Coming Soon"
                                                                        : `${item.date}`
                                                                        }`}
                                                                </p>
                                                            </>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    )}

                                {additionalData &&
                                    additionalData.gmp &&
                                    additionalData.gmp.length > 0 && (
                                        <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 mb-6">
                                            <h5 className="text-xl font-bold leading-none text-gray-900 mb-4">
                                                GMP IPOs
                                            </h5>
                                            <div className="flow-root">
                                                <ul role="list" className="divide-y divide-gray-200">
                                                    {additionalData.gmp.map((item: Gmp) => (
                                                        <li className="py-3 sm:py-4" key={item.slug}>
                                                            <>
                                                                <Link
                                                                    className="text-sm font-medium text-gray-900 truncate"
                                                                    href={`/ipo/details/${item.slug}`}
                                                                    target={"_blank"}
                                                                    rel="noopener noreferrer"
                                                                    prefetch={false}
                                                                >
                                                                    {item.company_name}
                                                                </Link>
                                                                <p className="text-sm text-gray-500 truncate">
                                                                    {`Gain:${item.gain}`}
                                                                </p>
                                                                <p className="text-sm text-gray-500 truncate">
                                                                    {`Price:${item.price}`}
                                                                </p>
                                                            </>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    )}

                                {additionalData &&
                                    additionalData.buyback &&
                                    additionalData.buyback.length > 0 && (
                                        <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 mb-6">
                                            <h5 className="text-xl font-bold leading-none text-gray-900 mb-4">
                                                BuyBack IPOs
                                            </h5>
                                            <div className="flow-root">
                                                <ul role="list" className="divide-y divide-gray-200">
                                                    {additionalData.buyback.map(
                                                        (item: Buyback) => (
                                                            <li className="py-3 sm:py-4" key={item.slug}>
                                                                <>
                                                                    <Link
                                                                        className="text-sm font-medium text-gray-900 truncate"
                                                                        href={`/ipo/details/${item.slug}`}
                                                                        target={"_blank"}
                                                                        rel="noopener noreferrer"
                                                                        prefetch={false}
                                                                    >
                                                                        {item.company_name}
                                                                    </Link>
                                                                    <p className="text-sm text-gray-500 truncate">
                                                                        {`${item.open === "TBA"
                                                                            ? "Coming Soon"
                                                                            : `${item.open} - ${item.close}`
                                                                            }`}
                                                                    </p>
                                                                </>
                                                            </li>
                                                        )
                                                    )}
                                                </ul>
                                            </div>
                                        </div>
                                    )}
                            </form>
                        </div>
                    </section>
                </main>
            </div>
        </section>
    );
};
export default IpoDetails;
