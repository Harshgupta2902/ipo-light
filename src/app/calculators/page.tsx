import React from "react";
import Link from "next/link";

const calcs = [
  {
    route: "sip_calculator",
    title: "SIP",
    description:
      "Calculate how much you need to save or how much you will accumulate with your SIP",
    image_src:
      "//assets-netstorage.groww.in/web-assets/billion_groww_desktop/prod/_next/static/media/sip.81144080.png",
  },
  {
    route: "lumpsum_calculator",
    title: "Lumpsum",
    description:
      "Calculate returns for lumpsum investments to achieve your financial goals",
    image_src:
      "//assets-netstorage.groww.in/web-assets/billion_groww_desktop/prod/_next/static/media/lumpsum.1794f9ea.png",
  },
  {
    route: "",
    title: "SWP",
    description:
      "Calculate your final amount with Systematic Withdrawal Plans (SWP)",
    image_src:
      "//assets-netstorage.groww.in/web-assets/billion_groww_desktop/prod/_next/static/media/swp.e6a90ff4.png",
  },
  {
    route: "",
    title: "MF",
    description: "Calculate the returns on your mutual fund investments",
    image_src:
      "//assets-netstorage.groww.in/web-assets/billion_groww_desktop/prod/_next/static/media/mutualFund.30d93762.png",
  },
  {
    route: "",
    title: "SSY",
    description:
      "Calculate returns for Sukanya Smariddhi Yojana (SSY) as per your investment",
    image_src:
      "//assets-netstorage.groww.in/web-assets/billion_groww_desktop/prod/_next/static/media/ssy.519e79bf.png",
  },
  {
    route: "",
    title: "PPF",
    description: "Calculate your returns on Public Provident Fund (PPF)",
    image_src:
      "//assets-netstorage.groww.in/web-assets/billion_groww_desktop/prod/_next/static/media/ppf.43ef77b0.png",
  },
  {
    route: "",
    title: "EPF",
    description: "Calculate returns for your Employee’s Provident Fund (EPF)",
    image_src:
      "//assets-netstorage.groww.in/web-assets/billion_groww_desktop/prod/_next/static/media/epf.0c7feded.png",
  },
  {
    route: "",
    title: "FD",
    description:
      "Check returns on your fixed deposits (FDs) without any hassle",
    image_src:
      "//assets-netstorage.groww.in/web-assets/billion_groww_desktop/prod/_next/static/media/fixedDeposit.5c66d7e6.png",
  },
  {
    route: "",
    title: "RD",
    description:
      "Check returns on your Recurring Deposit (RD) in just a few clicks",
    image_src:
      "//assets-netstorage.groww.in/web-assets/billion_groww_desktop/prod/_next/static/media/rd.f12e0653.png",
  },
  {
    route: "",
    title: "NPS",
    description: "Calculate returns for your National Pension Scheme (NPS)",
    image_src:
      "//assets-netstorage.groww.in/web-assets/billion_groww_desktop/prod/_next/static/media/nps.1794f9ea.png",
  },
  {
    route: "",
    title: "HRA",
    description: "Calculate your House Rent Allowance (HRA)",
    image_src:
      "//assets-netstorage.groww.in/web-assets/billion_groww_desktop/prod/_next/static/media/hra.a2610ec2.png",
  },
  {
    route: "",
    title: "Retirement",
    description: "Calculate how much you need for a relaxed retirement",
    image_src:
      "//assets-netstorage.groww.in/web-assets/billion_groww_desktop/prod/_next/static/media/retirement.2da4c3fd.png",
  },
  {
    route: "",
    title: "EMI",
    description:
      "Calculate EMI on your loans – home loan, car loan or personal loan",
    image_src:
      "//assets-netstorage.groww.in/web-assets/billion_groww_desktop/prod/_next/static/media/emi.bf7e22de.png",
  },
  {
    route: "",
    title: "Car Loan EMI",
    description: "Calculate your car loan EMI",
    image_src:
      "//assets-netstorage.groww.in/web-assets/billion_groww_desktop/prod/_next/static/media/carLoanEmi.6c269820.png",
  },
  {
    route: "",
    title: "Home Loan EMI",
    description: "Calculate your home loan EMI",
    image_src:
      "//assets-netstorage.groww.in/web-assets/billion_groww_desktop/prod/_next/static/media/homeLoanEmi.217168f1.png",
  },
  {
    route: "",
    title: "Simple Interest",
    description:
      "Calculate simple interest on your loans and saving schemes investments",
    image_src:
      "//assets-netstorage.groww.in/web-assets/billion_groww_desktop/prod/_next/static/media/investment.9f39fe64.png",
  },
  {
    route: "",
    title: "Compound Interest",
    description: "Calculate compound interest with ease",
    image_src:
      "//assets-netstorage.groww.in/web-assets/billion_groww_desktop/prod/_next/static/media/gratuity.0cc18168.png",
  },
  {
    route: "",
    title: "NSC",
    description:
      "Calculate your returns under National Savings Certificate scheme",
    image_src:
      "//assets-netstorage.groww.in/web-assets/billion_groww_desktop/prod/_next/static/media/pension.dd1493d1.png",
  },
  {
    route: "",
    title: "Step Up SIP",
    description: "Calculate SIP Returns with an Yearly Raise",
    image_src:
      "//assets-netstorage.groww.in/web-assets/billion_groww_desktop/prod/_next/static/media/sip.81144080.png",
  },
  {
    route: "",
    title: "Income Tax",
    description: "Calculate your payable income tax with minimal effort",
    image_src:
      "//assets-netstorage.groww.in/web-assets/billion_groww_desktop/prod/_next/static/media/tax.543837fb.png",
  },
  {
    route: "",
    title: "Gratuity",
    description: "Calculate how much gratuity you will get when you retire",
    image_src:
      "//assets-netstorage.groww.in/web-assets/billion_groww_desktop/prod/_next/static/media/swp.e6a90ff4.png",
  },
  {
    route: "",
    title: "APY",
    description: "Calculate your monthly investments under Atal Pension Yojana",
    image_src:
      "//assets-netstorage.groww.in/web-assets/billion_groww_desktop/prod/_next/static/media/fixedDeposit.5c66d7e6.png",
  },
  {
    route: "",
    title: "CAGR",
    description: "The simplest compound annual growth rate calculator",
    image_src:
      "//assets-netstorage.groww.in/web-assets/billion_groww_desktop/prod/_next/static/media/retirement.2da4c3fd.png",
  },
  {
    route: "",
    title: "GST",
    description: "Calculate your payable GST amount with a few clicks",
    image_src:
      "//assets-netstorage.groww.in/web-assets/billion_groww_desktop/prod/_next/static/media/ssy.519e79bf.png",
  },
  {
    route: "",
    title: "Flat vs Reducing rate",
    description:
      "Compare monthly EMI in Flat and Reducing balance interest rate schemes",
    image_src:
      "//assets-netstorage.groww.in/web-assets/billion_groww_desktop/prod/_next/static/media/mutualFund.30d93762.png",
  },
  {
    route: "",
    title: "Brokerage",
    description: "Calculate brokerage and other charges for your stock orders",
    image_src:
      "//assets-netstorage.groww.in/web-assets/billion_groww_desktop/prod/_next/static/media/emi.bf7e22de.png",
  },
  {
    route: "",
    title: "Margin",
    description:
      "Calculate margin for delivery and intraday based on your order details",
    image_src:
      "//assets-netstorage.groww.in/web-assets/billion_groww_desktop/prod/_next/static/media/ppf.43ef77b0.png",
  },
  {
    route: "",
    title: "TDS",
    description: "Calculate your TDS deductions",
    image_src:
      "//assets-netstorage.groww.in/web-assets/billion_groww_desktop/prod/_next/static/media/emi.bf7e22de.png",
  },
  {
    route: "",
    title: "Salary",
    description: "Calculate your net take home salary",
    image_src:
      "//assets-netstorage.groww.in/web-assets/billion_groww_desktop/prod/_next/static/media/nps.1794f9ea.png",
  },
  {
    route: "",
    title: "Inflation",
    description: "Calculate inflation adjusted prices",
    image_src:
      "//assets-netstorage.groww.in/web-assets/billion_groww_desktop/prod/_next/static/media/retirement.2da4c3fd.png",
  },
];


export default function CalCulators() {
    return (
      <>
        <section className="section-sm p-0">
          <div className="container text-center">
            <h1 className="my-6 pb-6">Calculators</h1>
            <div className="row">
              {calcs.map((calc, index) => (
                <div key={index} className="mb-14 md:col-6 lg:col-3">
                  <Link href={`/calculators/${calc.route}`}>
                    <div
                      className="rounded shadow p-8 text-center dark:bg-darkmode-theme-light transition-all duration-700 hover:scale-105"
                      style={{
                        backgroundRepeat: "no-repeat",
                        backgroundImage: `url(${calc.image_src})`,
                        backgroundPosition: "right bottom",
                        height: "240px"

                      }}
                    >
                      <h4 className="mb-3 text-left">{calc.title}</h4>
                      <p className="mb-4 text-left">{calc.description}</p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      </>
    );
  }
  