import { headers } from "next/headers";


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

    let data = null;
    try {
        data = await fetchIfscData(ifsc ?? "");
        console.log(data);

    } catch (err) {
        console.error(`Error fetching IFSC DATA: ${err}`);
    }
    return (
        <div className="section">
            <div className="container">
                <div className="container relative overflow-x-auto sm:rounded content">
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
            </div>
        </div>


    );
};

export default IfscDetails;
