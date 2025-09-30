import { useParams } from "react-router-dom";
import { events } from "../constants/mocks/mockEventData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faLocationDot } from "@fortawesome/free-solid-svg-icons";

const EventDetail = () => {
  const { id } = useParams();
  const event = events.find((e) => e.event_id === id);

  if (!event) return <p className="text-center py-8">Sự kiện không tồn tại!</p>;

  return (
    <>
      <div className="w-full py-6 bg-gray-900 text-white">
        {/* TICKET INFO SECTION */}
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row rounded-lg overflow-hidden shadow-lg">
          {/* Left side: Info */}
          <div className="md:w-1/3 p-6 flex flex-col justify-between bg-[#38383d]">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-4">
                {event.title}
              </h1>
              <div className="flex items-center mb-2 gap-1.5 text-[#2dc275] ">
                <FontAwesomeIcon icon={faCalendar} className="text-white" />
                <p className="font-semibold">
                  {event.duration}, {event.start_date}
                </p>
              </div>
              <div className="flex items-center mb-4 gap-1.5 text-[#2dc275] ">
                <FontAwesomeIcon icon={faLocationDot} className="text-white" />
                <p className="font-semibold">{event.location}</p>
              </div>
            </div>

            <div>
              <ul>
                {event.tickets.map((ticket) => (
                  <li
                    key={ticket.ticket_id}
                    className="mb-2 text-gray-200 flex flex-row gap-1.5 items-center font-bold"
                  >
                    Giá từ{" "}
                    <p className="text-[#2dc275] text-2xl">
                      {ticket.price.toLocaleString()} đ
                    </p>
                  </li>
                ))}
              </ul>
              <button className="w-full mt-2 bg-[#2dc275] hover:bg-green-600 text-white font-bold py-2 px-2.5 rounded">
                Mua vé ngay
              </button>
            </div>
          </div>

          {/* Right side: Banner */}
          <div className="md:w-2/3">
            <img
              src={event.banner_url}
              alt={event.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
      {/* TICKET DETAILS SECTION */}
      <div className="w-full py-6 bg-white text-white">
        <div className="max-w-6xl mx-auto flex flex-col  rounded-lg overflow-hidden shadow-lg">
          <div className="p-3 flex flex-col gap-6">
            <h1 className="text-black text-2xl font-bold">Giới thiệu</h1>
            <div className="mb-4 text-sm text-black">
              {event.description.split("\n").map((line, index) => (
                <p key={index} className="mb-2">
                  {line}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventDetail;
