"use client";
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
} from "chart.js";
import { markdownify } from "@/components/common/textConverter";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const lumpMarkdownContent = `
# What Is Lumpsum Investment?

A lump sum investment is one of the best ways to maximize your potential returns and secure your financial future. It is a one-time investment that gives you an opportunity to put your money to work all at once, allowing it to grow and compound over time.

If you are considering a lump sum investment, it is wise to calculate its likely future value. This enables you to make the necessary adjustments to your investment strategies, aligning it more effectively with your financial goals. You can use an online lump sum calculator to estimate the returns on your investment.

## What Is a Lumpsum Return Calculator?

A lumpsum return calculator is a valuable financial tool to assess the prospective returns that a significant amount of investment can give at the end of the tenure or on maturity. It determines the potential worth of your investment based on the initial value, rate of return, and period of investment.

## How Can a Lumpsum Calculator Help You?

A lumpsum calculator is a user-friendly online tool designed to estimate the returns on lump sum investments. You just have to provide the initial investment value, expected rate of returns, and investment period. With this information, the online calculator computes the returns an investment can generate on maturity.

Ultimately, a lumpsum calculator helps you plan your investments in line with your financial goals - saving for a loan down payment, repaying a loan, accumulating funds for travel and more. According to the calculator’s outcome, you would know whether a particular initial investment amount will be enough to generate enough returns to meet your goals. If not, you can consider adjusting your investment or exploring alternative investment options that can offer favorable returns.

### Formula To Calculate Lumpsum Investment Returns

The lumpsum investment returns are calculated using a formula as follows,

>Lumpsum Investment Returns = p (1 + r/n)^nt

Where,

- p = Your lumpsum investment amount
- r = Rate of return rate you are expecting to get
- n = Number of times the returns are compounded in a year
- t = Investment duration (in years)

Let us understand the lumpsum calculator formula better with an example. Assume you have invested ₹50,000 for 5 years, and the expected annual return is 10% compounding annually. So,

- p = ₹50,000
- r = 10%
- n = 1
- t = 5

The potential returns of your investment can be calculated using the above formula: 

>Lumpsum Returns = 50,000 x (1 + 10%) ^ 5 = ₹80,526


This means that your investment would earn total returns of ₹30,526 in 5 years. At the end of 5 years, your investment will grow to ₹80,526.

#### How Does Lumpsum Calculator Work?

To save your time and effort from cumbersome manual calculations, you can use lumpsum calculator, which helps you estimate the potential returns of your lumpsum investments in less than a minute. Ours lumpsum calculator takes three main factors into account:

- Your initial investment
- The expected rate of return
- The duration of the investment

The online calculator takes these factors into account and uses the lumpsum calculator formula to estimate your potential returns.

### How To Use Lumpsum Calculator Online?

The usage of the Lumpsum Calculator Online is simple and straightforward. All you need to do is gather the basic details of your lump sum investment. Once you have the details, follow the steps below to use the calculator:

1. Enter your initial lump sum amount in the calculator
2. Now enter your investment duration, i.e., for how long you are planning to stay invested
3. The final step is to enter the expected rate of return on your investment

That’s it. Lumpsum calculator takes the values entered and determines the total value of your investment in the given period. It gives you a clear breakdown of the investment made and the returns generated as well.


Assume you have received a bonus of ₹2,50,000 from your employer, and you want to invest the lumpsum for 5 years to fund your child’s education. You have decided to park it in a lumpsum investment with a rate of return of 13%. Now, you can use the lumpsum calculator to estimate the returns you may get after 5 years:

- On this lumpsum calculator, enter the investment amount, i.e., ₹2,50,000
- Select the duration of the investment as 5 years
- Enter the rate of return as 13%
- According to the results of the calculator, The total value of your investment after 5 Years will be ₹4,60,609, where the estimated returns will be ₹2,10,609 for an investment of ₹2,50,000. Now you can check if the return amount of ₹4,60,609 will be sufficient to fund your child’s education or if you need to invest more or find an alternative investment with a higher rate of return.


### Lumpsum vs SIP - Which Is Better?

Before determining whether a lump sum investment is better or a Systematic Investment Plan (SIP), let’s understand the difference between a lump sum investment and an SIP. These are two distinct approaches to investing money.

Lump sum investment involves putting a significant sum of money all at once into a particular investment, typically used for long-term goals. It offers the advantage of immediate investment and the potential for higher returns if the market performs well. However, it carries the risk of market timing, as the entire amount is exposed to potential losses if the market experiences a downturn.

On the other hand, SIP is a disciplined investment strategy where a fixed amount is contributed at regular intervals, usually monthly, spreading the investment over time. SIP benefits from rupee-cost averaging and compounding, reducing the impact of short-term market fluctuations. It encourages disciplined investing and is suitable for both short and long-term goals.

Here’s a table for lumpsum vs SIP to understand the differences clearly.

   
| Factor                | Lumpsum Investment                            | SIP                                      |
|-----------------------|-----------------------------------------------|------------------------------------------|
| Investment Approach   | Invest an amount all at once                 | Regular fixed investments at intervals   |
| Investment Frequency  | One-time investment                          | Regular, typically monthly, quarterly or half-yearly |
| Market Timing         | Exposed to market timing risk                | Reduces the impact of market timing      |
| Potential Returns     | Can benefit from market upswings             | Benefits from rupee-cost averaging       |
| Risk Management       | Prone to market volatility                   | Reduces the impact of short-term fluctuations |
| Discipline            | No fixed commitment is required              | Encourages disciplined investing        |
| Goal Horizon          | Long-term investments                        | Short-term and long-term goals           |
| Capital Deployment    | Immediate deployment                         | Gradual deployment over time             |

`;

