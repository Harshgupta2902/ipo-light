"use client";
import { usePathname } from "next/navigation";

const MutualFundsDetails: React.FC = () => {
    const pathname = usePathname();
    const slug = pathname.replaceAll("/mutual-funds/", "");

    return (
        <section className="lg:pt-20">
            <div className="container">
                <div className="flex justify-between border-b border-gray-200 items-center max-sm:items-start">
                    <div className="text-[48px] lg:pl-6 font-clashSemibold text-[#0A0F1E] max-md:text-2xl">
                        {slug}
                    </div>

                    <button
                        type="button"
                        className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 mb-2"
                    >
                        <svg
                            className="w-6 h-5 me-2 -ms-1 text-gray-500"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                        </svg>
                        <p>{"Coming Soon"}</p>
                    </button>
                </div>

                <main className="mx-auto max-w-8xl sm:px-6 lg:px-8 ">
                    <section aria-labelledby="products-heading " className="mt-[4rem]">
                        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-3">
                            <form className="hidden lg:block">
                                <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 mb-6">
                                    <h5 className="text-xl font-bold leading-none text-gray-900 mb-4">
                                        BuyBack IPOs
                                    </h5>
                                    <div className="flow-root">
                                        <ul role="list" className="divide-y divide-gray-200">
                                            <li className="py-3 sm:py-4" key={"item.slug"}>
                                                <>
                                                    {"item.company_name"}
                                                    <p className="text-sm text-gray-500 truncate">
                                                        {`Coming Soon`}
                                                    </p>
                                                </>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 mb-6">
                                    <h5 className="text-xl font-bold leading-none text-gray-900 mb-4">
                                        BuyBack IPOs
                                    </h5>
                                    <div
                                        data-section-tag="investment_checklist"
                                        className="jsx-7171238 sidebar desktop--only "
                                    >
                                        <div className="jsx-7171238 full-width sidebar-spacing d-flex justify-space-between">
                                            <h3 className="jsx-7171238 security-name ">
                                                HDFC Balanced Advantage Fund
                                            </h3>
                                            <a
                                                title="Add to Watchlist"
                                                className="jsx-7171238 ml8 watchlist-icons relative font-medium pointer"
                                            >
                                                <i className="jsx-7171238 icon-add-to-watchlist text-22"></i>
                                            </a>
                                        </div>
                                        <div className="jsx-7171238 full-width d-flex align-center sidebar-spacing">
                                            <span className="jsx-7171238 ticker text-teritiary font-medium text-uppercase">
                                                Growth
                                            </span>
                                        </div>
                                        <div className="jsx-7171238 sidebar-spacing">
                                            <div className="jsx-3525483845 quote-box-root with-children">
                                                <span className="jsx-3525483845 typography-h3 text-primary text-24">
                                                    530.00
                                                </span>
                                                <span className="jsx-3525483845 change absolute-value text-14 font-medium up">
                                                    <i className="jsx-3525483845 icon-Green-up"></i>0.09 %
                                                </span>
                                                <span className="jsx-3525483845 change percentage-value text-14 up">
                                                    &nbsp;( +0.50)
                                                </span>
                                            </div>
                                        </div>


                                        <section className="jsx-312207207 sidebar-spacing investement-checklist">
                                            <div
                                                data-section-tag="investmentChecklist"
                                                className="jsx-2440958116 inv-chk-root"
                                            >
                                                <span className="jsx-2440958116 inv-chk-heading typography-h5">
                                                    Investment Checklist
                                                </span>
                                                <div className="jsx-3484823222 jsx-494493574 jsx-482152645 commentary-item-root d-flex-row align-start justify-start ">
                                                    <i className="icon-mood icon-positive-comment text-24 mr12"></i>
                                                    <div className="jsx-3484823222 jsx-494493574 jsx-482152645 content relative tooltip-holder">
                                                        <h4 className="jsx-3484823222 jsx-494493574 jsx-482152645 typography-body-medium-m text-primary d-inline-block no-select  pointer ">
                                                            Returns
                                                        </h4>
                                                        <div className="jsx-358067648 tooltip-root    sh-tooltip font-regular">
                                                            Fund's average annual rolling returns over the
                                                            last three years is compared against the funds
                                                            from the same category
                                                        </div>
                                                        <p className="jsx-3484823222 jsx-494493574 jsx-482152645 lh-138 text-13 text-secondary typography-body-regular-m commentary-desc">
                                                            Fund has been able to generate better returns
                                                            compared to other funds in the same category
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="jsx-396152471 jsx-4017850180 jsx-482152645 commentary-item-root d-flex-row align-start justify-start ">
                                                    <i className="jsx-396152471 jsx-4017850180 jsx-482152645 icon-mood icon-positive-comment text-24 mr12"></i>
                                                    <div className="jsx-396152471 jsx-4017850180 jsx-482152645 content relative tooltip-holder">
                                                        <h4 className="jsx-396152471 jsx-4017850180 jsx-482152645 typography-body-medium-m text-primary d-inline-block no-select  pointer ">
                                                            Expense Ratio
                                                        </h4>
                                                        <div className="jsx-358067648 tooltip-root    sh-tooltip font-regular">
                                                            Expense Ratio is the fee paid by investors of
                                                            Mutual Funds. Fund's expense ratio is compared
                                                            against the expense ratio of other funds in the
                                                            same category to check if the fund is charging
                                                            more or less compared to other funds in the same
                                                            category
                                                        </div>
                                                        <p className="jsx-396152471 jsx-4017850180 jsx-482152645 lh-138 text-13 text-secondary typography-body-regular-m commentary-desc">
                                                            Less expense ratio implies better returns over the
                                                            long term
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="jsx-3771084612 jsx-4017850180 jsx-482152645 commentary-item-root d-flex-row align-start justify-start ">
                                                    <i className="jsx-3771084612 jsx-4017850180 jsx-482152645 icon-mood icon-positive-comment text-24 mr12"></i>
                                                    <div className="jsx-3771084612 jsx-4017850180 jsx-482152645 content relative tooltip-holder">
                                                        <h4 className="jsx-3771084612 jsx-4017850180 jsx-482152645 typography-body-medium-m text-primary d-inline-block no-select  pointer ">
                                                            Return vs FD Rates
                                                        </h4>
                                                        <div className="jsx-358067648 tooltip-root    sh-tooltip font-regular">
                                                            If fund's return is lower than the average fixed
                                                            deposit rates offered by banks, investors are
                                                            better off investing the amount in a FD
                                                        </div>
                                                        <p className="jsx-3771084612 jsx-4017850180 jsx-482152645 lh-138 text-13 text-secondary typography-body-regular-m commentary-desc">
                                                            Fund has been able to generate better price return
                                                            than bank FD
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="jsx-2680762716 jsx-4017850180 jsx-482152645 commentary-item-root d-flex-row align-start justify-start ">
                                                    <i className="jsx-2680762716 jsx-4017850180 jsx-482152645 icon-mood icon-positive-comment text-24 mr12"></i>
                                                    <div className="jsx-2680762716 jsx-4017850180 jsx-482152645 content relative tooltip-holder">
                                                        <h4 className="jsx-2680762716 jsx-4017850180 jsx-482152645 typography-body-medium-m text-primary d-inline-block no-select  pointer ">
                                                            Red Flags
                                                        </h4>
                                                        <div className="jsx-358067648 tooltip-root    sh-tooltip font-regular">
                                                            We check for various red flags on fund's portfolio
                                                            holdings like - ratings for debt securities,
                                                            pledging of promoter shares in the company,
                                                            default probabiity of the company, stocks presense
                                                            in negative lists published by the exchanges etc.
                                                            Checkout the Holdings section in the Portfolio tab
                                                            for full list of securties with red flags
                                                        </div>
                                                        <p className="jsx-2680762716 jsx-4017850180 jsx-482152645 lh-138 text-13 text-secondary typography-body-regular-m commentary-desc">
                                                            Total holdings with red flags is insignificant
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </section>
                                    </div>
                                </div>
                            </form>
                            <div className="lg:col-span-3">Data</div>
                        </div>
                    </section>
                </main>
            </div>
        </section>
    );
};
export default MutualFundsDetails;
