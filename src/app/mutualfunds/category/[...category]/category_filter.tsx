import Link from "next/link";


const CategoryFilter = async ({ categories, activeTitle }: { categories: any, activeTitle: string }) => {
    return (
        <div className="flex flex-col">
            <div className="-m-1.5 overflow-x-auto">
                <div className="align-middle content ">
                    <table className="w-full text-sm rounded-sm text-left">
                        <tbody>
                            {categories.map((item: any, index: number) => (
                                <>

                                    <tr key={index}>
                                        <td key={index} className="py-3">
                                            <div className="capitalize pr-3 font-medium text-[14px] text-[#0F5151] rounded-sm cursor-pointer">
                                                {item.name}
                                            </div>
                                        </td>
                                    </tr>
                                    {item.subcategories.map((subcat: any, index: number) => (
                                        <tr key={index}>
                                            <td key={index} className="py-3">
                                                <Link
                                                    className="capitalize pr-3 font-medium text-[12px] pl-8 rounded-sm hover:underline"
                                                    href={`${subcat.url}`}
                                                    style={{
                                                        textDecoration: "none",
                                                        fontSize: "medium",
                                                        color: activeTitle === subcat.url ? "#0045DA" : "#222222"
                                                    }}
                                                >
                                                    {subcat.name}
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}

                                </>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default CategoryFilter;
