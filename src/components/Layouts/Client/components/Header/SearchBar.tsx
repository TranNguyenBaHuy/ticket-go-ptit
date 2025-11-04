import { Search } from "lucide-react";
import { useState } from "react";

const SearchBar = () => {
  const [query, setQuery] = useState("");

  return (
    <div className="relative flex items-center py-0.5 bg-white rounded-md w-full max-w-[16rem] sm:max-w-[18rem] md:max-w-[20rem] lg:max-w-[22rem] xl:max-w-[24rem]">
      {/* search icon */}
      <button className="py-2.5 px-4 h-full">
        <Search size={22} className="text-[#828BA0]" />
      </button>

      {/* search input */}
      <input
        type="text"
        placeholder="Bạn tìm gì hôm nay?"
        className="items-center text-md bg-white py-3 h-full rounded-md flex-1 focus:outline-none text-sm sm:text-base min-w-0"
        onChange={(e) => setQuery(e.target.value)}
        value={query}
      />

      {/* search button */}
      <button
        className="hidden lg:flex items-center border-l border-[#E6EBF5] px-3.5 text-[#2A2D34] text-sm sm:text-base flex-shrink-0"
        onClick={() => {
          setQuery("");
        }}
      >
        Tìm kiếm
      </button>
    </div>
  );
};

export default SearchBar;
