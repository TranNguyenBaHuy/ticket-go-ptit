// import { events } from "../constants/mocks/mockEventData";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { responsive } from "../components/Base/ResponsiveBase/Carousel";
import EventSection from "../components/Layouts/Client/EventSection";
import CarouselItem from "../components/Layouts/Client/CarouselItem";
import { useEffect, useState } from "react";
import type { Event } from "../constants/types/types";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../components/ui/pagination";

import { categories } from "@/constants/data/categories";
import CategoryFilterBar from "@/components/Layouts/Client/CategoryFilterBar";

const Home = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const url = `http://localhost:9092/api/events?page=${currentPage}`;
      try {
        const response = await fetch(url);
        if (!response.ok)
          throw new Error(`Response status: ${response.status}`);

        const result = await response.json();
        setEvents(result.events || []);
        setTotalPages(result.totalPages || 1);
      } catch (e) {
        console.error("Lỗi khi fetch sự kiện:", e);
      }
    };

    fetchData();
  }, [currentPage]);

  return (
    <div className="w-full mx-auto bg-[#27272A]">
      {/* category filter */}
      <CategoryFilterBar data={categories} />

      {/* body */}
      <div className="mx-5 lg:mx-auto max-w-[1250px] py-8">
        {/*   CAROUSEL SECTION*/}
        <div className="mx-auto mb-8">
          <Carousel
            swipeable
            draggable
            showDots={false}
            responsive={responsive}
            ssr={true}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={8000}
            keyBoardControl={true}
            customTransition="transform 500ms"
            transitionDuration={500}
            containerClass="flex carousel-container"
            removeArrowOnDeviceType={["tablet", "mobile"]}
            partialVisible={false}
          >
            {events.map((event) => {
              return <CarouselItem key={event.id} data={event} />;
            })}
          </Carousel>
        </div>

        {categories.map((cat) => (
          <EventSection
            key={cat.id}
            title={cat.label}
            data={events}
            catId={cat.id === undefined ? "upcoming" : cat.id}
          />
        ))}
      </div>

      {/* shadcn PAGINATION  */}
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
    </div>
  );
};

export default Home;
