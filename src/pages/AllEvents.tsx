import { useEffect, useState } from "react";
import type { Event } from "@/constants/types/types";
import EventCard from "@/components/Layouts/Client/EventCard";
import { getDisplayPrice } from "@/utils/getDisplayPrice";

const AllEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const url = `http://localhost:9092/api/events`;
      try {
        const response = await fetch(url);
        if (!response.ok)
          throw new Error(`Response status: ${response.status}`);

        const result = await response.json();
        setEvents(result.events || []);
      } catch (e) {
        console.error("Lỗi khi fetch sự kiện:", e);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-[#000]">
      <div className="mx-5 lg:mx-auto max-w-[1250px]">
        {/* header */}
        <div className="text-white container py-6">
          <p className="text-[#2dc275] font-semibold">Kết quả tìm kiếm:</p>
        </div>
        {/* seach results section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {events.map((event, index) => (
            <EventCard
              key={event.id ?? index}
              event={event}
              price={getDisplayPrice(event.ticketTypes)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllEvents;
