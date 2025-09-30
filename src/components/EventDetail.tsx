import { useParams } from "react-router-dom";
import { events } from "../constants/mocks/mockEventData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { getDisplayPrice } from "./utils/getDisplayPrice";

const EventDetail = () => {
  const { id } = useParams();
  const event = events.find((e) => e.event_id === id);

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
        <div className=" relative mx-30 flex flex-col md:flex-row rounded-3xl overflow-hidden shadow-lg ">
          {/* Left side: Info */}
          <div className="md:w-1/3 p-6 flex flex-col justify-between bg-[#38383d]">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-4">
                {event.title}
              </h1>
              <div className="flex items-center mb-4 gap-1.5 text-[#2dc275] ">
                <FontAwesomeIcon
                  icon={faCalendar}
                  className="text-white text-xl"
                />
                <p className="font-semibold text-sm">
                  {event.duration}, {event.start_date}
                </p>
              </div>
              <div className="flex items-center mb-4 gap-1.5 text-[#2dc275] ">
                <FontAwesomeIcon
                  icon={faLocationDot}
                  className="text-white text-xl"
                />
                <p className="font-semibold text-sm">{event.location}</p>
              </div>
            </div>
            {/* price action section */}
            <div className="border-t border-white py-[0.5rem]">
              <p className="mb-2 text-xl text-gray-200 flex flex-row gap-1.5 items-center font-bold">
                Giá từ
                <p className="text-[#2dc275] text-2xl">
                  {getDisplayPrice(event.tickets)?.toLocaleString("de-DE")} đ
                </p>
              </p>

              <button className="w-full mt-2 bg-[#2dc275] hover:bg-white hover:text-black transition-colors duration-500 text-white font-bold py-2 px-2.5 rounded">
                Mua vé ngay
              </button>
            </div>
          </div>

          {/* divider */}
          <div className="hidden md:flex flex-col absolute justify-center items-center top-0 bottom-0 left-1/3 -translate-x-1/2">
            <div className="w-14 h-8 rounded-b-full bg-[#27272A]"></div>
            <svg
              width="4"
              height="100%"
              viewBox="0 0 4 415"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              id="vertical-dashed"
            >
              <path
                stroke="#c4c4c4"
                stroke-width="4"
                stroke-linecap="round"
                stroke-dasharray="4 10"
                d="M2 2v411"
              ></path>
            </svg>
            <div className="w-14 h-8 rounded-t-full bg-black"></div>
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
        <div className="mx-30 flex flex-col  rounded-lg overflow-hidden shadow-lg">
          <div className="p-3 flex flex-col gap-6">
            <h1 className="text-black text-2xl font-bold">Giới thiệu</h1>
            <div
              className="mb-4 text-sm text-black"
              dangerouslySetInnerHTML={{ __html: event.description }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventDetail;
