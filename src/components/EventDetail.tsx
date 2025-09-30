import { useParams } from "react-router-dom";
import { events } from "../constants/mocks/mockEventData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faLocationDot } from "@fortawesome/free-solid-svg-icons";

const EventDetail = () => {
  const { id } = useParams();
  const event = events.find((e) => e.event_id === id);

  if (!event) return <p className="text-center py-8">Sự kiện không tồn tại!</p>;

  return (
    <div className="w-full py-6 bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row rounded-lg overflow-hidden shadow-lg">
        {/* Left side: Info */}
        <div className="md:w-1/2 p-6 flex flex-col justify-between bg-[#38383d]">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-4">
              {event.title}
            </h1>
            <div className="flex items-center mb-2 text-green-400">
              <FontAwesomeIcon icon={faCalendar} />
              {event.start_date} | {event.duration}
            </div>
            <div className="flex items-center mb-4 text-green-400">
              <FontAwesomeIcon icon={faLocationDot} />
              {event.location}
            </div>
            <p className="mb-4 text-gray-300">{event.description}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Vé</h2>
            <ul>
              {event.tickets.map((ticket) => (
                <li key={ticket.ticket_id} className="mb-2 text-gray-200">
                  {ticket.type} - {ticket.price.toLocaleString()} VND (
                  {ticket.quantity} vé)
                </li>
              ))}
            </ul>
            <button className="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
              Mua vé ngay
            </button>
          </div>
        </div>

        {/* Right side: Banner */}
        <div className="md:w-1/2">
          <img
            src={event.banner_url}
            alt={event.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
