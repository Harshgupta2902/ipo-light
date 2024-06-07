"use client";
import { markdownify } from "@/components/common/textConverter";
import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const sipMarkdownContent = `


## What is an SIP Calculator?

The SIP calculator enables a systematic investment plan. Determine returns for various SIP investment strategies using this tool. This will assist you in decision-making that is based on knowledge rather than speculation.

A Mutual Fund SIP calculator helps you estimate the future value of your SIP investments. It takes into account various parameters, including the investment amount, i.e., the regular SIP contributions, the expected rate of return, and the investment tenure. By inputting these details, you can get a sense of how your investments may grow over time. While the final maturity amount of your SIP investment may differ due to various external factors, you can get an approximate understanding of the expected returns.

Once you have a clear idea of the expected returns and commitment required, you can then make a more informed decision about which SIP strategy is most viable for you.

## How does SIP Calculator Work?

Our SIP calculator online takes three main factors into account:

- Amount of the initial investment (P)
- Frequency of the investment (n)
- Expected rate of return (r)

By inputting these values, the calculator determines the final invested amount and the estimated returns at the end of a specific period of time.

## How Can an SIP Return Calculator Help You?

The advantages of using an SIP return calculator are many. Some of them are discussed below:

- **Estimate required time and rate of return** - Using this tool, you can estimate the rate of return required to reach your desired final amount. Additionally, you can also ascertain the time required for your investment to grow adequately.
- **Choose the right SIP** – The SIP calculator can swiftly give you multiple variables with which you can assess an SIP scheme. You can use the calculator to compare multiple schemes as per those variables and choose the SIP that is best for you.

## How to Use Systematic Investment Plan Calculator

The SIP Calculator helps in calculating:

- SIP returns on maturity 
- Monthly investment amount based on the target

Here are the steps to use the SIP calculator to calculate the SIP returns on maturity:

1. Enter the amount you want to invest.
2. Enter the duration for which you want to invest.
3. Enter the expected rate of return.

The calculator will instantly give you:

- The total value of your investment after the duration.
- The total invested amount.
- The estimated returns from the investment.

Here are the steps to use SIP calculator to estimate the monthly investment amount:

1. Enter the expected target amount, i.e., the returns you are expecting.
2. Enter the duration for which you want to invest.
3. Enter the expected rate of return.

The calculator computes the values and gives how much you need to invest monthly to reach your investment target as per the duration and rate of return.

## How Are SIP Investment Returns Calculated?

The SIP returns are calculated by entering the variable numbers mentioned above into the Systematic Investment Plan calculator. 

The SIP calculator formula used is:

>\[A = P \times \left(\frac{{(1 + r)^n - 1}}{r}\right) \times (1 + r)\]

Where:

- **A**: Estimated Returns from the SIP
- **P**: Amount you invest in SIP
- **r**: Rate of Return you are expecting to get
- **n**: Number of total SIPs made


## Advantages of Using SIP Calculator

- **Enables financial planning**: The online SIP calculator can assist you in financial planning. You can get an idea of how much you need to invest regularly to reach your target amount. This will help you in planning your monthly budget. 
- **Compare and assess SIPs**: Our SIP Calculator helps you compare and assess various SIP investment strategies based on the final amount, total invested amount and the expected return.
- **Free to access**: The online Systematic Investment Plan Calculator is completely free to use, no matter how many times you use it. You can use SIP Calculator at any time from anywhere in the world. 
- **Provides instant results**: The investment calculator gives you instantaneous results that are accurate.
- **Easy to use**: The SIP MF Calculator is easy to use. All you need to do is input the basic details of your SIP and get results in less than a minute.

## Systematic Investment Plans (SIPs) in India

SIPs have become a popular method for building wealth in India, especially among the salaried middle class. This is especially true for mutual fund SIPs, as here, retail investors can access the benefits of professional management of their investments at a low cost.

## What is SIP?

An SIP, or Systematic Investment Plan, is a method of investing money into mutual funds or stocks. It allows you to invest a fixed amount at regular intervals over time rather than making a large, one-time investment.

SIPs offer investors an easy, convenient way to invest without having to worry about timing the market. You can just set up an account and benefit from rupee-cost averaging over time. SIPs are also known for their flexibility, as you can start by investing a small amount and eventually increase your contribution as your financial situation improves.

To calculate the potential returns of your investment via this mode, you can use a SIP calculator online.

## Types of SIPs

Read the following types of SIPs to know which one is the best for you:

##### Regular SIPs
This is the standard SIP, where investors pay a fixed amount periodically. They enable regular transfer of funds from the bank to the SIP account. It helps average out the cost of the SIP units purchased.

##### Flexible SIP

In this case, you can change the SIP amount as per your requirement. For instance, when the market is down and the assets are underpriced, you can buy more. Similarly, you can buy less when the assets are overpriced.

You can also alter the instalment amount according to your financial condition. You can lower the SIP amount when you are short of cash and increase it when you have a cash surplus. This is also called Flexi-SIP or Flex-SIP.

##### Step-up SIP

Also known as Top-up SIP, this plan allows you to increase or step up the SIP amount at regular intervals. For example, you can start a monthly SIP with ₹10,000 and arrange to increase it by ₹1,000 every year. This plan is suitable for salaried people who expect annual increments and bonuses.

##### Perpetual SIP

You can stay invested in most SIPs for a predetermined period of time. However, for perpetual SIPs, you have to only mention the start date and not the end date. This means that you are going to keep investing in the SIP until you request the fund house or the Asset Management Company (AMC) to stop the SIP.

##### Trigger SIP

In this type of SIP, you can set a trigger for an SIP. The trigger could be an event, like a sudden market dip or a favourable market condition, a specific index level, a level of NAV (Net Asset Value), etc. Your trigger can result in starting the SIP, redeeming the fund units, or switching to another scheme. This is highly useful for people who invest based on principles and want to automate their investments.

##### Multi SIP

This scheme allows you to invest in multiple funds of a fund house via a single SIP. For example, if you invest ₹30,000 monthly in a multi-SIP, you can split the amount into five schemes, buying units of ₹6,000 each. It makes investing in multiple SIPs a much smoother process and helps add to the diversity of your SIP portfolio.

SIPs can also be categorised as per the kind of instruments that they invest in, e.g. equity funds, debt funds, overnight funds, balanced funds, money market funds, etc.

## Benefits of SIPs

An SIP can help you achieve financial independence at an earlier age, provided you start investing at an early age. This is because:

- The money invested in the SIP compounds over the years, generating a high return eventually.
- Unlike investing in stocks yourself, you do not have to worry about investment strategies. The funds will be allotted by capable professionals who understand financial markets well.
- You can garner high returns without having to make a huge investment in one go. It is perfect for salaried people who get a moderate but regular income.
- It encourages financial discipline as your SIP commitment nudges you to be more attentive toward your spending.
- Investing in certain SIPs like ELSS funds can help you save thousands of rupees in taxes.


## SIP Vs Lumpsum

Whether to go for SIP or lump sum investment depends on your cash flow position. If you receive your income at indefinite intervals, then you should go for a lump sum investment. This is because the lump sum investment would earn a higher return compared to an SIP with the same total investment amount.

## Tax Implications on SIP Investment

Taxation of SIPs in India is based on the following:

- The holding period of the investment. For instance, gains from an equity fund held for more than 12 months are considered long-term capital gains and taxed accordingly. However, gains from equity funds held for less than 12 months are considered short-term capital gains and taxed accordingly.
- Tax-saving mutual funds (ELSS) are eligible for a tax deduction of up to ₹1.5 lakh in a financial year.

## Mistakes to Avoid in Systematic Investment Plan

The following are some of the mistakes that should be avoided in SIP investments:

- **Procrastination** - Delaying the start of SIP can reduce the potential benefits of compounding over time. 
- **Stopping SIP** - You should not stop your SIP midway because SIPs give their highest returns towards the end of their holding period. Therefore, the short-term opportunity cost of leaving your SIP midway is quite high.
- **Ill-informed selection of funds** - Choosing a fund without adequate research may lead you to invest in an SIP that is not in line with your goals. It's essential to research and choose SIPs based on investment goals, risk tolerance, and historical performance.
- **Excessive investing** - Investing beyond one's means can lead to financial strain. Setting a realistic and affordable SIP amount ensures consistency in contributions.

## Invest in Mutual Funds Using SIP Calculator

You can use the SIP calculator to calculate the expected returns from various mutual fund SIP schemes. Once you have adequate data, analyse it to choose the one that works best for you.

`;

