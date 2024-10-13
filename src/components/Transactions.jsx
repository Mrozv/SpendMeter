import { useState } from "react";
import TransactionEdit from "./TransactionEdit";

export default function Transactions({
  onTabChange,
  transactions,
  onDeleteTransaction,
  categories,
  onTransactionEdit,
}) {
  const [editMode, setEditMode] = useState(false);
  const [indexToEdit, setIndexToEdit] = useState();

  function handleEditMode() {
    setEditMode((prevState) => !prevState);
  }

  function handleIndexSelect(index) {
    setIndexToEdit(index);
  }

  const sortedTransactions = transactions.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="p-3 rounded min-w-[500px] w-[60%] max-h-[60%] flex flex-col bg-[#11151C] gap-4">
        <div className="flex justify-between w-full">
          <span className="text-xl">Ostatnie transakcje</span>
          <button
            className="bg-green-700 hover:bg-green-600 px-6 py-1 rounded"
            onClick={() => {
              onTabChange("AddTransaction");
            }}
          >
            Dodaj
          </button>
        </div>
        <div className="overflow-y-auto relative rounded">
          <table className="w-full text-left">
            <thead className="sticky top-0">
              <tr className="bg-[#1D222A]">
                <th className="p-4">Kategoria</th>
                <th className="p-4">Data</th>
                <th className="p-4">Kwota</th>
                <th className="p-4">Akcja</th>
              </tr>
            </thead>
            <tbody className="[&>*:nth-child(odd)]:bg-[#11151C]">
              {sortedTransactions.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center p-4">
                    Brak transakcji...
                  </td>
                </tr>
              ) : (
                sortedTransactions.map((transaction) => (
                  <tr
                    key={transaction.id}
                    className="bg-[#1d222a62] rounded-2xl"
                  >
                    <td className="p-4">
                      {editMode && indexToEdit === transaction.id ? (
                        <TransactionEdit
                          id={transaction.id}
                          date={transaction.date}
                          category={transaction.category}
                          amount={transaction.amount}
                          onEditMenu={handleEditMode}
                          categories={categories}
                          onTransactionEdit={onTransactionEdit}
                        />
                      ) : (
                        <div>{transaction.category}</div>
                      )}
                    </td>
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
                    <td className="p-4 flex gap-2">
                      <button
                        className="hover:text-red-500"
                        onClick={() => onDeleteTransaction(transaction.id)}
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                      <button
                        className="hover:text-gray-500"
                        onClick={() => {
                          handleIndexSelect(transaction.id);
                          handleEditMode();
                        }}
                      >
                        <i className="fa-solid fa-pen"></i>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
