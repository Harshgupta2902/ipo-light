
import { markdownify } from "@/components/common/textConverter";
import Image from "next/image";
import Link from "next/link";

const AMCHomePage = () => {
    return (
        <section>
            <div className="container">
                <h1 className="text-center text-3xl">Asset Management Company (AMC)</h1>
                <br />
                <div className="row">
                    {amc.map((amc, index) => (
                        <div key={index} className="mb-14 md:col-6 lg:col-3">
                            <Link href={`${amc.link.replaceAll(" ", "-").toLowerCase()}`}>
                                <div className="flex flex-col border items-center rounded-sm hover:shadow px-8 py-4 text-center">
                                    <Image
                                        src={amc.image}
                                        alt={amc.link}
                                        className="w-16 h-16 mb-3 object-contain"
                                        width="40"
                                        height="40"
                                    />
                                    <span className="text-sm text-gray-900">{amc.link}</span>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
                <br />
                <div className="content" dangerouslySetInnerHTML={markdownify(amcMarkdownContent, true)} />
            </div>
        </section>
    );
};

export default AMCHomePage;





const amcMarkdownContent = `
## What is an Asset Management Company?

An Asset Management Company (AMC) is a firm that invests the funds pooled from individual investors in securities with the objective of optimal return for investors in exchange for a fee. AMC maintains the diversity of portfolio by investing in high-risk and low-risk securities such as stock, debt, real- estate, shares, bonds, pension funds, etc.

Factors such as industry risk, market risk, return risk, and political risk are considered before selecting any security to meet the return on investment targets. For example, a debt fund invests in bonds and risk-free Government bonds to maintain the minimum risk. Conversely, an equity-oriented fund will invest in shares and stocks with high risk and returns.

## How are the funds managed by an AMC?

Basically, when you invest with an AMC, you invest in a portfolio that AMC maintains for you. It is the responsibility of AMC to ensure an investor’s financial objective is met.AMC ensures this by the following means:

**1. Market Research and Analysis**

To build a portfolio for an investor the asset manager needs to do a lot of research on the market trends, macro-economic and micro-economic factors, political aspects. On the basis of this research, the appropriate securities are selected which will outperform the return expectations of the investors.

**2. Asset Allocation**

On the basis of market research and investor's financial objective, the asset manager allocates the funds to different assets. For example, a debt-oriented would invest just 20% in equity-oriented funds to keep the risk levels low. However, an equity-oriented fund would invest more than 70% in equity and rest in debt. A balanced fund would end up with just 60% in equity and 40% in debt to balance out return and risk.

**3. Creating a Portfolio**

After research and analysis by analyst and decision of asset allocation are done, the asset manager on the basis of market findings creates a portfolio. Here the asset manager will take decisions like which security to sell, buy or hold for a period. The entire creation of portfolio is solely based on the market expertise of professionals, research and study and investment goals of the investor.

**4. Review of Performance**

Since the fund of an investor is at stake, the performance measurement of the portfolio becomes very important. At every point, the asset manager has to justify a buy, sell or hold securities to investors and trustees. Every asset manager generally provide regular updates investor regarding sales, repurchases, NAV, Return on risk, portfolio changes and factors which might affect their portfolio.

## How do Asset Management Company functions?

An AMC collects funds from different investors having different financial objectives. Now it invests such a large pool of funds in a very diversified portfolio and enjoys economies of scale, getting discounts on purchases. The return earned by the portfolio is then distributed among all the small retail investors.

See how an  **Asset Management Company works**:

AMC collects funds from different investors having different financial objectives. Now it invests such a large pool of funds in a very diversified portfolio and enjoys economies of scale, getting discounts on purchases. The return earned by the portfolio is then distributed among all the small retail investors.

### **Points to consider before choosing an AMC:**

Every AMC follows the investment objective of the schemes before investing and you must check on the track record and performance history of the investment schemes in the past during the ups and downs of the market.

It is very important to know your AMC well before you invest your hard-earned money.

While selecting a fund house ensure that the below parameters met.

**The reputation of an AMC**- Reputation is built by consistency in performance over a few years like 5-10 years. The investor must go through the performance through annual reports of schemes and AMC.

**Fund Manager's credibility**- AMC work in parallel to its fund manager. The performance of the fund manager is now the performance of AMC. Hence, an investor must look for past performance of the fund manager with respect to managing the assets and funds.

**Price and Value**- Before selecting any fund, an investor must consider looking at the price of the fund and the value creation and return that the fund offer.

**Fees and commission**- Few AMCs charges a fixed fee for their services while others charge a commission on the return earned on the fund.

### **Bodies Governing AMC's Operations**

AMC performs under the supervision of the board of trustees. All the Asset Management Companies are governed by SEBI and AMFI.

Securities and Exchange Board of India (SEBI) is the Indian Capital Market Regulator which governs and controls every AMC in India.

The Association of Mutual Funds in India (AMFI) is a statutory body formed by mutual fund companies. AMFI was formed with the vision of a transparent and ethic driven financial industry. Every AMC must comply with the regulations led by AMFI.

Banks being sponsors are governed by RBI as well along with SEBI and AMFI.

Lastly, all the regulatory bodies SEBI, AMFI, and RBI are governed by RBI.

### **Guidelines laid by SEBI, AMFI, and RBI for an AMC**

Some of the mandatory practices and guidelines laid down by SEBI, AMFI, and RBI for a mutual fund company to follow:

a. The Chairman of an AMC cannot hold the position of Trustee of any mutual fund.

b. Key personnel of every AMC should not have indulged or convicted for any fraudulent or offensive acts.

c. AMC should not act as a Trustee of a mutual fund.

d. The net worth of an AMC must be not less than Rs. 10 crores.

e. Before making an investment in any of its schemes the company must disclose its intention to invest in the offer documents.

f. A quarterly report on activities and compliance of regulations must be submitted to the trustees.

### **Reliability of AMC compared to Banks**

We often have the notion that mutual fund companies are not as reliable as Banks and the schemes offered by AMC is not as secure as a Fixed Deposit Interest. The fact is every mutual fund company or AMC is governed by RBI and Ministry of Finance just like any Bank. Hence, it is safe to invest with a  **mutual fund company or AMC.**

An AMC is appointed by the sponsor and trustee to manage the pool of funds. AMC acts under the supervision of trustees who are governed by SEBI and AMFI. This ensures transparency, accountability, and objectivity. Hence one must go ahead and invest to optimize their wealth and save their taxes.
`;



const amc = [
    {
        link: "Bajaj Finserv Mutual Fund",
        image: "/AMC/bajaj_groww.png",
    },
    {
        link: "Helios Mutual Fund",
        image: "/AMC/helios_groww.png",
    },
    {
        link: "WhiteOak Capital Mutual Fund",
        image: "/AMC/whiteoak_groww.png",
    },
    {
        link: "ITI Mutual Fund",
        image: "/AMC/iti_groww.png",
    },
    {
        link: "TRUST Mutual Fund",
        image: "/AMC/trust_groww.png",
    },
    {
        link: "NJ Mutual Fund",
        image: "/AMC/nj_groww.png",
    },
    {
        link: "Samco Mutual Fund",
        image: "/AMC/samco_groww.png",
    },
    {
        link: "Mahindra Manulife Mutual Fund",
        image: "/AMC/mahindra_groww.png",
    },
    {
        link: "Canara Robeco Mutual Fund",
        image: "/AMC/canara_groww.png",
    },
    {
        link: "Quant Mutual Fund",
        image: "/AMC/quant_groww.png",
    },
    {
        link: "ICICI Prudential Mutual Fund",
        image: "/AMC/icici_groww.png",
    },
    {
        link: "JM Financial Mutual Fund",
        image: "/AMC/jm_groww.png",
    },
    {
        link: "LIC Mutual Fund",
        image: "/AMC/lic_groww.png",
    },
    {
        link: "Franklin Templeton Mutual Fund",
        image: "/AMC/franklin_groww.png",
    },
    {
        link: "Aditya Birla Sun Life Mutual Fund",
        image: "/AMC/aditya_groww.png",
    },
    {
        link: "Mirae Asset Mutual Fund",
        image: "/AMC/mirae_groww.png",
    },
    {
        link: "Bank of India Mutual Fund",
        image: "/AMC/bank_groww.png",
    },
    {
        link: "Motilal Oswal Mutual Fund",
        image: "/AMC/motilal_groww.png",
    },
    {
        link: "PGIM India Mutual Fund",
        image: "/AMC/pgim_groww.png",
    },
    {
        link: "360 ONE Mutual Fund",
        image: "/AMC/360_groww.png",
    },
    {
        link: "Nippon India Mutual Fund",
        image: "/AMC/nippon_groww.png",
    },
    {
        link: "Union Mutual Fund",
        image: "/AMC/union_groww.png",
    },
    {
        link: "Bandhan Mutual Fund",
        image: "/AMC/bandhan_groww.png",
    },
    {
        link: "Navi Mutual Fund",
        image: "/AMC/navi_groww.png",
    },
    {
        link: "SBI Mutual Fund",
        image: "/AMC/sbi_groww.png",
    },
    {
        link: "DSP Mutual Fund",
        image: "/AMC/dsp_groww.png",
    },
    {
        link: "Tata Mutual Fund",
        image: "/AMC/tata_groww.png",
    },
    {
        link: "Edelweiss Mutual Fund",
        image: "/AMC/edelweiss_groww.png",
    },
    {
        link: "Invesco Mutual Fund",
        image: "/AMC/invesco_groww.png",
    },
    {
        link: "Sundaram Mutual Fund",
        image: "/AMC/sundaram_groww.png",
    },
    {
        link: "HDFC Mutual Fund",
        image: "/AMC/hdfc_groww.png",
    },
    {
        link: "HSBC Mutual Fund",
        image: "/AMC/hsbc_groww.png",
    },
    {
        link: "PPFAS Mutual Fund",
        image: "/AMC/ppfas_groww.png",
    },
    {
        link: "Baroda BNP Paribas Mutual Fund",
        image: "/AMC/barodabnpparibasmutualfund_groww.png",
    },
    {
        link: "Quantum Mutual Fund",
        image: "/AMC/quantum_groww.png",
    },
    {
        link: "Taurus Mutual Fund",
        image: "/AMC/taurus_groww.png",
    },
    {
        link: "Shriram Mutual Fund",
        image: "/AMC/shriram_groww.png",
    },
    {
        link: "Groww Mutual Fund",
        image: "/AMC/360_groww.png",
    },
    {
        link: "Kotak Mahindra Mutual Fund",
        image: "/AMC/kotak_groww.png",
    },
    {
        link: "Zerodha Mutual Fund",
        image: "/AMC/zerodha_groww.png",
    },
    {
        link: "Axis Mutual Fund",
        image: "/AMC/axis_groww.png",
    },
    {
        link: "UTI Mutual Fund",
        image: "/AMC/uti_groww.png",
    },
];
