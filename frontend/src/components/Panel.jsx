import LineChart from "./LineChart";
import Summary from "./Summary";
import { useRef } from "react";
import PieChart from "./PieChart";

export default function Panel({
  transactions,
  onCountSummaryData,
  rawTransactions,
  categories,
}) {
  const chartRef = useRef(null);
  const blocksStyles = `rounded bg-[#11151C] p-4 border border-[#3d444d40]`;

  function resetChartZoom() {
    chartRef.current.resetZoom();
  }

  return (
    <div className="w-screen h-screen max-sm:h-fit flex justify-center items-center max-sm:p-6 p-12">
      <div className="w-full h-full grid grid-cols-4 grid-rows-2 gap-4">
        <PieChart
          transactions={transactions}
          categories={categories}
          blocksStyles={blocksStyles}
        ></PieChart>
        <div className={`${blocksStyles} flex flex-col col-span-3 max-md:col-span-4`}>
          <div className="w-full flex justify-between">
            <span>Dochody vs wydatki</span>
            <button
              className="bg-[#1D222A] hover:bg-gray-600 px-6 py-1 rounded w-fit"
              onClick={resetChartZoom}
            >
              Reset
            </button>
          </div>
          <div className="h-full">
            {transactions.length > 0 ? (
              <LineChart ref={chartRef} transactions={transactions}></LineChart>
            ) : (
              <div className="h-full w-full flex justify-center items-center">
                <span>Brak transakcji...</span>
              </div>
            )}
          </div>
        </div>
        <div className={`${blocksStyles} col-span-2 flex flex-col gap-4 max-md:col-span-4`}>
          <span>Ostatnie transakcje</span>
          <div className="overflow-y-auto h-full rounded">
            <table className="text-left w-full table-fixed max-w:[420px]">
              <thead className="sticky top-0">
                <tr className="bg-[#1D222A]">
                  <th className="p-4">Kategoria</th>
                  <th className="p-4">Data</th>
                  <th className="p-4">Kwota</th>
                </tr>
              </thead>
              <tbody className="[&>*:nth-child(odd)]:bg-[#11151C]">
                {transactions.length === 0 ? (
                  <tr>
                    <td colSpan="3" rowSpan="10" className="text-center p-4">
                      Brak transakcji...
                    </td>
                  </tr>
                ) : (
                  transactions.slice(0, 12).map((transaction) => (
                    <tr key={transaction.id} className="bg-[#1d222a62]">
                      <td className="p-4">{transaction.category}</td>
                      <td className="p-4">{transaction.date}</td>
                      <td
                        className={`p-4 ${
                          transaction.amount < 0
                            ? "text-red-600"
                            : "text-green-400"
                        } ${transaction.amount === 0 ? "text-white" : ""}`}
                      >
                        {`${transaction.amount} zł`}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <Summary
          onCountSummaryData={onCountSummaryData}
          blocksStyles={blocksStyles}
          transactions={transactions}
          rawTransactions={rawTransactions}
        ></Summary>
      </div>
    </div>
  );
}
