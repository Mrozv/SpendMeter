import MonthSummary from "./MonthSummary";

export default function Summary({
  blocksStyles,
  onCountSummaryData,
  transactions,
  rawTransactions,
}) {
  const summaryData = onCountSummaryData();
  const styles =
    "rounded bg-[#11151C] text-center justify-center items-center flex w-full text-xl py-4";
  return (
    <div className={`col-span-2 max-sm:col-span-1 flex flex-col gap-4`}>
      <div className={`${blocksStyles} h-full`}>
        <MonthSummary rawTransactions={rawTransactions}></MonthSummary>
      </div>
      <div className="flex justify-between max-sm:h-full h-[20%] w-full gap-4 max-sm:flex-col">
        <div className={styles}>
          {transactions.length > 0 ? (
            <DataSpan
              name={summaryData.total}
              icon="fa-solid fa-wallet"
            ></DataSpan>
          ) : (
            "Brak transakcji..."
          )}
        </div>
        <div className={styles}>
          {transactions.length > 0 ? (
            <DataSpan
              name={summaryData.positive}
              icon="fa-solid fa-arrow-trend-up"
            ></DataSpan>
          ) : (
            "Brak transakcji..."
          )}
        </div>
        <div className={styles}>
          {transactions.length > 0 ? (
            <DataSpan
              name={summaryData.negative}
              icon="fa-solid fa-arrow-trend-down"
            ></DataSpan>
          ) : (
            "Brak transakcji..."
          )}
        </div>
      </div>
    </div>
  );
}

export function DataSpan({ name, icon }) {
  return (
    <span
      className={`flex w-full gap-6 items-center justify-center ${
        name < 0 && "text-red-600"
      } ${name === 0 && "text-white"} ${name > 0 && "text-green-400"}`}
    >
      <i className={icon}></i>
      {name.toFixed(2)} zł
    </span>
  );
}