const SIPCalculator = () => {
  const [amount, setAmount] = useState(5000);
  const [duration, setDuration] = useState(5);
  const [rate, setRate] = useState(12);
  const [investedAmount, setInvestedAmount] = useState(0);
  const [estimatedReturns, setEstimatedReturns] = useState(0);
  const [chartData, setChartData] = useState<ChartData<"bar">>({
    labels: [],
    datasets: [
      {
        label: "Invested Amount",
        data: [],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
      {
        label: "Earned Amount",
        data: [],
        backgroundColor: "rgba(153, 102, 255, 0.6)",
      },
    ],
  });

  const handleAmountChange = (e: any) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value >= 0) {
      setAmount(value);
      calculateSIP(value, duration, rate);
    }
  };

  const handleDurationChange = (e: any) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1 && value <= 50) {
      setDuration(value);
      calculateSIP(amount, value, rate);
    }
  };

  const handleRateChange = (e: any) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value >= 0 && value <= 150) {
      setRate(value);
      calculateSIP(amount, duration, value);
    }
  };

  const calculateSIP = (amount: number, duration: number, rate: number) => {
    const monthlyRate = rate / 100 / 12;
    const months = duration * 12;
    let futureValue = 0;
    let invested = amount * months;

    for (let i = 0; i < months; i++) {
      futureValue += amount * Math.pow(1 + monthlyRate, months - i);
    }

    futureValue = Math.round(futureValue);

    setInvestedAmount(invested);
    setEstimatedReturns(futureValue);

    const chartLabels = Array.from({ length: duration }, (_, i) =>
      (i + 1).toString(),
    );
    const investedValues = chartLabels.map(
      (year) => amount * parseInt(year) * 12,
    );
    const returnValues = chartLabels.map((year, index) => {
      const yearlyMonths = parseInt(year) * 12;
      let yearlyValue = 0;
      for (let j = 0; j < yearlyMonths; j++) {
        yearlyValue += amount * Math.pow(1 + monthlyRate, months - j);
      }
      return Math.round(yearlyValue) - investedValues[index];
    });

    setChartData({
      labels: chartLabels,
      datasets: [
        {
          label: "Invested Amount",
          data: investedValues,
          backgroundColor: "rgba(75, 192, 192, 0.6)",
        },
        {
          label: "Earned Amount",
          data: returnValues,
          backgroundColor: "rgba(153, 102, 255, 0.6)",
        },
      ],
    });
  };

  useEffect(() => {
    calculateSIP(amount, duration, rate);
  }, []);

  return (
    <section className="section">
      <div className="container">
        <div className="content">
          <h1 className="text-center mt-4">SIP Calculator</h1>
          <br />
          <div className="rounded-xl shadow px-4 py-16 dark:bg-darkmode-theme-light xl:p-20">
            <div className="row items-center justify-between">
              <div className="mb-10 md:col-5 lg:col-5 md:order-2 md:mb-0">
                <div>
                  {chartData.labels ? (
                    <Bar
                      data={chartData}
                      height={200} // Set the desired height here
                      width={800} // Set the desired width here
                      options={{
                        maintainAspectRatio: false, // To ensure the chart fills its container
                        plugins: {
                          tooltip: {
                            callbacks: {
                              label: function (context) {
                                const label = context.dataset.label || "";
                                const value = context.raw as number;
                                return `${label}: ₹${value.toLocaleString("en-IN")}`;
                              },
                            },
                          },
                        },
                        scales: {
                          x: {
                            stacked: true,
                            title: {
                              display: true,
                              text: "Year",
                            },
                            grid: {
                              display: false, // Hide grid lines for the x-axis
                            },
                          },
                          y: {
                            stacked: true,
                            title: {
                              display: true,
                              text: "Amount (₹)",
                            },
                            grid: {
                              display: false, // Hide grid lines for the x-axis
                            },
                          },
                        },

                      }}
                    />
                  ) : (
                    <p>No data to display</p>
                  )}
                </div>

                <p>
                  Invested Amount: ₹{investedAmount.toLocaleString("en-IN")}
                </p>
                <p>
                  Estimated Returns: ₹{estimatedReturns.toLocaleString("en-IN")}
                </p>
              </div>
              <div className="md:col-6 md:order-1">
                <div className="my-4">
                  <label
                    htmlFor="sip_amount"
                    className="form-label"
                    style={{ margin: 0 }}
                  >
                    Enter Amount in (₹)
                  </label>
                  <input
                    id="sip_amount"
                    className="form-input w-full rounded-sm"

                    placeholder="Enter Sip Amount"
                    type="number"
                    name="sip_amount"
                    value={amount}
                    onChange={handleAmountChange}
                    style={{ width: "35rem" }}
                  />
                </div>
                <div className="my-4">
                  <label
                    htmlFor="sip_duration"
                    className="form-label"
                    style={{ margin: 0 }}
                  >
                    Enter Duration(in Years)
                  </label>
                  <input
                    id="sip_duration"
                    className="form-input w-full rounded-sm"
                    placeholder="Enter Duration"
                    type="number"
                    name="sip_duration"
                    value={duration}
                    onChange={handleDurationChange}
                    style={{ width: "35rem" }}
                  />
                </div>
                <div className="my-4">
                  <label
                    htmlFor="sip_rate"
                    className="form-label"
                    style={{ margin: 0 }}
                  >
                    Expected Rate of Return
                  </label>
                  <input
                    id="sip_rate"
                    className="form-input w-full rounded-sm"
                    placeholder="Expected Rate of Return"
                    type="number"
                    name="sip_rate"
                    value={rate}
                    onChange={handleRateChange}
                    style={{ width: "35rem" }}
                  />
                </div>
              </div>
            </div>
          </div>
          <br />
          <div dangerouslySetInnerHTML={markdownify(sipMarkdownContent, true)} />
        </div>
      </div>
    </section>
  );
};

export default SIPCalculator;
