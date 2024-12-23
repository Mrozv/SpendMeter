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
      <div className="overflow-y-auto h-full rounded">
        {rawTransactions.length > 0 ? (
          <table className="text-left w-full table-fixed">
            <thead className="sticky top-0">
              <tr className="bg-[#1D222A]">
                <th className="p-4">Miesiąc</th>
                <th className="p-4">Całkowite</th>
                <th className="p-4">Dochody</th>
                <th className="p-4">Wydatki</th>
              </tr>
            </thead>
            <tbody className="[&>*:nth-child(odd)]:bg-[#11151C]">
              {countMonthSummary().map((month) => (
                <tr key={Math.random()} className="bg-[#1d222a62]">
                  <td className="p-4">{month.month}</td>
                  <td className="p-4">{`${month.total} zł`}</td>
                  <td
                    className={`p-4 ${
                      month.positive === 0 ? "text-white" : "text-green-400"
                    }`}
                  >{`${month.positive} zł`}</td>
                  <td
                    className={`p-4 ${
                      month.negative === 0 ? "text-white" : "text-red-600"
                    }`}
                  >{`${month.negative} zł`}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="w-full h-full flex justify-center items-center">
            <span>Brak transakcji...</span>
          </div>
        )}
      </div>
    </div>
  );
}
