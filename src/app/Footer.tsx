import React from 'react'
import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";



const Footer = () => {
    return (
        <div className="bg-white pt-0 sm:py-10 lg:py-16 h-full">
            <div className="container">
                <div className="flex flex-col lg:flex-row items-start justify-between border-[#9A9EA44D] pb-0 lg:pb-8">
                    <div className="1/3 m-auto lg:m-0">
                        <Link href={"/"} className="relative w-fit m-auto block lg:m-0">
                            <div className="order-0 flex items-center">
                                <Image
                                    src={"/logo.svg"}
                                    className="mx-auto"
                                    width="40"
                                    height="40"
                                    alt="IpoTec Logo"
                                    priority
                                />
                                <span className=" ml-2 text-3xl text-gray-900">IpoTec</span>
                            </div>
                        </Link>
                        <br />
                        <div className="flex gap-2 mt-2">
                            {socialMediaLinks.map((link, index) => (
                                <React.Fragment key={index}>
                                    <Link prefetch={false} href={""} className="w-1/4 bg-white rounded-md hover:shadow-lg p-2" aria-label="Social Icons">
                                        {link.icon}
                                    </Link>
                                </React.Fragment>
                            ))}
                        </div>
                    </div>

                    <div className="hidden mt-4 ml-[14rem] lg:mt-0 w-full lg:w-2/3 lg:flex">
                        {footer.map((item, index) => (
                            <div className="text-lg font-semibold text-gray-700 capitalize w-1/4" key={index}>
                                <Link href={item.link}>{item.page}</Link>
                                {item.subPages.map((items, indexs) => (
                                    <div className="text-sm text-[#6E6E73] font-medium my-2 block" key={indexs}>
                                        {
                                            <Link prefetch={false} href={items.link} className="inline-block hover:translate-x-1 transition-all">
                                                {items.page}
                                            </Link>
                                        }
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex flex-wrap gap-2 py-5 border-b-[1px] border-[#9A9EA44D]">
                    <p className="inline-block text-[#000000] font-medium text-[14px] capitalize mr-2">
                        Mutual Funds AMC's :
                    </p>
                    {amc.map((amc_name) => (
                        <Link
                            href={""}
                            // href={`/mutualfunds/amc/${amc_name.replaceAll(" ", "-")}`}
                            key={amc_name}
                            className="capitalize pr-3 text-[#0F5151] font-medium text-[14px] rounded-sm hover:underline"
                        >
                            {amc_name}
                        </Link>
                    ))}
                </div>

                <div className="flex flex-wrap gap-2 py-5 border-b-[1px] border-[#9A9EA44D]">
                    <p className="inline-block text-[#000000] font-medium text-[14px] capitalize mr-2">
                        Top Mutual Funds:
                    </p>
                    {funds.map((funds) => (
                        <Link
                            href={`/mutualfunds/details/${funds.link}`}
                            key={funds.link}
                            className="capitalize pr-3 text-[#0F5151] font-medium text-[14px] rounded-sm hover:underline"
                        >
                            {funds.name}
                        </Link>
                    ))}
                </div>
                <p className="text-[12px] text-[#6E6E73] font-normal border-b-[1px] border-[#9A9EA44D] py-3">
                    <span className="inline-block text-[#74579] font-medium text-[13px] capitalize mr-1">
                        <strong>Disclaimer:</strong>
                    </span>
                    Logos and other registered trademarks of funds used on this
                    platform are held by their respective owners. IpoTec does not
                    claim ownership or association on them, and their use is purely for
                    informational and illustrative purposes.
                </p>
                <div className="flex-wrap gap-2 lg:gap-0 lg:flex-unwrap flex items-center justify-between py-3">
                    <div className="w-auto text-[12px] lg:text-[14px] text-[#6E6E73] font-medium">Copyrights ©{new Date().getFullYear()} IpoTec. All rights reserved.</div>
                    {/* <div className="w-auto gap-1 lg:gap-2 flex items-center">
                        {footer?.information && footer?.information.policyInfo && Object.entries(footer?.information.policyInfo).map(([key, value]) => (
                            <Link prefetch={false} href={value} key={key} className="font-semibold lg:font-medium inline-block text-[11px] lg:text-[14px] text-[#6E6E73] text-center">{key}</Link>
                        ))}
                    </div> */}

                </div>
            </div>
        </div >
    );
};

export default Footer;

const footer = [
    {
        page: "Ipo",
        link: "/ipo",
        subPages: [
            { page: "Upcoming Ipo", link: "/ipo/upcomingIpo", },
            { page: "Grey Market Ipo", link: "/ipo/greyMarketIpo", },
            { page: "SME Ipo", link: "/ipo/smeMarketIpo", },
            { page: "Subscription Status", link: "/ipo/subscriptionStatus", },
            { page: "Ipo Forms", link: "/ipo/ipoForms", },
            { page: "Ipo BuyBack", link: "/ipo/sharesBuyBack", },
        ],
    },
    {
        page: "Mutual Fund",
        link: "/mutualfunds",
        subPages: [
            { page: "Screener", link: "/mutualfunds/screener", },
            { page: "amc", link: "/mutualfunds/amc", },
        ],
    },
    {
        page: "Tools",
        link: "/calculators",
        subPages: [
            { page: "Sip Calculator", link: "/calculators/sip_calculator", },
            { page: "Lumpsum Calculator", link: "/calculators/lumpsum_calculator", },
            { page: "SWP Calculator", link: "/calculators/swp_calculator", },
        ],
    },
    {
        page: "Others",
        link: "",
        subPages: [
            { page: "About Us", link: "/about-us", },
            { page: "Privacy Policy", link: "/privacy-policy", },
            { page: "Terms & Conditins", link: "/terms-condition", },
            { page: "Disclaimer", link: "/disclaimer", },
            { page: "Contact", link: "/contact", },
        ],
    },

];


const socialMediaLinks = [
    { icon: <FaFacebookF className="text-[#5d82d1]" />, platform: 'facebook' },
    { icon: <FaInstagram className="text-[#c22b72]" />, platform: 'instagram' },
    { icon: <FaXTwitter />, platform: 'twitter' },
    { icon: <FaLinkedinIn className="text-[#238cc8]" />, platform: 'linkedin' },
    { icon: <FaYoutube className="text-red-500" />, platform: 'youtube' }
];


const amc = [
    "Bajaj Finserv Mutual Fund",
    "Helios Mutual Fund",
    "WhiteOak Capital Mutual Fund",
    "ITI Mutual Fund",
    "TRUST Mutual Fund",
    "NJ Mutual Fund",
    "Samco Mutual Fund",
    "Mahindra Manulife Mutual Fund",
    "Canara Robeco Mutual Fund",
    "Quant Mutual Fund",
    "ICICI Prudential Mutual Fund",
    "JM Financial Mutual Fund",
    "LIC Mutual Fund",
    "Franklin Templeton Mutual Fund",
    "Aditya Birla Sun Life Mutual Fund",
    "Mirae Asset Mutual Fund",
    "Bank of India Mutual Fund",
    "Motilal Oswal Mutual Fund",
    "PGIM India Mutual Fund",
    "360 ONE Mutual Fund",
    "Nippon India Mutual Fund",
    "Union Mutual Fund",
    "Bandhan Mutual Fund",
    "Navi Mutual Fund",
    "SBI Mutual Fund",
    "DSP Mutual Fund",
    "Tata Mutual Fund",
    "Edelweiss Mutual Fund",
    "Invesco Mutual Fund",
    "Sundaram Mutual Fund",
    "HDFC Mutual Fund",
    "HSBC Mutual Fund",
    "PPFAS Mutual Fund",
    "Baroda BNP Paribas Mutual Fund",
    "Quantum Mutual Fund",
    "Taurus Mutual Fund",
    "Shriram Mutual Fund",
    "Groww Mutual Fund"
];


const funds = [
    {
        name: "QUANT SMALL CAP FUND",
        link: "quant-small-cap-fund-direct-plan-growth"
    },
    {
        name: "ICICI PRUDENTIAL COMMODITIES FUND",
        link: "icici-prudential-commodities-fund-direct-growth"
    },
    {
        name: "NIPPON INDIA SMALL CAP FUND",
        link: "nippon-india-small-cap-fund-direct-growth"
    },
    {
        name: "PARAG PARIKH FLEXI CAP FUND",
        link: "parag-parikh-long-term-value-fund-direct-growth"
    },
    {
        name: "GROWW NIFTY TOTAL MARKET INDEX FUND",
        link: "groww-nifty-total-market-index-fund-direct-growth"
    },
    {
        name: "SBI SMALL MIDCAP FUND",
        link: "sbi-small-midcap-fund-direct-growth"
    },
    {
        name: "TATA DIGITAL INDIA FUND",
        link: "tata-digital-india-fund-direct-growth"
    },
    {
        name: "AXIS SMALL CAP FUND",
        link: "axis-small-cap-fund-direct-growth"
    },
    {
        name: "ICICI PRUDENTIAL TECHNOLOGY FUND",
        link: "icici-prudential-technology-fund-direct-growth"
    },
    {
        name: "HDFC INDEX FUND SENSEX PLAN",
        link: "hdfc-index-fund-sensex-plan-direct"
    },
    {
        name: "HDFC SMALL CAP FUND",
        link: "hdfc-small-cap-fund-direct-growth"
    },
    {
        name: "AXIS EQUITY FUND",
        link: "axis-equity-fund-direct-growth"
    },
    {
        name: "CANARA ROBECO SMALL CAP FUND",
        link: "canara-robeco-small-cap-fund-direct-growth"
    },
    {
        name: "TATA SMALL CAP FUND",
        link: "tata-small-cap-fund-direct-growth"
    },
    {
        name: "UTI NIFTY FUND",
        link: "uti-nifty-fund-direct-growth"
    }
];  