export async function generateMetadata() {
    const metaTitle = "Contact Us";
    const metaDescription = "Contact Us";
    const keywords = "Contact Us, Contact, Contact ipotec, ipotec";
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
            url: `https://www.ipotec.in/contact`,
        },
        twitter: {
            card: "summary_large_image",
            title: metaTitle,
            description: metaDescription,
            images: "https://www.ipotec.in/og_image.png",
        },
        alternates: {
            canonical: `https://www.ipotec.in/contact`,
        },
    };
}

const ContactUs = () => {
    return (
        <section className="section">
            <div className="container">
                <h1 className="mb-3 text-center">Contact Us</h1>
                <div className="section row pb-0">
                    <div className="content col-12 md:col-6 lg:col-5">
                        <h2 className="text-[18px]">Why you should contact us</h2 >
                        <p>
                            Reach out to us for any inquiries, feedback, or support to enhance your experience with IpoTec. Our dedicated team is here to assist you with any questions and provide timely responses. Your input helps us improve our services and better meet your financial research needs.
                        </p>
                        <ul>
                            <li>
                                <strong>Phone: +91 8764485661</strong>
                            </li>
                            <li>
                                <strong>
                                    E-mail:{" "}
                                    <a href="mailto:ipotech24@gmail.com">ipotech24@gmail.com</a>
                                </strong>
                            </li>
                        </ul>
                    </div>
                    <div className="col-12 md:col-6 lg:col-7">
                        <form className="contact-form" method="POST" action={""}>
                            <div className="mb-3">
                                <input
                                    className="form-input w-full rounded-sm"
                                    name="name"
                                    type="text"
                                    placeholder="Name"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    className="form-input w-full rounded-sm"
                                    name="email"
                                    type="email"
                                    placeholder="Your email"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    className="form-input w-full rounded-sm"
                                    name="subject"
                                    type="text"
                                    placeholder="Subject"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <textarea
                                    className="form-textarea w-full rounded-sm"
                                    placeholder="Your message"
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">
                                Send Now
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </section>
    );

};

export default ContactUs;
