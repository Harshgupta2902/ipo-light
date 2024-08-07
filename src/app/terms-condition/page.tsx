export async function generateMetadata() {
    const metaTitle = "Terms of Service";
    const metaDescription = "Terms of Service";
    const keywords = "Terms of Service, Terms and conditions, conditions";
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
            url: `https://www.ipotec.in/terms-condition`,
        },
        twitter: {
            card: "summary_large_image",
            title: metaTitle,
            description: metaDescription,
            images: "https://www.ipotec.in/og_image.png",
        },
        alternates: {
            canonical: `https://www.ipotec.in/terms-condition`,
        },
    };
}

const TermsAndConditions = () => {
    return (
        <main>
            <section >
                <div className="container">
                    <div className="content lg:col-10 mx-auto">
                        <h1 className="mb-3 text-center">Terms &amp; Conditions</h1>
                        <br />
                        <p>
                            Welcome to IpoTec, the leading platform for accessing reliable and
                            up-to-date information on upcoming Initial Public Offerings
                            (IPOs), Grey Market Premiums (GMP), subscription statuses, mutual
                            funds, Asset Management Companies (AMCs), and their fund details.
                            By accessing and using the IpoTec website, you agree to comply
                            with the following Terms and Conditions outlined below
                        </p>

                        <ol>
                            <li className="font-bold">Acceptance of Terms</li>
                            <p>
                                {" "}
                                By using the IpoTec platform, you acknowledge and agree to abide
                                by the Terms and Conditions set forth in this document. These
                                Terms and Conditions apply to all users accessing the IpoTec
                                website and its services.{" "}
                            </p>
                            <li className="font-bold">User Obligations</li>
                            <p>
                                {" "}
                                Upon accessing the IpoTec platform, users agree to use the
                                provided information for personal, non-commercial purposes only.
                                Users are prohibited from reproducing, distributing, or
                                modifying the content on the IpoTec website without prior
                                consent.{" "}
                            </p>
                            <li className="font-bold">Accuracy of Information</li>
                            <p>
                                {" "}
                                IpoTec strives to provide accurate and reliable information on
                                upcoming IPOs, GMPs, mutual funds, AMCs, and fund details. While
                                we make every effort to ensure the correctness of the data
                                presented, we do not guarantee the absolute accuracy or
                                completeness of the information provided.{" "}
                            </p>
                            <li className="font-bold">Disclaimer</li>
                            <p>
                                {" "}
                                IpoTec does not offer financial advice or recommendations. All
                                information provided on the platform is for informational
                                purposes only. Users are advised to conduct their own research
                                and seek professional advice before making any financial
                                decisions based on the information available on the IpoTec
                                website.{" "}
                            </p>
                            <li className="font-bold">Third-Party Links</li>
                            <p>
                                {" "}
                                The IpoTec platform may contain links to third-party websites or
                                resources for additional information. We do not endorse or take
                                responsibility for the content, accuracy, or legality of any
                                external websites linked to from IpoTec.{" "}
                            </p>
                            <li className="font-bold">Privacy</li>
                            <p>
                                {" "}
                                IpoTec respects user privacy and does not collect any personal
                                information from users accessing the platform. We are committed
                                to maintaining the confidentiality and security of any data
                                provided by users in accordance with our Privacy Policy.{" "}
                            </p>
                            <li className="font-bold">Intellectual Property</li>
                            <p>
                                {" "}
                                All content, trademarks, logos, and intellectual property
                                displayed on the IpoTec platform are the property of IpoTec and
                                protected under intellectual property laws. Users are prohibited
                                from using, reproducing, or distributing any content without
                                explicit permission from IpoTec.{" "}
                            </p>
                            <li className="font-bold">Modification of Terms</li>
                            <p>
                                {" "}
                                All content, trademarks, logos, and intellectual property
                                displayed on the IpoTec platform are the property of IpoTec and
                                protected under intellectual property laws. Users are prohibited
                                from using, reproducing, or distributing any content without
                                explicit permission from IpoTec.{" "}
                            </p>
                            <li className="font-bold">Limitation of Liability</li>
                            <p>
                                {" "}
                                IpoTec shall not be held liable for any direct, indirect,
                                incidental, or consequential damages arising from the use of the
                                platform or reliance on the information provided. Users agree to
                                use the IpoTec platform at their own risk.
                            </p>
                        </ol>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default TermsAndConditions;
