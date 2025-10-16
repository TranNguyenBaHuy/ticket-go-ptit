import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { events } from "../../../../../constants/mocks/mockEventData";
import type { Event } from "../../../../../constants/types/types";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Event[]>([]);
  const [showResults, setShowResults] = useState(false);
  // const [visibleCount, setVisibleCount] = useState(5);
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      // setVisibleCount(5);
      return;
    }

    const timer = setTimeout(() => {
      const filtered = events.filter((e) =>
        e.title.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
      setShowResults(true);
      // setVisibleCount(5);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // const handleLoadMore = () => {
  //   setVisibleCount((prev) => prev + 5);
  // };

  // const visibleResults = results.slice(0, visibleCount);

  const handleNavigateEvent = (eventId: string) => {
    navigate(`/events/${eventId}`);
  };

  return (
    <div className="relative flex items-center py-0.5 bg-white rounded-md">
      {/* search icon */}
      <button className="py-2.5 px-4 h-full">
        <Search size={22} className="text-[#828BA0]" />
      </button>

      {/* search input */}
      <input
        type="text"
        placeholder="Bạn tìm gì hôm nay?"
        className="items-center text-md bg-white py-3 h-full rounded-md w-[16rem] focus:outline-none"
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setShowResults(true)}
        onBlur={() => setShowResults(false)}
        value={query}
      />

      {/* search button */}
      <button
        className="items-center border-l border-[#E6EBF5] px-3.5 text-[#2A2D34]"
        onClick={() => {
          setQuery("");
          setShowResults(false);
        }}
      >
        Tìm kiếm
      </button>

      {/* results dropdown */}
      {showResults && results.length > 0 && (
        <div className="absolute top-full left-0 mt-1 w-full bg-white shadow-lg rounded-md overflow-y-auto z-50 max-h-80">
          {/* {visibleResults.map((result) => ( */}
          {results.map((result) => (
            <div
              key={result.id}
              onMouseDown={() => {
                setQuery("");
                setShowResults(false);
                handleNavigateEvent(String(result.id));
              }}
            >
              <div className="px-4 py-3 hover:bg-gray-200 cursor-pointer text-sm">
                <div className="font-semibold">{result.title}</div>
                <div className="text-gray-500 text-xs">{result.location}</div>
              </div>
            </div>
          ))}

          {/* load more */}
          {/* {visibleCount < results.length && (
            <div className="text-center py-2 border-t">
              <button
                onMouseDown={handleLoadMore}
                className="text-[#2dc275] text-sm font-semibold hover:underline"
              >
                Xem thêm
              </button>
            </div>
          )} */}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
