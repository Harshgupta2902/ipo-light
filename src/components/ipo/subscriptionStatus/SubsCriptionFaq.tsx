import Accordion from "@/components/common/Accordion";

const subsFaq = [
  {
      question: "What does IPO Subscription Status mean?",
      answer: "IPO Subscription Status indicates the level of investor interest and participation in an Initial Public Offering (IPO). It is measured by the number of times the IPO offering is subscribed by investors."
  },
  {
      question: "How does IPO Subscription Status impact allotment?",
      answer: "Higher subscription status often leads to a lower basis of allotment, triggering a lottery system. For instance, if an IPO is subscribed 5 times, the allotment ratio becomes 5:1, meaning one out of five applicants will be allotted shares."
  },
  {
      question: "How is IPO Subscription Status calculated?",
      answer: "IPO Subscription Status is calculated based on the number of shares offered by the company and the total number of shares applied for by investors. For example, if a company offers 1,00,000 shares and receives subscriptions for 5,00,000 shares, the IPO is said to be subscribed 5 times."
  },
  {
      question: "Who are Qualified Institutional Buyers (QIB) in an IPO?",
      answer: "Qualified Institutional Buyers (QIB) in an IPO include Financial Institutions, Banks, Foreign Institutional Investors (FIIs), and Mutual Funds."
  },
  {
      question: "Who are Non-Institutional Investors (NII) in an IPO?",
      answer: "Non-Institutional Investors (NII) in an IPO include Individual Investors, Non-Resident Indians (NRIs), Companies, Trusts, etc."
  },
  {
      question: "Who are Retail Investors (RII) in an IPO?",
      answer: "Retail Investors (RII) in an IPO include Retail Individual Investors or NRIs."
  },
  {
      question: "What is the meaning of EMP in an IPO?",
      answer: "EMP stands for Employee Bidders in an IPO. They are individuals participating in the IPO who are employees of the issuing company."
  },
  {
      question: "What is the meaning of SHQ in an IPO?",
      answer: "SHQ stands for Share Holders Quota in an IPO. It is a quota reserved for existing shareholders of the company."
  },
  {
      question: "What is the meaning of PHQ in an IPO?",
      answer: "PHQ stands for Policy Holders Quota in an IPO. It is a quota reserved for policyholders, often applicable in insurance company IPOs."
  }
];

export default function SubscriptionFaq() {
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
          {subsFaq.map((faqItem, index) => (
            <Accordion key={index} title={faqItem.question}>
              {faqItem.answer}
            </Accordion>
          ))}
        </div>
      </div>
    </section>
  );
}
