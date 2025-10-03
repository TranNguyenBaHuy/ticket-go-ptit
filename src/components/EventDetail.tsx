import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { events } from "../constants/mocks/mockEventData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { getDisplayPrice } from "../utils/getDisplayPrice";
const EventDetail = () => {
  const { id } = useParams();
  const event = events.find((e) => e.event_id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!event)
    return (
      <p className="text-center py-8 text-3xl font-bold">
        Sự kiện không tồn tại. Mời bạn chọn sự kiện khác
      </p>
    );

  return (
    <>
      {/* TICKET INFO SECTION */}
      <div className="w-full py-8 bg-gradient-to-b from-[#27272A] from-60% to-black text-white">
        <div className=" relative mx-40 flex flex-col md:flex-row rounded-3xl overflow-hidden shadow-lg ">
          {/* Left side: Info */}
          <div className="md:w-1/3 p-8 flex flex-col justify-between bg-[#38383d]">
            <div>
              <h1 className="text-xl md:text-2xl font-bold mb-4">
                {event.title}
              </h1>
              <div className="flex items-center mb-6 gap-2 text-[#2dc275] ">
                <FontAwesomeIcon
                  icon={faCalendar}
                  className="text-white text-xl"
                />
                <p className="font-bold text-sm">
                  {event.duration}, {event.start_date}
                </p>
              </div>
              <div className="flex items-center mb-4 gap-2 text-[#2dc275] ">
                <FontAwesomeIcon
                  icon={faLocationDot}
                  className="text-white text-xl"
                />
                <p className="font-bold text-sm">{event.location}</p>
              </div>
            </div>
            {/* price action section */}
            <div className="border-t border-white py-[1rem] font-bold">
              <p className="mb-2 text-xl text-gray-200 flex flex-row gap-1.5 items-center">
                Giá từ
                <p className="flex items-center gap-4 justify-center text-[#2dc275] text-2xl">
                  {getDisplayPrice(event.tickets)?.toLocaleString("de-DE")} đ
                  <svg
                    width="8"
                    height="14"
                    viewBox="0 0 8 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M.293.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L5.586 7 .293 1.707a1 1 0 010-1.414z"
                      fill="#2dc275"
                    ></path>
                  </svg>
                </p>
              </p>

              <button className="w-full mt-2 bg-[#2dc275] hover:bg-white hover:text-black transition-colors duration-500 text-white font-bold py-2 px-2.5 rounded">
                <p>Mua vé ngay</p>
              </button>
            </div>
          </div>

          {/* divider */}
          <div className="hidden md:flex flex-col absolute justify-center items-center top-0 bottom-0 left-1/3 -translate-x-1/2">
            <div className="w-18 h-10 rounded-b-full bg-[#27272A]"></div>
            <svg
              width="4"
              height="100%"
              viewBox="0 0 4 415"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              id="vertical-dashed"
            >
              <path
                stroke="#27272A"
                stroke-width="4"
                stroke-linecap="round"
                stroke-dasharray="4 10"
                d="M2 2v411"
              ></path>
            </svg>
            <div className="w-18 h-10 rounded-t-full bg-black"></div>
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
      <div className="w-full py-8 bg-[#F5F7FC] text-white">
        <div className="mx-40 flex gap-8 flex-col">
          {/* details section */}
          <div className="p-3 bg-white">
            <h1 className="py-2 mb-6 text-black text-md font-bold border-b border-[#ebebf0]">
              Giới thiệu
            </h1>
            <div
              className="mb-4 text-sm text-black"
              dangerouslySetInnerHTML={{ __html: event.description }}
            ></div>
          </div>
          {/* booking section */}
          <div className="bg-[#27272A] rounded-2xl py-4">
            <h1 className="mx-3 text-white text-md font-bold border-b border-black ">
              Thông tin vé
            </h1>
            <div>
              {event.tickets.map((ticket, index) => (
                <div
                  key={ticket.ticket_id}
                  className={`flex justify-between items-center py-2 px-4 ${
                    index % 2 === 0 ? "bg-[#2f3033]" : "bg-[#38383d]"
                  }`}
                >
                  <h1 className="py-2 text-white font-semibold">
                    {ticket.type}
                  </h1>
                  <div className="">
                    <p
                      className={`font-bold mb-2 ${
                        ticket.quantity === 0
                          ? "text-gray-400"
                          : "text-[#2dc275]"
                      }`}
                    >
                      {ticket.price.toLocaleString("de-DE")} đ
                    </p>
                    {ticket.quantity === 0 && (
                      <div className="text-center bg-red-200 p-1 text-red-600 font-bold rounded-xl">
                        Hết vé
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventDetail;