const LumpsumCalculator = () => {
  const [amount, setAmount] = useState(5000);
  const [duration, setDuration] = useState(5);
  const [rate, setRate] = useState(12);
  const [investedAmount, setInvestedAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [estimatedReturns, setEstimatedReturns] = useState(0);
  const [chartData, setChartData] = useState({
    labels: ["Invested Amount", "Earned Amount"],
    datasets: [
      {
        label: "Amount",
        data: [0, 0],
        backgroundColor: [
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
        ],
      },
    ],
  });

  const handleAmountChange = (e: any) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value >= 0) {
      setAmount(value);
      calculateLumpsum(value, duration, rate);
    }
  };

  const handleDurationChange = (e: any) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1 && value <= 50) {
      setDuration(value);
      calculateLumpsum(amount, value, rate);
    }
  };

  const handleRateChange = (e: any) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value >= 0 && value <= 150) {
      setRate(value);
      calculateLumpsum(amount, duration, value);
    }
  };

  const calculateLumpsum = (amount: number, duration: number, rate: number) => {
    const futureValue = amount * Math.pow(1 + rate / 100, duration);
    let earnedAmount = futureValue - amount;
    earnedAmount = Math.round(earnedAmount);
    const totalAmount = Math.round(futureValue);
    setInvestedAmount(amount);
    setEstimatedReturns(earnedAmount);
    setTotalAmount(totalAmount);
    setChartData({
      labels: ["Invested Amount", "Earned Amount"],
      datasets: [
        {
          label: "Amount",
          data: [amount, earnedAmount],
          backgroundColor: [
            "rgba(75, 192, 192, 0.6)",
            "rgba(153, 102, 255, 0.6)",
          ],
        },
      ],
    });
  };

  useEffect(() => {
    calculateLumpsum(amount, duration, rate);
  }, []);

  return (
    <section className="section">
      <div className="container">
        <div className="content">
          <h1 className="text-center mt-4">Lumpsum Calculator</h1>
          <br />
          <div className="rounded-xl shadow px-4 py-16 xl:p-20">
            <div className="row items-center justify-between px-4">
              <div className="mb-10 md:col-6 lg:col-6 md:order-2 md:mb-0 text-center">
                <span className="text-white">
                  The total value of your investment after{" "}
                  <b>{duration} years</b> will be
                </span>
                <br />
                <span className="text-white mt-4 font-bold text-h3">
                  {" "}
                  ₹ {totalAmount.toLocaleString("en-IN")}
                </span>
                <div>
                  {chartData.labels ? (
                    <Bar
                      data={chartData}
                      height={200}
                      width={800}
                      options={{
                        maintainAspectRatio: false,
                        plugins: {
                          tooltip: {
                            callbacks: {
                              label: function (context) {
                                const label = context.dataset.label || "";
                                const value = context.raw as number;
                                return `${label}: ₹${value.toFixed(2)}`;
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
                              display: false,
                            },
                          },
                          y: {
                            stacked: true,
                            title: {
                              display: true,
                              text: "Amount (₹)",
                            },
                            grid: {
                              display: false, 
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
                    htmlFor="lumpsum_amount"
                    className="form-label"
                    style={{ margin: 0 }}
                  >
                    Enter Lumpsum Amount (₹)
                  </label>
                  <input
                    id="lumpsum_amount"
                    className="form-input w-full rounded-sm"
                    placeholder="Enter Lumpsum Amount"
                    type="number"
                    name="lumpsum_amount"
                    value={amount}
                    onChange={handleAmountChange}
                    style={{ width: "35rem" }}
                  />
                </div>
                <div className="my-4">
                  <label
                    htmlFor="lumpsum_duration"
                    className="form-label"
                    style={{ margin: 0 }}
                  >
                    Enter Duration (in Years)
                  </label>
                  <input
                    id="lumpsum_duration"
                    className="form-input w-full rounded-sm"
                    placeholder="Enter Duration"
                    type="number"
                    name="lumpsum_duration"
                    value={duration}
                    onChange={handleDurationChange}
                    style={{ width: "35rem" }}
                  />
                </div>
                <div className="my-4">
                  <label
                    htmlFor="lumpsum_rate"
                    className="form-label"
                    style={{ margin: 0 }}
                  >
                    Expected Rate of Return (%)
                  </label>
                  <input
                    id="lumpsum_rate"
                    className="form-input w-full rounded-sm"
                    placeholder="Expected Rate of Return"
                    type="number"
                    name="lumpsum_rate"
                    value={rate}
                    onChange={handleRateChange}
                    style={{ width: "35rem" }}
                  />
                </div>
              </div>
            </div>
          </div>
          <br />
          <div
            dangerouslySetInnerHTML={markdownify(lumpMarkdownContent, true)}
          />
        </div>
      </div>
    </section>
  );
};

export default LumpsumCalculator;
