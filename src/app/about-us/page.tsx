export async function generateMetadata() {
    const metaTitle = "About Us";
    const metaDescription = "About Us";
    const keywords = "About Us, about, about ipotec, ipotec";
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
            url: `https://www.ipotec.in/about-us`,
        },
        twitter: {
            card: "summary_large_image",
            title: metaTitle,
            description: metaDescription,
            images: "https://www.ipotec.in/og_image.png",
        },
        alternates: {
            canonical: `https://www.ipotec.in/about-us`,
        },
    };
}

const AboutUs = () => {
    return (
        <main>
            <section>
                <div className="container">
                    <div className="content lg:col-10 mx-auto">
                        <h1 className="mb-3 text-center">About Us</h1>
                        <br />
                        <p>
                            Welcome to IpoTec, your go-to platform for accessing reliable and
                            timely information on upcoming Initial Public Offerings (IPOs),
                            Grey Market Premiums (GMP), subscription statuses, mutual funds,
                            Asset Management Companies (AMCs), and detailed fund information.
                        </p>
                        <p>
                            At IpoTec, we are dedicated to providing users with a
                            comprehensive and user-friendly platform that caters to their
                            financial research needs. Our aim is to empower investors and
                            individuals with the necessary information to make informed
                            decisions regarding financial investments
                        </p>
                        <p>
                            Our team at IpoTec works diligently to ensure that the information
                            displayed on our platform is accurate, up-to-date, and relevant.
                            While we strive for excellence, we understand the importance of
                            transparency and the value of reliable data in the ever-changing
                            financial landscape
                        </p>
                        <p>
                            We do not provide financial advice or recommendations, but rather
                            serve as a valuable resource for users to conduct their own
                            research and due diligence. By offering a wide range of financial
                            data and insights, we aim to support users in their financial
                            journey and decision-making process.
                        </p>
                        <p>
                            IpoTec values user privacy and data security, ensuring that any
                            information provided by users is handled with utmost
                            confidentiality and in accordance with our Privacy Policy.
                        </p>
                        <p>
                            Thank you for choosing IpoTec as your trusted source for financial
                            information. We are committed to continuously improving our
                            platform to meet your needs and enhance your financial research
                            experience.
                        </p>
                        <p>
                            If you have any questions, feedback, or suggestions, please feel
                            free to contact us. We appreciate your support and look forward to
                            serving you on your financial journey.
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default AboutUs;
