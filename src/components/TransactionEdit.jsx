import { useState } from "react";

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
    <div className="flex">
      <div className="w-[30%]">
        <select
          className="bg-[#1D222A] p-4 w-[90%] rounded-2xl rounded-ss-none appearance-none"
          value={newCategory}
          onChange={handleSetNewCategory}
        >
          {categories.map((category) => {
            return (
              <option
                key={category}
                className="bg-[#1D222A] text-xl rounded p-2"
              >
                {category}
              </option>
            );
          })}
        </select>
      </div>
      <div className="w-[30%]">
        <input
          className="bg-[#1D222A] text-white p-2 rounded-md w-[90%] h-full"
          type="date"
          onChange={handleSetNewDate}
          value={newDate}
        />
      </div>
      <div className={`w-[30%] break-all`}>
        <input
          className="bg-[#1D222A] p-4 rounded-2xl rounded-ss-none w-[90%]"
          type="number"
          onChange={handleSetNewAmount}
          placeholder={newAmount}
        />
      </div>
      <div className="w-[10%] flex items-center justify-center gap-2 mr-4">
        <button
          className="hover:text-green-500 h-fit"
          onClick={() => {
            updateTransaction();
            onEditMenu();
          }}
        >
          <i className="fa-solid fa-check"></i>
        </button>
        <button className="hover:text-red-500 h-fit" onClick={onEditMenu}>
          <i className="fa-solid fa-cancel"></i>
        </button>
      </div>
    </div>
  );
}
