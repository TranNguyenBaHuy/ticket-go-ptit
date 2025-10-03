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
          className="flex items-center gap-2 text-[#A6A6B0] hover:text-[#2dc275] transition-colors duration-300"
        >
          <p>Xem thêm</p>
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="currentColor"
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M4.529 2.529c.26-.26.682-.26.942 0l4 4c.26.26.26.682 0 .942l-4 4a.667.667 0 01-.942-.942L8.057 7 4.53 3.471a.667.667 0 010-.942z"
            ></path>
          </svg>
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
