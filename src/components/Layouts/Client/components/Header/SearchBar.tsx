import { Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/search?search=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="relative flex items-center py-0.5 bg-white rounded-md w-full max-w-[16rem] sm:max-w-[18rem] md:max-w-[20rem] lg:max-w-[22rem] xl:max-w-[24rem]">
      {/* search icon */}
      <button onClick={handleSearch} className="py-2.5 px-4 h-full">
        <Search size={22} className="text-[#828BA0]" />
      </button>

      {/* search input */}
      <input
        type="text"
        placeholder="Bạn tìm gì hôm nay?"
        className="items-center text-md bg-white py-3 h-full rounded-md flex-1 focus:outline-none text-sm sm:text-base min-w-0"
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        value={query}
      />

      {/* search button */}
      <button onClick={handleSearch} className="hidden lg:flex items-center border-l border-[#E6EBF5] px-3.5 text-[#2A2D34] text-sm sm:text-base flex-shrink-0">
        Tìm kiếm
      </button>
    </div>
  );
};

export default SearchBar;
