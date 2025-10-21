import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Event } from "../constants/types/types";
import { Calendar, MapPin } from "lucide-react";
import { formatDateTimeDisplay } from "../utils/utils";
import PrimaryColorButton from "../components/Layouts/Client/PrimaryColorButton";

const SelectTicket = () => {
  const { id } = useParams();
  const [event, setEvent] = useState<Event>();
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(`/api/events/${String(id)}`);

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Sự kiện không tồn tại. Mời bạn chọn sự kiện khác");
          }
          throw new Error(`Error when loaded data: ${response.statusText}`);
        }
        const result = await response.json();
        console.log("event result", result);
        setEvent(result);
      } catch (err: any) {
        setError(err.message);
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    window.scrollTo(0, 0);

    fetchEvents();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-1 items-center bg-black justify-center text-2xl font-bold text-center text-white min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-black flex flex-row flex-1 gap-0">
      {/* LEFT */}
      <div className="flex flex-col flex-[7.5] mx-10">
        <div className="flex items-center text-[#2dc275] font-bold text-xl py-8">
          <button
            className="flex items-center gap-3"
            onClick={() => navigate(-1)}
          >
            <svg
              width="20"
              height="21"
              viewBox="0 0 20 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M8.707 3.793a1 1 0 010 1.414L4.414 9.5H18a1 1 0 110 2H4.414l4.293 4.293a1 1 0 11-1.414 1.414l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 0z"
                fill="#fff"
              ></path>
            </svg>
            Trở về
          </button>
          <p className="mx-auto">Chọn vé</p>
        </div>

        <div className="mx-45">
          <div className="flex items-center justify-between py-2 mx-6">
            <p className="text-white font-bold text-[1.1rem]">Loại vé</p>
            <p className="text-white font-bold text-[1.1rem]">Số lượng</p>
          </div>
          <div className="py-4">
            {event?.ticketTypes.map((ticket) => (
              <div
                key={ticket.ticket_id}
                className="flex justify-between items-center py-4 px-4 mx-2 border-b border-dashed border-[#636363]"
              >
                <div>
                  <h1 className="py-2 text-[#2dc275] font-bold">
                    {ticket.type.toUpperCase()}
                  </h1>
                  <p className="text-white">
                    {ticket.price.toLocaleString("de-DE")} đ
                  </p>
                </div>

                <div className="">
                  {ticket.quantity === 0 ? (
                    <div className="text-center bg-red-200 p-1 text-red-600 font-bold rounded-xl">
                      Hết vé
                    </div>
                  ) : (
                    <div className="flex items-center gap-1">
                      <button
                        className="px-4.5 py-2 bg-white rounded-md text-gray-400"
                        onClick={() => setCount(count - 1)}
                      >
                        -
                      </button>
                      <p className="px-6 py-2 bg-white rounded-md">{count}</p>

                      <button
                        className="px-4.5 py-2 bg-white rounded-md border border-[#2dc275] text-[#2dc275]"
                        onClick={() => setCount(count + 1)}
                      >
                        +
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex flex-[3] flex-col  bg-[#38383D]">
        {/* ticket title */}
        <div className="font-bold w-full text-white text-xl bg-[#27272A] px-3 py-1">
          {event?.title.toUpperCase()}
        </div>
        {/* location and date */}
        <div className="flex flex-col justify-center gap-5 p-5 border-b border-[#636363]">
          <p className="flex gap-3 items-center text-white text-[0.9rem]">
            <Calendar fontSize={14} color="#2dc275" />
            {event
              ? formatDateTimeDisplay(event.startDate)
              : "Chưa có ngày diễn ra"}
          </p>
          <p className="flex gap-3 items-center text-white text-[0.9rem]">
            <MapPin fontSize={14} color="#2dc275" />
            {event?.location}
          </p>
        </div>
        {/* ticket name and price */}
        <div className="flex flex-col px-3">
          <p className="text-white font-semibold py-5">Giá vé</p>
          <div>
            {event?.ticketTypes.map((ticket) => (
              <div
                key={ticket.ticket_id}
                className="flex items-center justify-between text-[0.85rem] py-2 font-semibold"
              >
                <p className="text-white">{ticket.type.toUpperCase()}</p>
                <p className="text-[#2dc275]">
                  {ticket.price.toLocaleString("de-DE")} đ
                </p>
              </div>
            ))}
          </div>
        </div>
        {/* footer */}
        <div className="flex bg-[#27272A] px-4 pt-12 pb-6 mt-auto">
          <PrimaryColorButton
            title="Vui lòng chọn vé"
            fullSize={true}
            onClick={() => alert("chọn")}
          />
        </div>
      </div>
    </div>
  );
};

export default SelectTicket;
