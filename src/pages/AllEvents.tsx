import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import type { Event } from "@/constants/types/types";
import EventCard from "@/components/Layouts/Client/EventCard";
import { getDisplayPrice } from "@/utils/getDisplayPrice";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import CategoryFilterBar from "@/components/Layouts/Client/CategoryFilterBar";
import { categories } from "@/constants/data/categories";

const AllEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const categoryName = searchParams.get("category");
  const searchQuery = searchParams.get("search");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      let url = `/api/events?page=${currentPage}&limit=20`;
      if (searchQuery) {
        url += `&search=${encodeURIComponent(searchQuery)}`;
      }
      if (categoryName) {
        url += `&category=${encodeURIComponent(categoryName)}`;
      }

      try {
        const response = await fetch(url);
        if (!response.ok)
          throw new Error(`Response status: ${response.status}`);

        const result = await response.json();
        setEvents(result.events || []);
        setTotalPages(result.totalPages || 1);
      } catch (e) {
        console.error("Lỗi khi fetch sự kiện:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [categoryName, searchQuery, currentPage]);

  return (
    <>
      <CategoryFilterBar data={categories} />
      <div className="min-h-screen bg-[#000]">
        <div className="mx-5 lg:mx-auto max-w-[1250px]">
          {/* header */}
          <div className="text-white container py-6">
            <p className="text-[#2dc275] font-semibold">Kết quả tìm kiếm:</p>
          </div>
          {/* seach results section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {loading
              ? Array.from({ length: 8 }).map((_, index) => (
                  <div
                    key={index}
                    className="bg-[#3f3f46] rounded-xl aspect-[16/9] animate-pulse"
                  ></div>
                ))
              : events.map((event, index) => (
                  <EventCard
                    key={event.id ?? index}
                    event={event}
                    price={getDisplayPrice(event.ticketTypes)}
                  />
                ))}
          </div>
        </div>

        {/* shadcn PAGINATION  */}
        {totalPages > 1 && (
          <div className="flex justify-center py-8">
            <Pagination>
              <PaginationContent className="text-white">
                {/* prev btn */}
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    className={`${
                      currentPage === 1
                        ? "opacity-40 pointer-events-none"
                        : "hover:bg-blue-600 hover:text-white"
                    } bg-[#3f3f46] text-white border border-gray-600`}
                  />
                </PaginationItem>

                {/* page nums */}
                {Array.from({ length: totalPages }, (_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink
                      href="#"
                      isActive={currentPage === i + 1}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`${
                        currentPage === i + 1
                          ? "bg-blue-500 text-white border-blue-500"
                          : "bg-[#3f3f46] text-gray-300 hover:bg-blue-600 hover:text-white border border-gray-600"
                      }`}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                {/* next btn */}
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={() =>
                      setCurrentPage((p) => Math.min(p + 1, totalPages))
                    }
                    className={`${
                      currentPage === totalPages
                        ? "opacity-40 pointer-events-none"
                        : "hover:bg-blue-600 hover:text-white"
                    } bg-[#3f3f46] text-white border border-gray-600`}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </>
  );
};

export default AllEvents;
