import { useState } from "react";

export default function Transactions({ onTabChange, onCategoriesChange }) {
  const [icon, setIcon] = useState();
  const [title, setTitle] = useState();
  const [menuDisplay, setMenuDisplay] = useState(false);

  function handleDisplayMenu() {
    setMenuDisplay((prevState) => !prevState);
  }

  function handleDataSend() {
    onCategoriesChange(`${icon} ${title}`);
  }

  function handleTitleChange(event) {
    setTitle(event.target.value);
  }

  function handleIconChange(event) {
    setIcon(event.target.textContent);
  }

  const availableIcons = [
    "🍔",
    "⛽",
    "👕",
    "🛒",
    "☕",
    "🎬",
    "💻",
    "📚",
    "💡",
    "🎮",
    "✈️",
    "🚌",
    "🏠",
    "🚗",
    "💈",
    "🍕",
    "🎁",
    "⚽",
    "📱",
    "💊",
    "💰",
    "📈",
    "💵",
    "💸",
    "🏆",
    "🎁",
    "💳",
    "💼",
    "🤑",
    "🎉",
    "💲",
    "🏅",
    "🎓",
    "📥",
    "🪙",
    "💎",
    "🏦",
    "⚖️",
    "🔑",
    "📜",
    "🛏️",
    "📦",
    "💼",
    "🛠️",
    "🍇",
    "🍿",
    "🎨",
    "🧳",
    "🛌",
    "🎈",
    "📺",
    "🎵",
    "🍹",
    "🍱",
    "📷",
    "📊",
    "🎂",
    "📅",
    "🖨️",
    "🚿",
    "📞",
    "🧼",
    "💼",
    "💉",
    "🎭",
    "📱",
    "🎯",
    "🚿",
    "🚴",
    "📂",
    "🚜",
    "🎒",
    "🧯",
    "🔨",
    "🎮",
    "🚶",
    "🖌️",
    "🏋️",
    "🏃",
    "🧹",
    "🧼",
    "🪑",
    "🧵",
    "🧥",
    "💡",
  ];
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="p-3 rounded min-w-[500px] w-[60%] max-h-[60%] flex flex-col bg-[#11151C] gap-4 relative">
        <div className="flex justify-between gap-12 w-full">
          <span className="text-xl">Dodaj kategorię</span>
          <button
            className="bg-green-700 hover:bg-green-600 px-6 py-1 rounded"
            onClick={() => {
              onTabChange("Categories");
              handleDataSend();
            }}
          >
            Dodaj
          </button>
        </div>
        <input
          onChange={(event) => {
            handleTitleChange(event);
          }}
          type="text"
          className="bg-[#1D222A] p-4 rounded"
        />
        <div id="dropDown">
          <button
            onClick={handleDisplayMenu}
            className="bg-[#1D222A] p-4 rounded w-full text-left"
          >
            {icon ? icon : "Wybierz ikonę..."}
          </button>
          <div
            id="dropDownContent"
            className={`flex flex-wrap gap-2 absolute left-0 mt-4 max-h-[100%] p-3 rounded bg-[#11151C] overflow-auto ${
              menuDisplay ? "block" : "hidden"
            }`}
          >
            {availableIcons.map((category) => {
              return (
                <button
                  key={Math.random()}
                  className="bg-[#1D222A] text-3xl rounded p-2"
                  onClick={(e) => {
                    handleIconChange(e);
                    handleDisplayMenu();
                  }}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
