import React from "react";

type EventProps = {
  banner_url: string;
  title: string;
  date: string;
  location: string;
};

const EventCard: React.FC<EventProps> = ({
  banner_url,
  title,
  date,
  location,
}) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
      <div className="relative">
        <img
          src={banner_url}
          alt={title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
          {date}
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-1 line-clamp-2">{title}</h3>
        <p className="text-sm text-gray-500 line-clamp-1">{location}</p>
      </div>
    </div>
  );
};

export default EventCard;
