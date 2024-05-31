interface Stock {
  sid: string;
  name: string;
  price: number;
  change: number;
}

interface Props {
  gainers: Stock[];
}

const GainersCard: React.FC<Props> = ({ gainers }) => {
  return (
    <div className="relative mt-12">
      <table className="lg:w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <tbody>
          {gainers.map((stock, index) => (
            <tr key={index}>
              <td>
                <img
                  src={`https://assets.tickertape.in/stock-logos/${stock.sid}.png`}
                  alt="Stock Logo"
                  style={{ width: "48px", height: "48px" }}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `https://placehold.co/48x48/EEE/31343C?font=Lora&text=${stock.sid[0]}`;
                  }}
                />
              </td>
              <td>
                <div className="grid grid-cols-1 stockSid">
                  <p className=" m-0">{stock.name}</p>
                  <p className="text-grey m-0">{stock.sid}</p>
                </div>
              </td>
              <td>
                <span className=" stockSidPrice">
                  ₹{stock.price.toLocaleString("en-IN")}
                </span>
              </td>
              <td>
                <span className="text-green">{stock.change.toFixed(2)}%</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GainersCard;
