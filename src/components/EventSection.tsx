import { Link } from "react-router-dom";
import EventCard from "./EventCard";
import { getDisplayPrice } from "../utils/getDisplayPrice";
import type { Event } from "../constants/types/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
interface EventSectionProps {
  title: string;
  data: Event[];
}

const EventSection = ({ title, data }: EventSectionProps) => {
  return (
    <div className="mt-6 ">
      <div className="flex flex-row justify-between items-center">
        <div className="text-2xl text-white font-bold mb-6">{title}</div>
        <Link
          to="/all-events"
          className="flex items-center text-white hover:text-[#2dc275] transition-colors duration-300"
        >
          <p>Xem thêm</p>
          <FontAwesomeIcon icon={faCaretRight} />
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {data.slice(0, 4).map((event) => {
          return (
            <EventCard event={event} price={getDisplayPrice(event.tickets)} />
          );
        })}
      </div>
    </div>
  );
};

export default EventSection;
