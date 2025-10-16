import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Event } from "../constants/types/types";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:9092";

const SelectTicket = () => {
  const [ticketSelections, setTicketSelections] = useState<Record<string, number>>({});
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const fetchEvent = async () => {
      try {
        const response = await fetch(`${API_URL}/api/events/${id}`);
        if (!response.ok) {
          throw new Error("Event not found");
        }
        const data = await response.json();
        setEvent(data);
      } catch (error) {
        console.error("Error fetching event:", error);
        setEvent(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchEvent();
    }
  }, [id]);

  const handleQuantityChange = (ticketId: string, delta: number) => {
    setTicketSelections((prev) => {
      const currentQty = prev[ticketId] || 0;
      const newQty = Math.max(0, currentQty + delta);
      return { ...prev, [ticketId]: newQty };
    });
  };

  const getTotalAmount = () => {
    if (!event) return 0;
    const tickets = event.ticketTypes || [];
    return tickets.reduce((total: number, ticket: any) => {
      const qty = ticketSelections[ticket.id] || 0;
      return total + ticket.price * qty;
    }, 0);
  };

  const getTotalTickets = () => {
    return Object.values(ticketSelections).reduce((sum, qty) => sum + qty, 0);
  };

  const handleProceedToPayment = () => {
    if (!event) return;

    const totalTickets = getTotalTickets();
    if (totalTickets === 0) {
      alert("Vui lòng chọn ít nhất một vé");
      return;
    }

    // Get selected tickets info
    const tickets = event.ticketTypes || [];
    const selectedTickets = tickets
      .filter((ticket: any) => (ticketSelections[ticket.id] || 0) > 0)
      .map((ticket: any) => ({
        type: ticket.type,
        price: ticket.price,
        quantity: ticketSelections[ticket.id],
      }));

    // Navigate to payment page with ticket info
    navigate("/payment", {
      state: {
        eventId: String(event.id),
        eventName: event.title,
        ticketType: selectedTickets.map((t: any) => `${t.type} x${t.quantity}`).join(", "),
        quantity: totalTickets,
        totalAmount: getTotalAmount(),
        selectedTickets,
      },
    });
  };

  if (loading) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Đang tải...</div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Không tìm thấy sự kiện</div>
      </div>
    );
  }

  const tickets = event.ticketTypes || [];

  return (
    <div className="bg-black min-h-screen pb-24">
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
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.707 3.793a1 1 0 010 1.414L4.414 9.5H18a1 1 0 110 2H4.414l4.293 4.293a1 1 0 11-1.414 1.414l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 0z"
                fill="#fff"
              ></path>
            </svg>
            Trở về
          </button>
          <p className="mx-auto">Chọn vé</p>
        </div>

        {/* Event Info */}
        <div className="mb-6 p-4 bg-gray-900 rounded-lg">
          <h2 className="text-white text-xl font-bold mb-2">{event.title}</h2>
          <p className="text-gray-400 text-sm">{event.location}</p>
        </div>

        <div className="mx-45 mb-6">
          <div className="flex items-center justify-between py-2 mx-6">
            <p className="text-white font-bold text-[1.1rem]">Loại vé</p>
            <p className="text-white font-bold text-[1.1rem]">Số lượng</p>
          </div>
          
          {tickets.length === 0 ? (
            <div className="py-12 text-center">
              <div className="text-gray-400 text-lg mb-4">
                <svg
                  className="w-16 h-16 mx-auto mb-4 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                  />
                </svg>
                Chưa có loại vé nào cho sự kiện này
              </div>
              <button
                onClick={() => navigate(-1)}
                className="px-6 py-2 bg-[#2dc275] text-white rounded-lg hover:bg-[#25a562] transition-colors"
              >
                Quay lại
              </button>
            </div>
          ) : (
            <div className="py-4">
              {tickets.map((ticket: any) => (
              <div
                key={ticket.id}
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
                        className="px-4.5 py-2 bg-white rounded-md text-gray-400 hover:bg-gray-100"
                        onClick={() => handleQuantityChange(ticket.id, -1)}
                        disabled={(ticketSelections[ticket.id] || 0) === 0}
                      >
                        -
                      </button>
                      <p className="px-6 py-2 bg-white rounded-md min-w-[60px] text-center">
                        {ticketSelections[ticket.id] || 0}
                      </p>

                      <button
                        className="px-4.5 py-2 bg-white rounded-md border border-[#2dc275] text-[#2dc275] hover:bg-[#2dc275] hover:text-white transition-colors"
                        onClick={() => handleQuantityChange(ticket.id, 1)}
                        disabled={(ticketSelections[ticket.id] || 0) >= ticket.quantity}
                      >
                        +
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
            </div>
          )}
        </div>

        {/* Summary and Payment Button */}
        <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-700 p-4">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="text-white">
              <p className="text-sm text-gray-400">Tổng số vé: {getTotalTickets()}</p>
              <p className="text-2xl font-bold text-[#2dc275]">
                {getTotalAmount().toLocaleString("vi-VN")} đ
              </p>
            </div>
            <button
              onClick={handleProceedToPayment}
              disabled={getTotalTickets() === 0}
              className={`px-8 py-3 rounded-lg font-bold text-lg transition-all ${
                getTotalTickets() === 0
                  ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                  : "bg-[#2dc275] text-white hover:bg-[#25a562]"
              }`}
            >
              Tiếp tục thanh toán
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectTicket;
