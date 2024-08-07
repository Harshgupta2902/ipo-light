export async function generateMetadata() {
    const metaTitle = "Disclaimer";
    const metaDescription = "Disclaimer";
    const keywords = "Disclaimer, disclaimer ipotec, ipotec";
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
            url: `https://www.ipotec.in/disclaimer`,
        },
        twitter: {
            card: "summary_large_image",
            title: metaTitle,
            description: metaDescription,
            images: "https://www.ipotec.in/og_image.png",
        },
        alternates: {
            canonical: `https://www.ipotec.in/disclaimer`,
        },
    };
}

const AboutUs = () => {
    return (
        <main>
            <section>
                <div className="container">
                    <div className="content lg:col-10 mx-auto">
                        <h1 className="mb-3 text-center">Disclaimer</h1>
                        <br />
                        <p>Mutual fund investments are subject to market risks. Please read all scheme-related documents carefully</p>
                        <p>
                            The up to 1% higher returns is based on the average difference between expense ratios of Regular and Direct plans for Equity Category Schemes only. The difference in expense ratios and respective returns will vary for other Scheme Categories
                        </p>
                        <p>
                            The up to ₹25 lakh more is indicative and is based on a projected value of investment through a monthly SIP of ₹7,200 for 25 years, assuming an annualized return of 14% from the Direct Plan of an Equity Mutual Fund Scheme versus 13% from the same Scheme's Regular Plan. This projection highlights the potential return difference due to expense ratios. Projected future returns are illustrative and may or may not materialize
                        </p>
                        <p>
                            Instant redemption is available only for the Scheme used as an underlying Scheme for SmartDeposit. The facility operates per the terms of the Asset Management Company managing the Scheme. Past performance of the Scheme may not sustain in the future
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default AboutUs;
