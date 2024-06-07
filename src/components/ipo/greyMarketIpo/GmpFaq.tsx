import Accordion from "@/components/common/Accordion";

const upcomingIpo = [
  {
      question: "What is Grey Market Premium?",
      answer: "Grey Market Premium (IPO GMP) refers to the premium or additional price at which IPO shares are traded unofficially before their official listing on a stock exchange. It represents the market’s perception of the potential value and demand for the shares."
  },
  {
      question: "How is Grey Market Premium calculated?",
      answer: "The calculation is based on the company’s performance, its demand in the grey market, and the probability of subscription. It works before the IPO listing and during the days from the IPO start date to the allotment date. The Grey Market Premium indicates how the IPO might react on a listing day with an estimated price."
  },
  {
      question: "Is Grey Market Premium reliable?",
      answer: "There is no reliability guaranteed. While IPO GMP works in most cases, exceptions exist. It depends on factors such as demand, HNI and QIB subscription levels, and overall market conditions."
  },
  {
      question: "What is Kostak Rate?",
      answer: "The Kostak rate is the amount that one investor pays to the seller of an IPO application before the IPO listing. It applies whether the investor gets the IPO allotment or not, and buyers and sellers use Kostak rates to fix their profits in the grey market."
  },
  {
      question: "How is Subject to Sauda related to IPO applications?",
      answer: "Subject to Sauda is the amount decided when investors get the firm allotment on their IPO Application. It means one can get the said amount if one gets the allotment; otherwise, sauda will be canceled. Profits are not fixed and depend on allotment and subsequent performance."
  },
  {
      question: "How do you calculate Grey Market Premium?",
      answer: "The IPO GMP, or Grey Market Premium, is calculated based on the company performance, its demand in the grey market, and the probability of subscription. Its an estimation of how the IPO might perform on the listing day, but the actual listing may vary from the grey market price."
  },
  {
      question: "Are Grey Market Stocks safe?",
      answer: "It depends on the broker or the trading person. Trading in the grey market is not considered safe, and it involves risks due to potential fluctuations. It is suggested to refer to the IPO GMP for listing gain purposes and exercise caution."
  },
  {
      question: "How can one buy or sell IPO applications in the Grey Market?",
      answer: "There are no official entities associated with the grey market. Some brokers facilitate buying and selling of IPO applications on Kostak Rates or Subject to Sauda Rates based on the IPO GMP. One should find local brokers who act as intermediaries between buyers and sellers."
  },
  {
      question: "What is the significance of IPO GMP?",
      answer: "The IPO Grey Market Premium serves as an indicator of market sentiment and the perceived value of the IPO shares. It allows potential investors to gauge the level of demand and the premium they may have to pay if they wish to purchase shares during the IPO. However, it’s essential to note that the GMP doesn’t guarantee future performance and is subject to change."
  }
];

export default function GmpFaq() {
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
          {upcomingIpo.map((faqItem, index) => (
            <Accordion key={index} title={faqItem.question}>
              {faqItem.answer}
            </Accordion>
          ))}
        </div>
      </div>
    </section>
  );
  
}
