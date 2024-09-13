import Accordion from "@/components/common/Accordion";
import { markdownify } from "@/components/common/textConverter";
import { headers } from "next/headers";
import Link from "next/link";
export async function generateMetadata() {
    const headersList = headers();
    const completepathname = headersList.get("x-url");
    const pathname = completepathname?.replace('/ifsc-code/', "");
    const ifsc = pathname?.split('/').pop();

    let data = null;
    try {
        data = await fetchIfscData(ifsc ?? "");
    } catch (err) {
        console.error(`Error fetching IFSC DATA: ${err}`);
    }

    const metaTitle = `${data.IFSC} - ${data.BANK} ${data.BRANCH} BRANCH IFSC CODE`;
    const metaDescription = `Find Bank Details for IFSC:-${data.IFSC} of ${data.BANK} ${data.BRANCH} BRANCH, MICR Code, Branch Code, Address, and Phone Number for NEFT, RTGS, ECS.`;
    const keywords = `${data.IFSC}, ${data.BANK}, ${data.BRANCH}, ${data.MICR}, ${data.ADDRESS}, ${data.CENTRE}`;
    return {
        title: metaTitle,
        description: metaDescription,
        robots: "index, follow",
        author: "IpoTec",
        keywords: keywords,
        copyright: "Copyright 2024 @ IpoTec",
        url: "https://www.ipotec.in/",
        openGraph: {
            title: metaTitle,
            description: metaDescription,
            site: "https://www.ipotec.in/",
            images: "https://www.ipotec.in/og_image.png",
            type: "website",
            url: `https://www.ipotec.in${completepathname}`,
        },
        twitter: {
            card: "summary_large_image",
            title: metaTitle,
            description: metaDescription,
            images: "https://www.ipotec.in/og_image.png",
        },
        alternates: {
            canonical: `https://www.ipotec.in${completepathname}`,
        },
    };
}


