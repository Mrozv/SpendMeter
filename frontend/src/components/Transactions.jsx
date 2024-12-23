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
  const [search, setSearch] = useState('')

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
    <div className="w-screen h-screen flex justify-center items-center p-12">
      <div className="p-3 rounded w-full h-full flex flex-col bg-[#11151C] gap-4 border border-[#3d444d40]">
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
        <form>
          <input className="bg-[#1D222A] p-4 rounded max-md:w-full" onChange={(e)=>setSearch(e.target.value)} type="text" placeholder="Wyszukaj transakcję..." />
        </form>
        <div className="overflow-y-auto relative rounded">
          <table className="text-left w-full table-fixed">
            <thead className="sticky top-0">
              <tr className="bg-[#1D222A]">
                <th className="py-4 px-2">Kategoria</th>
                <th className="py-4 px-2">Data</th>
                <th className="py-4 px-2">Kwota</th>
                <th className="py-4 px-2">Akcja</th>
              </tr>
            </thead>
            <tbody>
              {sortedTransactions.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center p-4">
                    Brak transakcji...
                  </td>
                </tr>
              ) : (
                sortedTransactions.filter((transaction) => search.toLowerCase() === "" ? transaction : transaction.category.toLowerCase().includes(search)).map((transaction) => (
                  <tr
                    key={transaction.id}
                    className={`bg-[#1d222a62] rounded-2xl w-full odd:bg-[#11151C] hover:bg-[#1D222A]`}
                  >
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
                      <>
                        <TableData>{transaction.category}</TableData>
                        <TableData>{transaction.date}</TableData>
                        <TableData
                          amountCheck={true}
                          transaction={transaction}
                        >{`${transaction.amount} zł`}</TableData>
                        <TableData>
                          <button
                            className="hover:text-red-500 mr-2"
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
                        </TableData>
                      </>
                    )}
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

export function TableData({ children, amountCheck, transaction }) {
  return (
    <td
      className={`px-2 py-4 truncate ${
        amountCheck ? getAmountClass(transaction.amount) : ""
      }`}
    >
      {children}
    </td>
  );
}

function getAmountClass(amount) {
  if (amount < 0) return "text-red-600";
  if (amount > 0) return "text-green-400";
  return "text-white";
}
