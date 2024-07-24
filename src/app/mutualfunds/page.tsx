import ImageFallback from "@/components/common/ImageFallback";
import React from "react";
import SimpleSlider from "@/components/home/Slider";
import Accordion from "@/components/common/Accordion";

export default function MutualFundsHomePage() {
    const categories = [
        {
            title: "Equity Mutual Funds",
            description: "High-growth potential with long-term capital gains.",
            imageSrc: "/equity.png",
            link: "/mutualfunds/equity",
            imageAlt: "Equity Mutual Funds"
        },
        {
            title: "Debt Mutual Funds",
            description: "Stable returns with lower risk.",
            imageSrc: "/debt.png",
            link: "/mutualfunds/debt",
            imageAlt: "Debt Mutual Funds"
        },
        {
            title: "Hybrid Mutual Funds",
            description: "Balanced risk and reward with mixed investments.",
            imageSrc: "/hybrid.png",
            link: "/mutualfunds/hybrid",
            imageAlt: "Hybrid Mutual Funds"
        }
    ];

    const mfFaq = [
        {
            question: "Is investing in mutual funds profitable?",
            answer: "Mutual funds are a type of investment where investors pool their money to invest in a diversified portfolio of stocks, bonds, and other securities. They can be profitable if you choose the right fund and stay invested for the long term."
        },
        {
            question: "How to choose a mutual fund that suits your financial objectives?",
            answer: "To choose a mutual fund, first decide on your risk tolerance and investment horizon. Once you determine these, you can select the best mutual fund that aligns with your financial goals. Consider factors such as potential returns, risk levels, and fund categories like high return, tax-saving, and top-performing funds."
        },
        {
            question: "Can I withdraw from a mutual fund anytime?",
            answer: "Yes, you can withdraw your investment anytime if you have invested in open-ended mutual funds. However, certain types like ELSS (Equity Linked Savings Schemes) have lock-in periods."
        },
        {
            question: "How to invest in mutual funds?",
            answer: "You can invest in mutual funds through various platforms. It's typically done online via websites or mobile apps offered by investment platforms."
        },
        {
            question: "How long does it take to start investing in mutual funds?",
            answer: "The account opening process for investing in mutual funds is straightforward and often paperless. With all required details on hand, it can take as little as a few minutes to get started."
        },
        {
            question: "What are the charges or commissions on mutual fund investments?",
            answer: "Many platforms offer commission-free mutual fund investments. It's important to choose a platform that offers competitive or zero commission options to maximize your returns."
        },
        {
            question: "Are mutual funds taxable? What are the tax implications on withdrawals?",
            answer: "Yes, mutual funds are taxable based on the type and duration of investment. For instance, equity-oriented funds held for less than 12 months are subject to short-term capital gains tax. Long-term gains exceeding ₹1 lakh are taxed differently. Debt-oriented funds have different tax implications based on the holding period and the fund's exposure to stocks."
        },
        {
            question: "How do investors earn returns from mutual funds?",
            answer: "Returns from mutual funds come in two forms: dividends and capital gains. Dividends are distributions made by funds from their profits, while capital gains arise from selling investments at a higher price than purchased. Both dividends and capital gains are taxable."
        }
    ];

    return (
        <main>
            <section className="lg:pt-1 sm:pt-1">
                <div className="container">
                    <div className={`row items-center flex-col lg:flex-row`}>
                        <div className="lg:col-8 md:col-8 mb-8 ">
                            <h1 className="mb-4 text-h3 lg:text-h1">
                                Mutual Funds Investment <br /> For All
                            </h1>
                            <p className="mb-8">
                                Explore diversified mutual fund options tailored to your
                                financial goals. Gain insights and make informed investment
                                decisions with our comprehensive platform. Check mutual fund
                                performance and start investing today.
                            </p>
                        </div>
                        <div className={`lg:col-4 lg:order-2 order-1`}>
                            <ImageFallback
                                src={"/mf-home.png"}
                                className="mx-auto"
                                width="800"
                                height="420"
                                alt="Mutual Funds"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </section>
            <div className="section">
                <div className="container">
                    <div className="row items-center justify-between">
                        <SimpleSlider />
                    </div>
                </div>
            </div>
            <section className="lg:pt-1 sm:pt-1">
                <div className="container">
                    <div className="flex justify-between items-center max-sm:items-start">
                        <div className="text-[48px] font-clashSemibold text-[#0A0F1E] max-md:text-2xl">
                            Explore Mutual Funds
                        </div>
                        <a
                            className="flex items-center py-4 px-8 rounded-[10px] btn btn-primary text-white font-inter text-base font-medium hover:bg-primary cursor-pointer max-sm:px-4 max-sm:py-2 max-sm:text-xs max-sm:rounded"
                            href={"/mutualfunds/screener"} >
                            <span className="shrink-0">Explore More</span>
                        </a>
                    </div>
                </div>
            </section>
            <section className="section">
                <div className="container">
                    <div className="row gy-4">
                        {categories.map((category, index) => (
                            <div key={index} className="md:col-6 lg:col-4 xl:col-4 sm:col-12">
                                {/* <a href={category.link} target="" rel="noopener noreferrer"> */}
                                    <div className="rounded-sm relative h-full shadow overflow-hidden">
                                        <ImageFallback
                                            src={category.imageSrc}
                                            className="mx-auto pt-10"
                                            width="90"
                                            height="90"
                                            alt={category.imageAlt}
                                            priority
                                        />
                                        <div className="bg-body h-full rounded-b py-10 px-12">
                                            <h3 className="text-dark mb-3">{category.title}</h3>
                                            <p className="hidden sm:block">{category.description}</p>
                                        </div>
                                    </div>
                                {/* </a> */}
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <section className="section">
                <div className="container">
                    <div className="lg:col-5 mx-auto text-center">
                        <h2>Frequently Asked Questions</h2>
                        <p className="mt-4">
                            Vestibulum ante ipsum primis in faucibus orci luctus ultrices
                            posuere cubilia Curae Donec
                        </p>
                    </div>
                    <div className="row justify-center mt-12">
                        {mfFaq.map((faqItem, index) => (
                            <Accordion key={index} title={faqItem.question}>
                                {faqItem.answer}
                            </Accordion>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}