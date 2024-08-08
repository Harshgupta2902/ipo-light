export async function generateMetadata() {
    const metaTitle = "Privacy & Policy";
    const metaDescription = "Privacy & Policy";
    const keywords = "Privacy & Policy, Policy, Privacy";


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
            url: `https://www.ipotec.in/privacy-policy`,
        },
        twitter: {
            card: "summary_large_image",
            title: metaTitle,
            description: metaDescription,
            images: "https://www.ipotec.in/og_image.png"
        },
        alternates: {
            canonical: `https://www.ipotec.in/privacy-policy`,
        },
    };
}


const PrivacyPolicy = () => {
    return (
        <main>
            <section>
                <div className="container">
                    <div className="content lg:col-10 mx-auto">
                        <h1 className="mb-3 text-center">Privacy &amp; Policy</h1>
                        <br />
                        <h2>Responsibility of Contributors</h2>
                        <p>
                            At IpoTec, our contributors are committed to providing accurate and timely information about upcoming IPOs, including the latest GMP (Grey Market Premium) of IPOs, subscription status, mutual funds, AMC (Asset Management Company), and their fund details. We strive to ensure that the information provided is reliable and beneficial to all users without requiring any personal information.
                        </p>

                        <h2>Gathering of Personal Information
                        </h2>
                        <p>
                            IpoTec does not collect any personal information from users. Our platform is designed to be accessible and free for all users without the need for providing personal information such as email addresses or telephone numbers. We respect the privacy of our users and do not engage in the collection of any personal data
                        </p>
                        <h2>Protection of Personal Information</h2>
                        <p>
                            As IpoTec does not gather any personal information from users, there is no need for protection of personal data. We uphold the principle of privacy and anonymity for all users accessing our platform for information on upcoming IPOs, GMP, subscription status, mutual funds, AMC, and fund details.
                        </p>
                        <h2>Privacy Policy Changes</h2>
                        <p>
                            IpoTec remains committed to providing free and accessible financial information to all users without the collection of personal information. Any updates or changes to our privacy policy will be communicated transparently to ensure our commitment to user privacy and data protection.
                        </p>

                    </div>
                </div>
            </section>
        </main>
    );
};

export default PrivacyPolicy;
