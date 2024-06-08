"use client";
import { useState, useEffect } from "react";
import { markdownify } from "@/components/common/textConverter";



// const lumpMarkdownContent = `
// # What Is SWP

// SWP stands for systematic withdrawal plan. Under SWP, if you invest lump sum in a mutual fund, you can set an amount you’ll withdraw regularly and the frequency at which you’ll withdraw.

// For example, let’s say you invested in HDFC Top 200 Fund an amount of ₹1 lakh for a year. Let’s assume that you decided to withdraw an amount of ₹10000 per month. So every month, your investment in the fund will reduce by ₹10000. The amount left every month after withdrawal will continue to remain invested.

// Use the above SWP calculator to know how much you can withdraw from your lumpsum investments


// ### How can a SWP calculator assist you?

// As per the Systematic Withdrawal Plan, an individual needs to invest a particular amount and withdraw a certain amount of the corpus invested each month. After withdrawal, the amount will be deducted from the investment while it continues to accumulate interest.

// It is difficult to accurately calculate the monthly withdrawals and total matured sum. Groww can help you with this complex calculations with the its SWP calculator. This Systematic Withdrawal Plan calculator easily computes your matured sum as per your monthly withdrawals precisely. Calculators are simplifying the way people invest in mutual funds.



// ### Example of Systematic Withdrawal Plan

// As mentioned before, the SWP allows investors to generate both monthly revenue as well as an accumulated sum at the end of the maturity period. Refer to this investment and withdrawal schedule for an in-depth idea.

// Here, an individual has invested Rs. 50,000 for tenure of 1 year along with a systematic withdrawal of Rs. 1,000 per month. Interest rate stands at 10%.

// As such, total return of investments after the end of the tenor stands at Rs. 4,565.

// | Month | Balance at Begin | Withdrawal | Interest Earned |
// |-------|------------------|------------|-----------------|
// | 1     | Rs. 50,000       | Rs. 1,000  | Rs. 408         |
// | 2     | Rs. 49,408       | Rs. 1,000  | Rs. 403         |
// | 3     | Rs. 48,812       | Rs. 1,000  | Rs. 398         |
// | 4     | Rs. 48,210       | Rs. 1,000  | Rs. 393         |
// | 5     | Rs. 47,604       | Rs. 1,000  | Rs. 388         |
// | 6     | Rs. 46,992       | Rs. 1,000  | Rs. 383         |
// | 7     | Rs. 46,375       | Rs. 1,000  | Rs. 378         |
// | 8     | Rs. 45,753       | Rs. 1,000  | Rs. 373         |
// | 9     | Rs. 45,126       | Rs. 1,000  | Rs. 368         |
// | 10    | Rs. 44,494       | Rs. 1,000  | Rs. 362         |
// | 11    | Rs. 43,856       | Rs. 1,000  | Rs. 357         |
// | 12    | Rs. 43,214       | Rs. 1,000  | Rs. 352         |


// ### How to use SWP calculator?
// The calculator is user-friendly and easy to use first time out. However, you need to ensure that all values are properly put in.

// - You will find three columns namely tenure, expected return and amount invested. Fill in the values as per your investment plan.
// - Enter values and calculate to find a similar SWP returns chart as mentioned above.

// ### How can a SWP calculator benefit you?
// Retirees and senior citizens are among the most common investors in this scheme. Such individuals obviously require a fixed monthly financial input. An SWP can provide the same over and above the pension or even as an alternativ. They can easily use Groww’s simple and intuitive systematic withdrawal plan calculator for numerous benefits.

// - A Systematic Withdrawal Plan ensures monthly returns while generating RoI on the total investment. This calculator can help easily compute both accurately.
// - It’s easy to set the amount which you wish to withdraw every month and calculate amount on maturity accordingly.
// - It is easily accessible online.
// - This SWP return calculator does not require any expertise to operate. Users need to just put variables in proper space and output is ready in no time.

// `;



const SwpMarkdownContent = `## Understanding Systematic Withdrawal Plans (SWP)

A Systematic Withdrawal Plan (SWP) allows investors to manage their mutual fund investments efficiently. By investing a lump sum amount, you can set a fixed withdrawal amount at regular intervals.

For instance, imagine investing ₹1 lakh in HDFC Top 200 Fund for a year and deciding to withdraw ₹10,000 monthly. Each month, your fund balance decreases by ₹10,000 while the remaining amount continues to earn interest.

### Benefits of Using an SWP Calculator

A SWP calculator simplifies the complex task of calculating monthly withdrawals and the final maturity amount. It accurately computes your matured sum based on your withdrawal preferences.

### Example of a Systematic Withdrawal Plan

Suppose you invest Rs. 50,000 for a year with a monthly withdrawal of Rs. 1,000 at a 10% interest rate. Here's how your investment might perform:

| Month | Balance at Begin | Withdrawal | Interest Earned |
|-------|------------------|------------|-----------------|
| 1     | Rs. 50,000       | Rs. 1,000  | Rs. 408         |
| 2     | Rs. 49,408       | Rs. 1,000  | Rs. 403         |
| 3     | Rs. 48,812       | Rs. 1,000  | Rs. 398         |
| 4     | Rs. 48,210       | Rs. 1,000  | Rs. 393         |
| 5     | Rs. 47,604       | Rs. 1,000  | Rs. 388         |
| 6     | Rs. 46,992       | Rs. 1,000  | Rs. 383         |
| 7     | Rs. 46,375       | Rs. 1,000  | Rs. 378         |
| 8     | Rs. 45,753       | Rs. 1,000  | Rs. 373         |
| 9     | Rs. 45,126       | Rs. 1,000  | Rs. 368         |
| 10    | Rs. 44,494       | Rs. 1,000  | Rs. 362         |
| 11    | Rs. 43,856       | Rs. 1,000  | Rs. 357         |
| 12    | Rs. 43,214       | Rs. 1,000  | Rs. 352         |


### How to Use an SWP Calculator

Using an SWP calculator is straightforward:
- Enter the investment tenure, expected return rate, and initial amount invested.
- The calculator generates a withdrawal schedule similar to the example above.

### Advantages of Using an SWP Calculator

SWP calculators are particularly beneficial for retirees and senior citizens who require a fixed monthly income. Key advantages include:
- Ensuring steady monthly returns with ROI on investments.
- Simple operation with no specialized knowledge required.
- Accessible online for convenience.`;

