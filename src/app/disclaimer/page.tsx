import Link from "next/link";

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
                        <p>
                            Please read and understand this information carefully. Access to
                            this website is confirmation that you understand and agree to be
                            bound by all of these terms and conditions
                        </p>
                        <h2 className="text-2xl">Usage and Access</h2>
                        <p>
                            In IpoTec, displays information relating to upcoming Initial
                            Public Offerings (IPOs), Grey Market Premiums (GMP), subscription
                            statuses, mutual funds, Asset Management Companies (AMCs), and
                            detailed fund information. The site also provides links to other
                            related sites for user convenience. Access should be restricted to
                            users not prohibited from online transactions in IPOs or mutual
                            funds.
                        </p>
                        <h2 className="text-2xl">Acceptance of Terms Information</h2>
                        <p>
                            Before accessing any service offered by IpoTec, the user must
                            accept the specific terms and conditions of such service
                            separately. The user agrees to comply with all applicable laws and
                            statutory requirements in India. This agreement is governed by the
                            laws of the Republic of India, and the user consents to the
                            exclusive jurisdiction of the courts in Mumbai for any disputes
                            arising from site usage.
                        </p>
                        <h2 className="text-2xl">Content and Intellectual Property</h2>
                        <p>
                            IpoTec maintains the website for personal information and use.
                            Users may download materials for non-commercial, personal use
                            only. Distribution, modification, transmission, reuse, or use of
                            site content for public or commercial purposes, including text,
                            images, audio, and video, without written permission from IpoTec,
                            is prohibited. Users must not delete or modify any copyright or
                            intellectual property rights displayed on the site.
                        </p>
                        <h2 className="text-2xl">Disclaimer and Limitation of Liability</h2>
                        <p>
                            Reports, data, videos, and information on the site are for
                            informational purposes only. Some content may be provided by third
                            parties, and IpoTec makes no representations about the accuracy of
                            such content. Users are advised to read the terms and conditions
                            of linked websites. The site may be periodically updated without
                            notice, but IpoTec does not guarantee the site reflects the latest
                            updates at all times.
                        </p>
                        <p>
                            IpoTec is not liable for any loss or damage resulting from the
                            alteration or manipulation of data or information accessed from
                            the site or the transmission of computer viruses or other harmful
                            code. The company disclaims all liability for the accuracy and
                            reliability of the data and uninterrupted or error-free service
                            provision
                        </p>
                        <h2 className="text-2xl">User Responsibilities</h2>
                        <p>
                            Users must ensure their use of the website and services complies
                            with applicable laws in their jurisdictions. Unauthorized access
                            to password-protected areas is prohibited. Personal information
                            transmission via the site is at the user's own risk, and by using
                            the site, the user consents to the transmission of such
                            information to third parties.
                        </p>
                        <h2 className="text-2xl">Modifications</h2>
                        <p>
                            IpoTec may discontinue or amend the terms and conditions of the
                            services offered on the site at any time. Users are responsible
                            for reviewing the terms periodically
                        </p>
                        <h2 className="text-2xl">General Disclaimer</h2>
                        <p>
                            The information provided on the site is for illustration purposes
                            and should not be construed as financial advice or a
                            recommendation. IpoTec does not guarantee the accuracy or
                            reliability of the information and users should seek professional
                            advice before making investment decisions. Past performance is not
                            indicative of future results
                        </p>
                        <h2 className="text-2xl">Contact Us</h2>
                        <p>
                            If you have any questions or feedback, please <Link href={"/contact"}>contact us</Link>. We
                            appreciate your support and look forward to serving you on your
                            financial journey
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default AboutUs;
