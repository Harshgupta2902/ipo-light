import Accordion from "@/components/common/Accordion";




const upcomingIpo = [
    {
        question: "What is an IPO? or What is IPO Meaning?",
        answer: "The IPO is an initial public offer where companies come up for their share sale to the public by offering their own privately held shares to the public. The companies should draft DRHP with SEBI for Initial Public Offer (IPO) to change their company identity from Private Limited to Limited. The company should file DRHP (draft red herring prospectus) and final RHP (red herring prospectus) for IPO. SEBI approves the Initial Public Offer for the companies, and then they go for the IPO. After RHP filed by the company decides the price band and the date to invest in the IPO via UPI or ASBA format for investors."
    },
    {
        question: "Which IPO is open today / this week? or Which IPO is coming soon?",
        answer: "The upcoming IPO this week is Medi Assist Healthcare, EPACK Durable, and Nova Agri Tech in January 2024."
    },
    {
        question: "Which are the best Upcoming IPO in 2024 in India?",
        answer: "The upcoming IPO in India in 2024 includes Ebixcash, Indiafirst Life, SPC Life Sciences, Tata Play, Lohia Corp, Nova Agritech, and more. The Upcoming IPO list might include a few more names after the market regulator SEBI’s approval."
    },
    {
        question: "Can I apply for IPO without a Demat account?",
        answer: "No, as per the SEBI rules, an individual needs a Demat Account to apply for an IPO."
    },
    {
        question: "Are IPOs a good investment?",
        answer: "Yes, an IPO is a good investment for the short term and the long term as well. For a company whose financial situation is good and the demand is high, investors should go for those IPOs."
    },
    {
        question: "How can one apply for upcoming IPOs online?",
        answer: "IPO investors can apply for the upcoming IPO via UPI-based online IPO applications or Bank through ASBA."
    },
    {
        question: "Where do I get an application form for an upcoming IPO?",
        answer: "Download blank ASBA IPO application forms from NSE or BSE website. You can get the IPO forms from the brokers as well."
    }
];

export default function upcomingFaq() {

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
