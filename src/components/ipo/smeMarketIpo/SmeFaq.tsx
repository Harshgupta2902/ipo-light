import Accordion from "@/components/common/Accordion";

const smeIpoFaq = [
  {
    question: "What is SME IPO?",
    answer: "SME IPO refers to the initial public offering (IPO) undertaken by a small and medium-sized enterprise (SME) to raise funds from the public. The SME gets listed on either the BSE SME or NSE Emerge Platforms."
  },
  {
    question: "Is SME IPO a good investment?",
    answer: "As per the fundamentals of the company, SME IPO might be a good investment. However, records show that only a few SME IPOs are trading above the IPO price. Potential investors are advised to check detailed information on IPOWatch before applying for SME IPOs."
  },
  {
    question: "What is the difference between main-board IPO and SME IPO?",
    answer: "SME IPO stands for small and medium enterprises. The IPO size is much smaller compared to the main-board IPO. While main-board IPOs list on NSE and BSE platforms, SME IPOs list on either BSE SME or NSE Emerge platform."
  },
  {
    question: "Can SMEs go for an IPO?",
    answer: "Yes, SMEs can go for an IPO, but they need to pass eligibility criteria, including having a track record of at least 3 years, positive cash accruals from operations for at least 3 years, and a positive net worth."
  },
  {
    question: "What are the criteria for SME listing?",
    answer: "As per the rules, a company should have a track record of at least 3 years, positive cash accruals from operations for at least 3 years, and a positive net worth to be eligible for SME listing."
  },
  {
    question: "Can we apply for SME IPO?",
    answer: "Yes, investors can apply for SME IPOs based on the categories finalized. SME IPOs offer shares to Non-Institutional Investors (NII) and Retail investors, sometimes also to Qualified Institutional Buyers (QIB). Investors can apply via ASBA or UPI-based applications, submitting forms to their banks or brokers."
  },
  {
    question: "How do I sell an SME IPO on the listing day?",
    answer: "To sell an SME IPO on the listing day, online traders can log in to their trading app or broker website, access their demat or trading account, and sell the allotted SME IPO. For offline trading, investors can call their broker to initiate the sale from their demat account. It’s simple!"
  }
];

export default function SmeFaq() {

  return (
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
          {smeIpoFaq.map((faqItem, index) => (
            <Accordion key={index} title={faqItem.question}>
              {faqItem.answer}
            </Accordion>
          ))}
        </div>
      </div>
    </section>
  );
}
