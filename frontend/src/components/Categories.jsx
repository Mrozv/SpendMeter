export default function Transactions({
  onTabChange,
  categories,
  onCategoryDelete,
}) {
  return (
    <div className="w-screen h-screen flex justify-center items-center p-12">
    <div className="p-3 rounded w-full h-full flex flex-col bg-[#11151C] gap-4 border border-[#3d444d40]">
      <div className="flex justify-between w-full">
          <span className="text-xl">Kategorie</span>
          <button
            className="bg-green-700 hover:bg-green-600 px-6 py-1 rounded"
            onClick={() => {
              onTabChange("AddCategory");
            }}
          >
            Dodaj
          </button>
        </div>
        <div className="flex w-full flex-wrap gap-4">
          {categories.map((category) => {
            return (
              <div
                key={Math.random()}
                className="bg-[#1D222A] h-12 rounded flex justify-center items-center px-6 relative"
              >
                {category}
                <button
                  onClick={() => {
                    onCategoryDelete(category);
                  }}
                  className="absolute top-0 right-2"
                >
                  <i className="fa-solid fa-xmark text-gray-500 hover:text-red-500"></i>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
