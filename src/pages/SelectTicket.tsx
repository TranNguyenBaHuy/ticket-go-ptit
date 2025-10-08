import { useNavigate, useParams } from "react-router-dom";
import { events } from "../constants/mocks/mockEventData";
import { useEffect, useState } from "react";

const SelectTicket = () => {
  const [count, setCount] = useState(0);
  const { id } = useParams();
  const navigate = useNavigate();
  const event = events.find((e) => e.event_id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-black">
      <div className="mx-40">
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
        <div className="mx-45 mb-6">
          <div className="flex items-center justify-between py-2 mx-6">
            <p className="text-white font-bold text-[1.1rem]">Loại vé</p>
            <p className="text-white font-bold text-[1.1rem]">Số lượng</p>
          </div>
          <div className="py-4">
            {event?.tickets.map((ticket) => (
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
    </div>
  );
};

export default SelectTicket;
