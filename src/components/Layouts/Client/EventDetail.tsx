import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Calendar, MapPin } from "lucide-react";
import { formatCurrency, formatDateTimeDisplay } from "../../../utils/utils";
import PrimaryColorButton from "./PrimaryColorButton";
import type { Event } from "../../../constants/types/types";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
// @ts-expect-error - JSX file without type declarations
import { useAuth } from "../../../contexts/AuthContext";
import { openAuthModal } from "../../../utils/axiosInterceptor";

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState<Event>();
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { user } = useAuth();

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
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-1 items-center justify-center text-2xl font-bold text-center text-white">
        Loading...
      </div>
    );
  }

  const handleSelectTicket = (eventId: string) => {
    // Kiểm tra đăng nhập trước khi chuyển trang
    if (!user) {
      openAuthModal(); // Gọi modal từ Header
      return;
    }
    navigate(`/events/${eventId}/select-ticket`);
  };

  if (!event)
    return (
      <p className="text-center py-8 text-3xl font-bold">
        Sự kiện không tồn tại. Mời bạn chọn sự kiện khác
      </p>
    );

  const totalTickets = event.ticketTypes.reduce(
    (sum, ticket) => sum + ticket.quantity,
    0
  );
  const isSoldOut = totalTickets === 0;

  return (
    <>
      {/* TICKET INFO SECTION */}
      <div className="w-full py-8 bg-gradient-to-b from-[#27272A] from-60% to-black text-white">
        <div className="relative mx-4 md:mx-10 lg:mx-40 flex flex-col md:flex-row rounded-3xl overflow-hidden shadow-lg">
          {/* Left side: Info */}
          <div className="md:w-1/3 p-4 sm:p-6 md:p-8 flex flex-col justify-between bg-[#38383d]">
            <div>
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold mb-4">
                {event.title}
              </h1>
              <div className="flex items-center mb-4 sm:mb-6 gap-2 text-[#2dc275]">
                <Calendar size={20} className="text-white" />
                <p className="font-bold text-xs sm:text-sm">
                  {event.duration}, {formatDateTimeDisplay(event.startDate)}
                </p>
              </div>
              <div className="flex items-center mb-4 gap-2 text-[#2dc275]">
                <MapPin size={20} className="text-white" />
                <p className="font-bold text-xs sm:text-sm">{event.location}</p>
              </div>
            </div>
            {/* price action section */}
            <div className="border-t border-white py-4 font-bold">
              <p className="mb-2 text-lg sm:text-xl text-gray-200 flex flex-row gap-1.5 items-center">
                Giá từ{" "}
                <span className="flex items-center gap-4 justify-center text-[#2dc275] text-xl sm:text-2xl">
                  {formatCurrency(event.ticketTypes[0].price)}
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
                </span>
              </p>

              <PrimaryColorButton
                title="Mua vé ngay"
                disabled={isSoldOut}
                fullSize={true}
                onClick={() => handleSelectTicket(String(event.id))}
              />
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
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray="4 10"
                d="M2 2v411"
              ></path>
            </svg>
            <div className="w-18 h-10 rounded-t-full bg-black"></div>
          </div>

          {/* Right side: Banner */}
          <div className="md:w-2/3">
            <img
              src={`/images/event/${event.bannerUrl}`}
              alt={event.title}
              className="w-full h-auto object-cover aspect-[16/9]"
            />
          </div>
        </div>
      </div>

      {/* TICKET DETAILS SECTION */}
      <div className="w-full py-8 bg-[#F5F7FC] text-white">
        <div className="mx-4 md:mx-10 lg:mx-40 flex gap-6 md:gap-8 flex-col">
          {/* details section */}
          <div className="p-3 sm:p-5 md:p-8 bg-white rounded-2xl">
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
            <div className="mx-3 flex flex-col sm:flex-row items-start sm:items-center py-3 justify-between border-b border-black gap-3 sm:gap-0">
              <h1 className="text-white text-md font-bold">Thông tin vé</h1>
              <PrimaryColorButton
                title="Mua vé ngay"
                disabled={isSoldOut}
                onClick={() => handleSelectTicket(String(event.id))}
              />
            </div>

            <div>
              <Accordion type="single" collapsible className="w-full">
                {event.ticketTypes.map((ticket, index) => (
                  <AccordionItem
                    key={ticket.id}
                    value={`ticket-${ticket.id}`}
                    className={`border-none ${
                      index % 2 === 0 ? "bg-[#2f3033]" : "bg-[#38383d]"
                    }`}
                  >
                    <div className="flex justify-between items-center py-3 px-4">
                      {/* LEFT: ticket name + accordion trigger*/}
                      <AccordionTrigger className="py-0 text-left text-white font-semibold text-sm sm:text-base hover:no-underline">
                        {ticket.type}
                      </AccordionTrigger>

                      {/* RIGHT: ticket price and status */}
                      <div className="text-left sm:text-right">
                        <p
                          className={`font-bold py-2 ${
                            ticket.quantity === 0
                              ? "text-gray-400"
                              : "text-[#2dc275]"
                          }`}
                        >
                          {ticket.price.toLocaleString("de-DE")} đ
                        </p>
                        {ticket.quantity === 0 && (
                          <div className="text-center bg-red-200 p-1 text-red-600 font-bold rounded-xl text-xs sm:text-sm">
                            Hết vé
                          </div>
                        )}
                      </div>
                    </div>

                    {/* accordion ticket description */}
                    <AccordionContent className="px-4 pb-4 text-gray-200 text-sm leading-relaxed">
                      {ticket.description ? (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: ticket.description,
                          }}
                        ></div>
                      ) : (
                        <p className="italic text-gray-400">
                          Chưa có thông tin về loại vé này.
                        </p>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventDetail;
