import React from "react";
import { Link } from "react-router-dom";
import type { Event } from "../constants/types/types";
import { Calendar } from "lucide-react";

type EventProps = {
  event: Event;
  price: number | null;
};

const EventCard: React.FC<EventProps> = ({ event, price }) => {
  return (
    <Link to={`/events/${event.event_id}`}>
      <div className="max-w-xl bg-transparent rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-500 h-full flex flex-col">
        <div className="overflow-hidden rounded-xl mb-3">
          <img
            src={event.banner_url}
            alt={event.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-2 flex flex-col justify-between flex-grow">
          <h3 className="text-md font-semibold mb-2 text-white line-clamp-2 min-h-[3rem]">
            {event.title}
          </h3>
          <p className="text-[#2dc275] text-md mb-2 font-semibold line-clamp-1">
            Từ {price?.toLocaleString("de-DE")}đ
          </p>
          <p className="flex items-center gap-2 text-md text-white line-clamp-1">
            {/* <FontAwesomeIcon icon={faCalendar} />  */}
            <Calendar size={14} /> {event.start_date}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
