import { useRef } from "react";

export default function AddTransaction({
  onAddTransaction,
  onTabChange,
  categories,
}) {
  const categoryRef = useRef(null);
  const dateRef = useRef(null);
  const amountRef = useRef(null);
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="p-3 rounded min-w-[500px] w-[60%] max-h-[60%] flex flex-col bg-[#11151C] gap-4 relative border border-[#3d444d40]">
        <div className="flex justify-between gap-12 w-full">
          <span className="text-xl">Dodaj transakcję</span>
          <button onClick={()=>onTabChange("Transactions")} className="flex items-center"><i className="fa-solid fa-circle-xmark h-fit text-xl hover:text-red-500"></i></button>
        </div>
        <form
          className="flex flex-col gap-6"
          onSubmit={() => {
            onAddTransaction({
              amount: amountRef.current.value,
              category: categoryRef.current.value,
              date: dateRef.current.value,
              id: Math.random(),
            });
            onTabChange("Transactions");
          }}
        >
          <div className="flex flex-col gap-1">
            <label>Kategoria</label>
            <select
              ref={categoryRef}
              className="bg-[#1D222A] p-4 rounded appearance-none"
            >
              {categories.map((category) => {
                return (
                  <option key={category} className="bg-[#1D222A]">
                    {category}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label>Data</label>
            <input
              ref={dateRef}
              className="bg-[#1D222A] p-4 rounded"
              type="date"
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label>Kwota</label>
            <input
              ref={amountRef}
              className="bg-[#1D222A] p-4 rounded"
              type="number"
              step="0.01"
              required
            />
          </div>
          <button
            className="bg-green-700 hover:bg-green-600 px-6 py-1 rounded w-fit"
            type="submit"
          >
            Dodaj
          </button>
        </form>
      </div>
    </div>
  );
}
