import Accordion from "@/components/common/Accordion";

const buyBackFaq = [
  {
      question: "What is a share buyback?",
      answer: "A share buyback is a corporate action where a company repurchases its own listed shares, reducing the number of shares available in the stock market. Companies undertake buybacks to decrease the supply of shares in the market and potentially increase the value of remaining shares for shareholders."
  },
  {
      question: "Why do companies go for share buyback?",
      answer: "Companies may go for share buybacks to enhance the value of remaining shares by reducing the supply in the market. If a company believes its shares are undervalued, a buyback can provide good returns to current investors. Additionally, it allows the company to control its stake in the open market and boost the proportion of earnings."
  },
  {
      question: "How does a share buyback work?",
      answer: "In a share buyback, the company offers to repurchase its own shares. The buyback reduces the number of shares in the market, and if the company stays bullish on its operations, it can help boost the proportion of earnings. The company files a letter of offer with SEBI, specifying the ratio of shares, the number of shares, buyback amount, buyback type, record date, and open and close dates. The buyback process occurs in the open market according to the schedule."
  },
  {
      question: "Why do companies offer a premium in buyback?",
      answer: "Companies may offer a premium in buybacks to incentivize investors to participate. For example, if a company offers a buyback at Rs.1000 against the current market price of Rs.600, investors receive a Rs.400 premium per share in addition to the holding price. This can attract more investors to participate in the buyback offer."
  },
  {
      question: "What is a buyback record date?",
      answer: "The buyback record date is the date specified in the buyback offer on which shareholders must own the companys stock in their demat account to be eligible to participate in the buyback. Only those with the stock in their demat account on the record date can take part in the buyback offer."
  }
];

export default function BuyBackFaq() {

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
          {buyBackFaq.map((faqItem, index) => (
            <Accordion key={index} title={faqItem.question}>
              {faqItem.answer}
            </Accordion>
          ))}
        </div>
      </div>
    </section>
  );
}
