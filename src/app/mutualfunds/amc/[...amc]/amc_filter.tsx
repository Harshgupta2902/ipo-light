import Link from "next/link";


const AMCFilter = async ({ amc }: { amc: any }) => {
    return (
        <div className="flex flex-col">
            <div className="-m-1.5 overflow-x-auto">
                <div className="align-middle content ">
                    <table className="w-full text-sm rounded-sm text-left">
                        <tbody>
                            {amc.map((item: any, index: number) => (
                                <tr key={index}>
                                    <td key={index} className="py-3">
                                        <Link
                                            className="capitalize pr-3 font-medium text-[14px] rounded-sm hover:underline"
                                            href={`/mutualfunds/amc/${item.link.toLowerCase().replaceAll(" ", "-")}`}
                                            style={{
                                                textDecoration: "none",
                                                fontSize: "medium",
                                                color: "#222222"
                                            }}
                                        >
                                            {item.link}
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AMCFilter;
