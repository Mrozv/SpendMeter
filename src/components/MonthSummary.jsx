export default function MonthSummary({ rawTransactions }) {
  const monthNames = [
    "Styczeń",
    "Luty",
    "Marzec",
    "Kwiecień",
    "Maj",
    "Czerwiec",
    "Lipiec",
    "Sierpień",
    "Wrzesień",
    "Październik",
    "Listopad",
    "Grudzień",
  ];
  function countMonthSummary() {
    const monthsSummary = [];
    let total = 0;
    let positive = 0;
    let negative = 0;
    for (let index = 0; index < rawTransactions.length; index++) {
      const currentMonth = new Date(rawTransactions[index].date).getMonth();
      const nextTransaction = rawTransactions[index + 1];
      const nextMonth = nextTransaction
        ? new Date(rawTransactions[index + 1].date).getMonth()
        : null;

      const { amount } = rawTransactions[index];
      const parsedAmount = parseFloat(amount);
      total += parsedAmount;
      if (amount > 0) {
        positive += parsedAmount;
      } else {
        negative += parsedAmount;
      }

      if (currentMonth !== nextMonth) {
        monthsSummary.push({
          total,
          positive,
          negative,
          month: monthNames[currentMonth],
        });
        total = 0;
        positive = 0;
        negative = 0;
      }
    }
    return monthsSummary;
  }

  return (
    <div className="flex flex-col gap-4 h-full">
      <span>Podsumowanie</span>
      <div className="flex p-4 rounded-2xl justify-between bg-[#1D222A]">
        <SummaryLabel icon={"fa-regular fa-calendar-days"} />
        <SummaryLabel icon={"fa-solid fa-wallet"} />
        <SummaryLabel icon={"fa-solid fa-arrow-trend-up"} />
        <SummaryLabel icon={"fa-solid fa-arrow-trend-down"} />
      </div>
      {rawTransactions.length > 0 ? (
        <div className="overflow-y-auto h-full">
          {countMonthSummary().map((month) => {
            return (
              <div key={Math.random()} className="flex p-2 justify-between">
                <span className={`w-1/4`}>{month.month}</span>
                <MonthData data={month.total} />
                <MonthData data={month.positive} />
                <MonthData data={month.negative} />
              </div>
            );
          })}
        </div>
      ) : (
        <div className="w-full h-full flex justify-center items-center">
          <span>Brak transakcji...</span>
        </div>
      )}
    </div>
  );
}

function MonthData({ data }) {
  return (
    <span
      className={`w-1/4 ${data < 0 && "text-red-600"} ${
        data === 0 && "text-white"
      } ${data > 0 && "text-green-400"}`}
    >
      {data.toFixed(2)}
    </span>
  );
}

function SummaryLabel({ icon }) {
  return (
    <span className="flex w-full justify-between">
      <i className={`${icon} text-2xl`}></i>
    </span>
  );
}
