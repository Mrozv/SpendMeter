import { useState } from "react";

export default function Sidebar({
  onTabChange,
  selectedTab,
  onMonthChange,
  selectedMonth,
}) {
  const [displayMenu, setDisplayMenu] = useState(true);

  function handleDisplayMenu() {
    setDisplayMenu((prevState) => !prevState);
  }

  return (
    <>
      <button
        className={`fixed left-0 top-0 p-4 z-50`}
        onClick={() => handleDisplayMenu()}
      >
        <i className="fa-solid fa-bars text-xl"></i>
      </button>
      <aside
        className={`absolute flex flex-col items-center gap-12 py-12 h-screen border-r border-[#3d444d40] transform transition-transform duration-300 max-sm:w-full max-sm:fixed max-xl:top-0 min-w-[300px] z-40 ${
          displayMenu ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="w-fit flex flex-col items-center">
          <img className="w-[100px]" src="src\assets\moneyLogo.png" alt="" />
          <span className="w-fit text-4xl text-orange-300">SpendMeter</span>
        </div>
        <ul className="flex flex-col w-fit gap-2 menu-links-list">
          <li className="w-full">
            <input
              id="month-select"
              type="month"
              value={selectedMonth.toISOString().slice(0, 7)}
              onChange={onMonthChange}
              className="bg-[#1D222A] text-white p-2 rounded-md w-full"
            />
          </li>
          <NavItem
            onTabChange={onTabChange}
            selectedTab={selectedTab}
            tab={"Panel"}
            name={"Panel"}
            icon="fa-solid fa-table-list"
          ></NavItem>
          <NavItem
            onTabChange={onTabChange}
            selectedTab={selectedTab}
            tab={"Transactions"}
            name={"Transakcje"}
            icon="fa-solid fa-arrow-right-arrow-left"
          ></NavItem>
          <NavItem
            onTabChange={onTabChange}
            selectedTab={selectedTab}
            tab={"Categories"}
            name={"Kategorie"}
            icon="fa-solid fa-icons"
          ></NavItem>
        </ul>
      </aside>
    </>
  );
}

export function NavItem({ name, tab, onTabChange, selectedTab, icon }) {
  const styles =
    "flex items-center gap-2 text-2xl px-6 py-2 w-full text-left rounded";
  return (
    <li>
      <button
        className={
          selectedTab === tab
            ? `active-menu-link ${styles}`
            : `text-gray-400 ${styles}`
        }
        onClick={() => {
          onTabChange(tab);
        }}
      >
        <i className={icon}></i>
        {name}
      </button>
    </li>
  );
}
