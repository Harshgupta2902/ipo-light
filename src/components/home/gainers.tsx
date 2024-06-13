import { StockData } from "./stocks-card";

interface GainersCardProps {
  gainers: StockData[];
}

const GainersCard: React.FC<GainersCardProps> = ({ gainers }) => {
  return (
    <div className="-m-1.5 overflow-x-auto mt-6">
      <div className="p-1.5 align-middle">
        <table className="text-sm text-left  text-gray-500">
          <tbody>
            {gainers.map((stock, index) => (
              <tr key={index}>
                <td>
                  <img
                    src={`https://assets.tickertape.in/stock-logos/${stock.sid}.png`}
                    alt={stock.name}
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
                <td className="pr-6">
                  <span className="stockSidPrice">
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
    </div>
  );

};

export default GainersCard;
