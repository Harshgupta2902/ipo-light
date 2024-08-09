import NotFound from '@/app/not-found';
import { markdownify } from '@/components/common/textConverter';
import { headers } from 'next/headers';
import Link from 'next/link';
import React from 'react'



const categories = [
    {
        name: "Debt",
        subcategories: [
            {
                name: "Low Duration",
                url: "best-low-duration-mutual-funds"
            },
            {
                name: "Medium Duration",
                url: "best-medium-duration-mutual-funds"
            },
            {
                name: "Dynamic Bond",
                url: "best-dynamic-mutual-funds"
            },
            {
                name: "Gilt",
                url: "best-gilt-mutual-funds"
            },
            {
                name: "Credit Risk",
                url: "best-credit-risk-mutual-funds"
            },
            {
                name: "Liquid",
                url: "best-liquid-mutual-funds"
            },
            {
                name: "Ultra Shorts",
                url: "best-ultra-short-mutual-funds"
            }
        ]
    },
    {
        name: "Hybrid",
        subcategories: [
            {
                name: "Aggressive",
                url: "best-aggressive-mutual-funds"
            },
            {
                name: "Conservative",
                url: "best-conservative-mutual-funds"
            },
            {
                name: "Arbitrage",
                url: "best-arbitrage-mutual-funds"
            }
        ]
    },
    {
        name: "Equity",
        subcategories: [
            {
                name: "Multi Cap",
                url: "best-multi-cap-mutual-funds"
            },
            {
                name: "Large Cap",
                url: "best-large-cap-mutual-funds"
            },
            {
                name: "Mid Cap",
                url: "best-mid-cap-mutual-funds"
            },
            {
                name: "Small Cap",
                url: "best-small-cap-mutual-funds"
            },
            {
                name: "ELSS",
                url: "best-elss-mutual-funds"
            },
            {
                name: "Dividend Yield",
                url: "best-dividend-yield-mutual-funds"
            },
            {
                name: "Sector",
                url: "best-sector-mutual-funds"
            },
            {
                name: "Contra",
                url: "best-contra-mutual-funds"
            },
            {
                name: "Value",
                url: "best-value-mutual-funds"
            }
        ]
    }
];


