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
  price,
}) => {
  return (
    <Link to={`/events/${event_id}`}>
      <div className="max-w-3xl bg-transparent rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-500 h-full flex flex-col">
        <div className="relative">
          <img
            src={banner_url}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-2 flex flex-col justify-between flex-grow">
          <h3 className="text-md font-semibold mb-2 text-white line-clamp-2 min-h-[3rem]">
            {title}
          </h3>
          <p className="text-md text-[#2dc275] text-1xl mb-2 font-semibold line-clamp-1">
            Từ {price?.toLocaleString("de-DE")} đ
          </p>
          <p className="text-sm text-white line-clamp-1">
            <FontAwesomeIcon icon={faCalendar} /> {date}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
