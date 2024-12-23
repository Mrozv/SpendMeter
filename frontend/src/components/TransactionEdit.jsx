import { useState } from "react";
import { TableData } from "./Transactions";

export default function TransactionEdit({
  categories,
  category,
  date,
  amount,
  onEditMenu,
  onTransactionEdit,
  id,
}) {
  const [newCategory, setNewCategory] = useState(category);
  const [newDate, setNewDate] = useState(date);
  const [newAmount, setNewAmount] = useState(amount);

  function handleSetNewCategory(element) {
    setNewCategory(element.target.value);
  }

  function handleSetNewDate(element) {
    setNewDate(element.target.value);
  }

  function handleSetNewAmount(element) {
    setNewAmount(element.target.value);
  }

  function updateTransaction() {
    onTransactionEdit(id, {
      id: id,
      category: newCategory,
      date: newDate,
      amount: newAmount,
    });
  }

  return (
    <>
      <TableData>
        <select
          className="bg-[#1D222A]  appearance-none w-full"
          value={newCategory}
          onChange={handleSetNewCategory}
        >
          {categories.map((category) => {
            return (
              <option key={category} className="bg-[#1D222A] text-xl rounded">
                {category}
              </option>
            );
          })}
        </select>
      </TableData>
      <TableData>
        <input
          className="bg-[#1D222A] text-white w-full"
          type="date"
          onChange={handleSetNewDate}
          value={newDate}
        />
      </TableData>
      <TableData>
        <input
          className="bg-[#1D222A] w-full"
          type="number"
          onChange={handleSetNewAmount}
          placeholder={newAmount}
        />
      </TableData>
      <TableData>
        <button
          className="hover:text-green-500  mr-2"
          onClick={() => {
            updateTransaction();
            onEditMenu();
          }}
        >
          <i className="fa-solid fa-check"></i>
        </button>
        <button className="hover:text-red-500" onClick={onEditMenu}>
          <i className="fa-solid fa-cancel"></i>
        </button>
      </TableData>
    </>
  );
}