const categoryContent = `

## Sebi Mutual Fund Categorization

The Securities and Exchange Board of India (SEBI) regulates the securities market of India. SEBI has updated the categorisation of mutual funds schemes and there are 36 reclassified the fund schemes and available now.

## Reasons Behind The Recategorization

The reason behind this move by SEBI is to bring a uniformity in the way AMCs need to function as well as clearly define the attributes of fund schemes to categorise them better. The new SEBI mutual fund categorisation rules ask fund houses to clearly define the objectives of the mutual fund schemes keeping the investment objective and asset allocation in mind.

## What are the mutual fund recategorization norms?

The advantage of this move is primarily to help investors gain more clarity about the different options they have. SEBI has now made the following changes with regards to the mutual fund categorisation.

-   Improved classification : SEBI has now clearly defined the asset allocation, investment mandate and overall risk profile of a mutual fund scheme. Mutual fund categories according to SEBI now are Equity, debt , hybrid, solution oriented and others.
-   Renaming Of Schemes : According to SEBI, schemes need to be renamed in such a way that the risk profile associated with the scheme gets clearly mentioned now. This called ,for removal of adjectives like " opportunity", " advantage" etc, which attracted investors towards them without them being able to analyse the inherent risks associated.
-   Introduction of a lock-in period : For solution oriented schemes such as retirement fund and children's fund, SEBI has now introduced a lock in period. This lock in period is not applicable for existing users however.
-   Changes To Scheme attributes : The fund houses are now required to redefine the investment mandate, investment strategy as well as benchmark against which the fund performance will be evaluated, as mandated by SEBI.

Hence, the new rules by SEBI for mutual fund categories, have now compelled AMCs to realign their offerings and classify them as per the new norms. Here is the new classification structure.

## List of New Fund Categories

Equity Schemes

Equity funds will be further broken down to 10 sub categories listed below.

**a. Multi-cap fund**  - These schemes invests at least 65% of the total assets in in equity and equity-related instruments.

**b. Large cap Fund**  - These schemes are required to make a minimum investment of 80% of the total assets in the equity and equity related instruments of large cap companies.

**c. Large and Mid-cap fund**  – The schemes need to make a minimum investment of at least 35% of total assets in both large cap and mid cap companies each.

**d. Mid-cap funds**  - 65% of the total assets should be invested in the equity and equity related instruments of mid cap companies for this scheme.

**e. Small Cap fund**  - The investment required by the scheme in equity and equity-related instrument of small cap companies is 65% of the total assets.

**f. Dividend Yield funds**  - This scheme primarily investments in dividend yielding stocks. The minimum investment required is 65% of the total assets in equity instruments.

**g. Value Fund**  - The scheme follows a value investment strategy and is mandated to invest at least 65% of the total assets in equity and equity related instruments.

**h. Contra Fund**  - The contra fund scheme should have a minimum investment of 65% of the total assets in equity instruments. A contrarian investment strategy should be followed by these schemes.

**i. Focused Fund**  - This scheme invests in equity & equity-related instruments of a limited number of companies not exceeding 30. At least 65% of the total assets will be invested in aforementioned instruments of companies across market capitalization.

**j. Sectoral/ Thematic**  - The investment should be made in a particular sector or particular theme only. The minimum investment for the same in equity and equity-related instruments is 80% of the total assets.

**k. ELSS**  - An open-ended equity linked saving scheme has a compulsory holding period of 3 years but provides tax benefit to the investor. The scheme is required to make a minimum investment of at least 80% of the total assets in equity and equity-related instruments.

## Debt Schemes

**a. Overnight Fund**  - As the name suggests, these schemes invest in securities with a maturity of 1 day.

**b. Liquid funds**  - Liquid fund schemes invest in debt and money markets with a maximum maturity of up to 91 days only.

**c. Ultra Short Duration Fund**  – These schemes predominantly invest in debt and money market instruments with a Macaulay duration period of 3 to 6 months.

**d. Low Duration Fund**  - This scheme invests with a Macaulay duration of 6 to 12 months and the investment is primarily done in debt and money market instruments.

**e. Money Market Fund**  – These schemes invest in money market instruments with a maturity of up to one year.

**f. Short Duration Fund**  – As the name suggests, these schemes try to invest in debt and money market instruments while ensuring that the Macaulay duration of the portfolio remains around 1-3 years.

**g. Medium Duration Fund**  - Medium Duration fund schemes invest in debt and money market instruments while ascertaining that the Macaulay duration of the portfolio remains around 3 to 4 years.

**h. Medium to Long Duration Fund**  - These schemes investment into debt and money market instruments with Macaulay duration of the portfolio around 4 to 7 years.

**i. Long Duration Fund**  - The portfolio of these schemes has a Macaulay duration of over 7 years. Investment is predominantly made in debt and money market instruments.

**j. Dynamic Bond**  - These schemes follow a dynamic approach towards maturity of securities in the portfolio. Investments are done across durations.

**k. Corporate Bond Fund**  - These schemes invest at least 80% of total assets in only high rated corporate bonds.

**l. Credit Risk Fund**  - The investment is made in instruments below the high rated instruments. The minimum investment required in corporate bonds for the same is 65% of the total assets.

**m. Banking and PSU funds**  - These funds need to have a minimum of 80% of investment of total assets in debt instruments of bank, public sector undertakings and public financial institutions.

**n. Gilt Fund**  - The minimum investment requirement for gilt funds is 80% of the total assets in Gsecs across its maturity.

**o. Gilt Fund with 10-year constant duration**  - 80% of the total assets should be invested in the Gsecs such that Macaulay duration of the investment is equal to 10 years.

**p. Floater Fund**  - These funds are mandated to have a minimum investment of at least 65% of the total assets in floating rate instruments.

## Hybrid Schemes

**a. Conservative Hybrid Fund**  - The fund is required to make investments in both equity and debt instruments. The investment requirement for equity & equity-related instruments is between 10% to 25% of the total assets and that for debt instruments it is 75% to 90% of the total assets.

**b. Balanced Hybrid Fund**  - The minimum investment requirement for this fund scheme is 40% to 60% of the total assets for both equity as well as debt instruments. Arbitrage is not allowed in this scheme.

**c. Aggressive Hybrid Fund**  - These funds invest in both equity & equity-related and debt instruments with a minimum requirement of 65-80% for the former and 25-30% for the latter.

**d. Dynamic Asset Allocation or Balanced Advantage**  - This scheme is free to dynamically change the investment in equity & debt instruments.

**e. Multi Asset Allocation**  - These hybrid fund schemes allocate minimum 10% in three asset classes. This scheme is mandated to invest at least in 3 asset classes.

**f. Arbitrage Fund**  - As the name suggests, these schemes follow an arbitrage strategy and are required to invest 65% of the total assets in equity & equity-related instruments.

**g. Equity Savings**  - This scheme invests in both equity and debt securities. The minimum requirement for equity & equity-related instruments is 65% of the total assets and for debt instruments it is 10% of the total assets. It is necessary to show the minimum hedged and unhedged in SID.

## Solution-oriented Schemes:

**a. Retirement Fund**  - The retirement fund scheme has a lock in period of 5 years or the retirement age whichever is earlier.

**b. Children's Fund**  - This solution-oriented scheme has a lock in for at least 5 years or till the child turns major whichever is earlier.

Other Schemes:

**Index Funds/ ETFs**  - These schemes replicate a particular index by investing at least 95% of the total assets in the securities of the index being replicated.

**FoFs (Overseas/ Domestic)**  - The FoF schemes have a minimum investment requirement of 95% of the total assets in the underlying fund.

Increasing transparency, the new mutual fund categories by SEBI, will now enable investors to compare schemes and select the one that aligns with their investment objective and risk profile.


`;



export default function CategoryPage() {
    return (
        <section className='section'>
            <div className="container">
                <h1 className="text-center text-3xl">Mutual Funds Categories</h1>
                <br />
                {categories.map((category, index) => (
                    <>
                        <h2 className='text-[20px]'>{category.name}</h2>
                        <br />
                        <div className="row">
                            {category.subcategories.map((subcat, index) => (
                                <div key={index} className="mb-14 md:col-6 lg:col-3">
                                    <Link href={`category/${subcat.url}`}>
                                        <div className="flex flex-col border items-center rounded-sm hover:shadow px-8 py-12 text-center">
                                            <span className="text-md text-gray-900">{subcat.name}</span>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>

                    </>
                ))}
                <br />
                <div className="content" dangerouslySetInnerHTML={markdownify(categoryContent, true)} />
            </div>
        </section>
    )
}


