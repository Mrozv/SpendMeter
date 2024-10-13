import Sidebar from "./components/Sidebar";
import Transactions from "./components/Transactions";
import Panel from "./components/Panel";
import AddTransaction from "./components/AddTransaction";
import Categories from "./components/Categories";
import AddCategory from "./components/AddCategory";
import { useState, useEffect } from "react";

function App() {
  const [transactions, setTransactions] = useState(handleGetTransFromLS);
  const [categories, setCategories] = useState(
    handleGetCatFromLS().length === 0
      ? handleGetCatFromLS()
      : [
          "🍔 Żywność",
          "🎯 Rozrywka",
          "🧵 Ubrania",
          "🩺 Opieka zdrowotna",
          "🎓 Edukacja",
          "💰 Wypłata",
          "💲 Zysk",
          "🪄 Strata",
        ]
  );
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [selectedTab, setSelectedTab] = useState("Panel");

  function handleTransactionEdit(id, updatedTransaction) {
    setTransactions((prevState) =>
      prevState.map((transaction) =>
        transaction.id === id ? updatedTransaction : transaction
      )
    );
  }

  function handleCategoriesUpdate(newCategory) {
    setCategories((prevState) => [...prevState, newCategory]);
  }

  function handleCategoryDelete(categoryToDelete) {
    setCategories((prevState) =>
      prevState.filter((category) => category !== categoryToDelete)
    );
  }

  function handleMonthChange(month) {
    setSelectedMonth(new Date(month.target.value));
  }

  function filterTransactionsByMonth() {
    return transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.date);
      return (
        transactionDate.getMonth() === selectedMonth.getMonth() &&
        transactionDate.getFullYear() === selectedMonth.getFullYear()
      );
    });
  }

  function handleCountSummaryData() {
    let total = 0;
    let positive = 0;
    let negative = 0;

    filterTransactionsByMonth().forEach((transaction) => {
      const { amount } = transaction;
      total += parseFloat(amount);
      if (amount > 0) {
        positive += parseFloat(amount);
      } else {
        negative += parseFloat(amount);
      }
    });
    return {
      total,
      positive,
      negative,
    };
  }

  function handleGetTransFromLS() {
    try {
      const fetchedTransactions = localStorage.getItem("transactions");
      return fetchedTransactions ? JSON.parse(fetchedTransactions) : [];
    } catch (error) {
      console.error("Failed to fetch transactions from local storage", error);
    }
  }

  function handleGetCatFromLS() {
    try {
      const fetchedCategories = localStorage.getItem("categories");
      return fetchedCategories ? JSON.parse(fetchedCategories) : [];
    } catch (error) {
      console.error("Failed to fetch categories from local storage", error);
    }
  }

  useEffect(() => {
    try {
      localStorage.setItem("transactions", JSON.stringify(transactions));
      localStorage.setItem("categories", JSON.stringify(categories));
    } catch (error) {
      console.error("Failed to save data to local storage", error);
    }
  }, [transactions, categories]);

  function handleTabChange(tab) {
    setSelectedTab(tab);
  }

  function handleAddTransaction(newTransaction) {
    setTransactions((prevState) => {
      const updatedTransactions = [newTransaction, ...prevState].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      return updatedTransactions;
    });
  }

  function handleDeleteTransaction(id) {
    setTransactions((prevState) =>
      prevState.filter((transaction) => transaction.id !== id)
    );
  }

  return (
    <div className="flex">
      <Sidebar
        selectedTab={selectedTab}
        onTabChange={handleTabChange}
        onMonthChange={handleMonthChange}
        selectedMonth={selectedMonth}
      ></Sidebar>
      {selectedTab === "Panel" && (
        <Panel
          onCountSummaryData={handleCountSummaryData}
          transactions={filterTransactionsByMonth()}
          rawTransactions={transactions}
          categories={categories}
        />
      )}
      {selectedTab === "Transactions" && (
        <Transactions
          onDeleteTransaction={handleDeleteTransaction}
          transactions={filterTransactionsByMonth()}
          onTabChange={handleTabChange}
          categories={categories}
          onTransactionEdit={handleTransactionEdit}
        />
      )}
      {selectedTab === "AddTransaction" && (
        <AddTransaction
          onTabChange={handleTabChange}
          onAddTransaction={handleAddTransaction}
          categories={categories}
        />
      )}
      {selectedTab === "Categories" && (
        <Categories
          onTabChange={handleTabChange}
          onAddTransaction={handleAddTransaction}
          categories={categories}
          onCategoryDelete={handleCategoryDelete}
        />
      )}
      {selectedTab === "AddCategory" && (
        <AddCategory
          onTabChange={handleTabChange}
          categories={categories}
          onCategoriesChange={handleCategoriesUpdate}
        />
      )}
    </div>
  );
}

export default App;