interface SWPFormInputs {
    totalInvestment: number;
    withdrawalPerMonth: number;
    expectedReturnRate: number;
    timePeriod: number;
}



const SWPCalculator = () => {
    const [formInputs, setFormInputs] = useState<SWPFormInputs>({
        totalInvestment: 250000,
        withdrawalPerMonth: 0,
        expectedReturnRate: 13,
        timePeriod: 5,
    });

    const [totalInv, setTotalInv] = useState(0);
    const [totalValue, setTotalValue] = useState(0);
    const [totalWithdrawals, setTotalWithdrawals] = useState(0);

    const calculateResults = () => {
        const { totalInvestment, withdrawalPerMonth, expectedReturnRate, timePeriod } = formInputs;

        const monthlyRate = expectedReturnRate / 100 / 12;
        let balance = totalInvestment;
        let totalWithdrawn = 0;

        for (let month = 1; month <= timePeriod * 12; month++) {
            balance += balance * monthlyRate - withdrawalPerMonth;
            if (balance <= 0) {
                break;
            }
            totalWithdrawn += withdrawalPerMonth;
        }
        setTotalInv(totalInvestment);
        setTotalValue(balance);
        setTotalWithdrawals(totalWithdrawn);
    };

    useEffect(() => {
        calculateResults();
    }, [formInputs]); // Trigger calculation whenever formInputs change

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormInputs(prevInputs => ({
            ...prevInputs,
            [id]: Number(value),
        }));
    };
    return (
        <section className="section">
            <div className="container">
                <div className="content">
                    <h1 className="text-center mt-4">SWP Calculator</h1>
                    <br />
                    <div className="rounded-xl shadow px-4 py-16 dark:bg-darkmode-theme-light xl:p-20">
                        <div className="row items-center justify-between px-4">
                            <div className="md:col-4 lg:col-4 md:order-2 text-left">
                                <p >
                                    Total Investment: ₹ {totalInv.toLocaleString("en-IN")}
                                </p>
                                <p>
                                    Total Value: ₹ {totalValue.toLocaleString("en-IN")}
                                </p>
                                <p>
                                    Total Withdrawals: ₹ {totalWithdrawals.toLocaleString("en-IN")}
                                </p>
                                <p>
                                    {/* Estimated Returns: ₹{estimatedReturns.toLocaleString("en-IN")} */}
                                </p>
                            </div>
                            <div className="md:col-6 md:order-1">
                                <div className="my-4">
                                    <label
                                        htmlFor="lumpsum_amount"
                                        className="form-label"
                                        style={{ margin: 0 }}
                                    >
                                        Total Investment (₹)
                                    </label>
                                    <input
                                        id="totalInvestment"
                                        className="form-input w-full rounded-sm"
                                        placeholder="Enter Total Investment"
                                        type="number"
                                        name="totalInvestment"
                                        value={formInputs.totalInvestment}
                                        onChange={handleInputChange}
                                        style={{ width: "35rem" }}
                                    />
                                </div>
                                <div className="my-4">
                                    <label
                                        htmlFor="lumpsum_duration"
                                        className="form-label"
                                        style={{ margin: 0 }}
                                    >
                                        Withdrawal per month
                                    </label>
                                    <input
                                        id="withdrawalPerMonth"
                                        className="form-input w-full rounded-sm"
                                        placeholder="Withdrawal per month"
                                        type="number"
                                        name="withdrawalPerMonth"
                                        value={formInputs.withdrawalPerMonth}
                                        onChange={handleInputChange}
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
                                        id="expectedReturnRate"
                                        className="form-input w-full rounded-sm"
                                        placeholder="Expected Rate of Return"
                                        type="number"
                                        name="expectedReturnRate"
                                        value={formInputs.expectedReturnRate}
                                        onChange={handleInputChange}
                                        style={{ width: "35rem" }}
                                    />
                                </div>
                                <div className="my-4">
                                    <label
                                        htmlFor="lumpsum_rate"
                                        className="form-label"
                                        style={{ margin: 0 }}
                                    >
                                        Time period
                                    </label>
                                    <input
                                        id="timePeriod"
                                        className="form-input w-full rounded-sm"
                                        placeholder="Time period"
                                        type="number"
                                        name="timePeriod"
                                        value={formInputs.timePeriod}
                                        onChange={handleInputChange}
                                        style={{ width: "35rem" }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <br />
                    <div
                        dangerouslySetInnerHTML={markdownify(SwpMarkdownContent, true)}
                    />
                </div>
            </div>
        </section>
    );
};

export default SWPCalculator;
