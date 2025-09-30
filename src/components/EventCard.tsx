import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

type EventProps = {
  banner_url: string;
  title: string;
  date: string;
  location: string;
  price: number | null;
  event_id: string;
};

const EventCard: React.FC<EventProps> = ({
  event_id,
  banner_url,
  title,
  date,
  location,
  price,
}) => {
  return (
    <Link to={`/events/${event_id}`}>
      <div className="max-w-3xl bg-transparent rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-500">
        <div className="relative">
          <img
            src={banner_url}
            alt={title}
            className="w-full h-50 object-cover"
          />
          <div className="absolute bottom-2 left-2 bg-black text-white text-xs px-2 py-1 rounded">
            {date}
          </div>
        </div>
        <div className="p-2.5">
          <h3 className="text-md font-semibold text-white mb-2 line-clamp-2 min-h-3.5">
            {title}
          </h3>
          <p className="text-md text-[#2dc275] text-1xl mb-2 font-semibold line-clamp-1">
            Từ {price?.toLocaleString("de-DE")} đ
          </p>
          <p className="text-sm text-white line-clamp-1">
            <FontAwesomeIcon icon={faCalendar} /> {location}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
