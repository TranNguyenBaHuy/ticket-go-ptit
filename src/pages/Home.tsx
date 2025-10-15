// import { events } from "../constants/mocks/mockEventData";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { responsive } from "../components/Base/ResponsiveBase/Carousel";
import EventSection from "../components/Layouts/Client/EventSection";
import CarouselItem from "../components/Layouts/Client/CarouselItem";
import { useEffect, useState } from "react";
import type { Event } from "../constants/types/types";

const Home = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const getData = async () => {
      const url = `http://localhost:9092/api/events?page=${currentPage}`;
      try {
        const response = await fetch(url);
        if (!response.ok)
          throw new Error(`Response status: ${response.status}`);

        const result = await response.json();
        console.log("result", result);
        console.log("events result", result.events);
        console.log("total pages result", result.totalPages);

        // Gán dữ liệu
        setEvents(result.events || []);
        setTotalPages(result.totalPages || 1);
      } catch (error) {
        console.error("Lỗi khi fetch sự kiện:", error);
      }
    };

    getData();
  }, [currentPage]);

  return (
    <div className="py-8 w-full mx-auto bg-[#27272A]">
      <div className="mx-40">
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

        {/* UPCOMING SECTION */}
        <EventSection title="Sắp diễn ra" data={events} />

        {/* FOR YOU SECTION */}
        <EventSection title="Dành cho bạn" data={events} />

        {/* ANOTHER SECTION */}
        <EventSection title="Sự kiện nổi bật" data={events} />
      </div>

      {/* PAGINATION */}
      <div className="flex justify-center mt-8 space-x-2">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded ${
            currentPage === 1 ? "bg-gray-500" : "bg-blue-600 hover:bg-blue-700"
          } text-white`}
        >
          Trước
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === i + 1
                ? "bg-yellow-500 text-black font-bold"
                : "bg-gray-700 text-white"
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded ${
            currentPage === totalPages
              ? "bg-gray-500"
              : "bg-blue-600 hover:bg-blue-700"
          } text-white`}
        >
          Sau
        </button>
      </div>
    </div>
  );
};

export default Home;
