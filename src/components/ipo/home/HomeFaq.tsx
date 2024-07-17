import Accordion from "@/components/common/Accordion";

const faq = [
  {
    question: "What is an IPO?",
    answer:
      "IPO or the Initial Public Offering is the first time a company issues its shares to the public. As an investor, you will now be able to subscribe for such shares, which was earlier open to only a specific lot of internal and institutional investors via opening a Demat account.",
  },
  {
    question: "How to invest in an IPO?",
    answer:
      "Anyone who holds a Demat or trading account can make a subscription for the desired IPO directly online from the app or through the stockbroker with whom they have an account. An individual can subscribe under the category of retail investor or HNI category.",
  },
  {
    question: "What is the benefit of an IPO?",
    answer:
      "IPO is a golden opportunity for investors to hold shares of highly profitable firms and otherwise expensive stocks. They will be able to secure listing gains (buying less and selling high). It also assists in wealth accumulation and fulfilling long-term objectives, which can be tracked via the stock screener.",
  },
  {
    question: "What are the disadvantages of an IPO?",
    answer:
      "The volatility with the price might cause loss if not handled properly. Furthermore, certain IPOs might not be relevant for the long term, and failure to detect the same might be problematic. Hence, investors are advised to back their decision with relevant research and proper company analysis.",
  },
  {
    question:
      "What is the difference between book building issue and fixed price issue?",
    answer:
      "Fixed Price Issue: Here the price is fixed before the offer, and the investors will have to make a payment at the time of subscription itself. In case of any refund, the same will be made during the allotment. Demand is also declared only after the closing of the IPO. \nBook Building Issue: Price is not fixed, and the payment will have to be made after allotment. Demand is announced daily.",
  },
  {
    question: "Is it mandatory to have a PAN number to apply in an IPO?",
    answer:
      "Yes, Since the enactment of the 2006 SEBI act, PAN has been made mandatory for anyone looking to apply for an IPO. Failure to attach a PAN number will automatically make your application ineligible.",
  },
  {
    question: "Where do I get an IPO application form?",
    answer:
      "One can get the IPO application form from their respective stock broker’s office, banks, or any other financial institution for free. The list of institutions and banks providing the same is provided in the prospectus.",
  },
  {
    question: "How one can apply in IPO's online?",
    answer:
      "Step 1: Log in to your trading and Demat account. \nStep 2: Select the company on which you want to bid. \nStep 3: Key in details such as price, etc., and make the payment.",
  },
  {
    question: "How one can apply in IPO's offline?",
    answer:
      "Step 1: Obtain the IPO form from the nearest bank or simply download the form from the NSE /BSE. \nStep 2: Fill in the details and submit it with the cheque of the required amount. \nStep 3: Acknowledgement and ASBA will have to be provided wherever needed.",
  },
  {
    question: "Can a minor apply in an IPO?",
    answer:
      "Yes, the minor can apply for the IPO using the PAN of their guardians or their own PAN (if they have an independent income).",
  },
  {
    question: "What is the procedure to withdraw from an IPO?",
    answer:
      "You can simply go to the order book and select withdraw. In case such an option is unavailable, contact your respective stock brokers. For withdrawal to be made before allotment when the subscription is closed, you will be required to contact the registrar via a letter asking for the cancellation of the subscription.",
  },
  {
    question: "How is IPO return calculated?",
    answer:
      "The return one might get totally relies on the demand, listing gains, and growth potential of the stock. Check out the Ticker stock screener for more details.",
  },
  {
    question:
      "Can one apply for an IPO from a sweep in/out saving bank account?",
    answer:
      "Yes, one can do so provided the amount bid for is available in the account.",
  },
  {
    question:
      "What is the minimum & maximum investment one could do in the HNI category?",
    answer:
      "The only threshold is that for application under the HNI category, the overall amount should exceed 2 lakh. However, there is no maximum limit as such.",
  },
  {
    question: "How to apply more than one application in an IPO?",
    answer:
      "One can apply only through one application in the IPO. However, you can apply multiple times through your family members’ Demat account as well.",
  },
];

export default function HomeFaq() {
  return (
    <section className="section">
      <div className="container">
        <div className="lg:col-5 mx-auto text-center">
          <h3>Frequently Asked Questions</h3>
          <p className="mt-4">
            Vestibulum ante ipsum primis in faucibus orci luctus ultrices
            posuere cubilia Curae Donec
          </p>
        </div>
        <div className="row justify-center mt-12">
          {faq.map((faqItem, index) => (
            <Accordion key={index} title={faqItem.question}>
              {faqItem.answer}
            </Accordion>
          ))}
        </div>
      </div>
    </section>
  );
}