function capitalizeWords(str: any) {
    return str
        .toLowerCase()
        .split('-')
        .map((word: any) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

export const faqList = [
    {
        question: "What is RTGS code?",
        answer: "The IFSC code is often referred to as RTGS code or NEFT code, since it is used to transfer money using RTGS."
    },
    {
        question: "Is IFSC code and branch code the same?",
        answer: "IFSC code is not the same as branch code. IFSC (Indian Financial System Code) consists of eleven characters and is used to identify the bank and its branch. While the branch code is a part of the IFSC code, it is not the same."
    },
    {
        question: "What is the meaning of RTGS in banking?",
        answer: "RTGS stands for Real Time Gross Settlement. RTGS is one of the main payment and settlement systems in India. To make a payment using RTGS, one requires details like name of the account holder, account number and the IFSC code of the bank. Money can be transferred from one bank account to another safely using RTGS. IFSC code is often referred to as RTGS code or NEFT code for the same reason."
    },
    {
        question: "Is IFSC code and RTGS the same?",
        answer: "IFSC stands for Indian Financial System Code. The IFSC code comprises eleven characters and is used to identify the bank and its branch. RTGS stands for Real Time Gross Settlement. It is one of two main payment and settlement systems in India. To conduct any such EFT, IFSC is required."
    },
    {
        question: "What is the branch code of a bank?",
        answer: "The branch code of a bank branch helps in distinguishing one branch from another. It is available on the bank’s website, printed on cheque books and pass-books. The last 6 characters of any given IFSC code is the branch code."
    },
    {
        question: "What is the difference between NEFT and RTGS?",
        answer: `
  NEFT stands for National Electronic Funds Transfer, whereas RTGS refers to Real Time Gross Settlement. These two are the two main money transferring systems in India. Minimal transfer charges are to be paid for conducting transfers using NEFT or RTGS. The key differences between them are explained below:
  
  | Parameters               | RTGS                            | NEFT                           |
  |--------------------------|---------------------------------|--------------------------------|
  | Full form                | Real Time Gross Settlement       | National Electronic Funds Transfer |
  | Transfer type            | One-on-one settlement            | Batches                         |
  | Transfer speed           | Nearly Instant                   | 0-2 hours, settled in batches   |
  | Minimum transfer amount  | Rs 2 lakh                        | Re. 1                           |
  | Maximum transfer amount  | Rs. 10 lakhs                     | No limit                        |
      `
    },
    {
        question: "Is Cheque required for NEFT?",
        answer: "No, a cheque is not required for NEFT."
    },
    {
        question: "Is IMPS faster than NEFT?",
        answer: "Yes, IMPS is faster than NEFT as the money gets transferred immediately using IMPS while NEFT is settled in time-regulated batches."
    },
    {
        question: "How much time will it take to settle a NEFT?",
        answer: "A NEFT is finished immediately. It can sometimes take up to 30 minutes, but it does not take longer than that."
    },
    {
        question: "Are there any charges for NEFT transfer?",
        answer: `
  The charges for NEFT depend upon the slab in which the amount falls. The details of these are given below:
  
  | Transaction slab               | Charges |
  |--------------------------------|---------|
  | Up to Rs. 10,000              | Rs. 2.5  |
  | From Rs. 10,000 to Rs. 1 lakh | Rs. 5   |
  | From Rs. 1 lakh to Rs. 2 lakh | Rs. 15  |
  | From Rs. 2 lakh to Rs. 5 lakh | Rs. 25  |
  | From Rs 5 lakh to Rs. 10 lakh | Rs. 50  |
      `
    },
    {
        question: "Can we stop NEFT payment?",
        answer: "Once initiated, a NEFT payment cannot be stopped. In case any of the details (account number/ IFSC code) are incorrect, the funds get reversed to the account the payment was initiated from."
    },
    {
        question: "Can NEFT transfer be reversed?",
        answer: "A NEFT payment cannot be reversed. However, in case any of the details required (account number/ IFSC code) are entered incorrectly, the funds get reversed to the account the payment was initiated from."
    }
];

const fetchIfscData = async (ifsc: string) => {
    try {
        const response = await fetch(`https://ifsc.razorpay.com/${ifsc}`);
        if (!response.ok) {
            throw new Error("Data not found");
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching GmpIpo", error);
        throw error;
    }
};


const IfscDetails = async () => {
    const headersList = headers();
    const completepathname = headersList.get("x-url");
    const pathname = completepathname?.replace('/ifsc-code/', "");
    const ifsc = pathname?.split('/').pop();

    const segments = completepathname?.split('/').filter(segment => segment);

    let data = null;
    try {
        data = await fetchIfscData(ifsc ?? "");
    } catch (err) {
        console.error(`Error fetching IFSC DATA: ${err}`);
    }
    return (
        <div className="container">
            <nav className="flex ml-4 mt-4" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1md:space-x-2 rtl:space-x-reverse">
                    {segments?.map((segment, index) => {
                        const isLast = index === segments.length - 1;
                        const isFirst = index === 0;
                        return (
                            <li key={index} className="inline-flex items-center">
                                {isLast ? (
                                    <span className="text-xs font-medium text-gray-700 md:ms-2">
                                        {segment}
                                    </span>
                                ) : isFirst ? (
                                    <>

                                        <Link href={"/ifsc-code"}>
                                            <span className="text-xs font-bold text-gray-700 md:ms-2">
                                                {capitalizeWords(segment)}
                                            </span>
                                        </Link>
                                        <svg className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                                        </svg>
                                    </>
                                ) : (
                                    <>
                                        <span className="inline-flex items-center text-xs font-medium text-gray-700">
                                            {capitalizeWords(segment)}
                                        </span>
                                        <svg className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                                        </svg>
                                    </>
                                )}
                            </li>
                        );
                    })}
                </ol>
            </nav>
            <div className=" container relative overflow-x-auto sm:rounded content">
                <h1 className="text-2xl" >{data.BANK} IFSC Code {data.BRANCH}, {data.STATE}</h1>
                <p className="text-md" >IFSC Code of {data.BANK} is {" "}
                    <strong id="IFSC">{data.IFSC}</strong>
                </p>
                <p className="text-md pb-6" >Find More Details of {data.BANK}, {data.BRANCH}, {data.STATE} below:</p>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                    <tbody>
                        {Object.entries(data).map(([key, value]) => {
                            return (value === null || value === '' ? null :
                                <tr key={key}>
                                    <td><strong>{key}</strong></td>
                                    <td>{value?.toString()}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <br />

            <section className="section">
                <div className="container">
                    <div className="lg:col-5 mx-auto text-center">
                        <h3>Frequently Asked Questions</h3>
                    </div>
                    <div className="row justify-center mt-12 ">
                        {faqList.map((faqItem, index) => (
                            <Accordion key={index} title={faqItem.question}>
                                <div className={"content"} dangerouslySetInnerHTML={markdownify(faqItem.answer, true)} />
                            </Accordion>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default IfscDetails;
