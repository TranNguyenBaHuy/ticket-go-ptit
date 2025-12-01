import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserSidebar from "../components/Layouts/Client/UserSidebar";
import SelectTicketLayout from "../components/Layouts/Client/SelectTicketLayout";
import axios from "../utils/axiosInterceptor";
import type {
  OrdersHistoryResponse,
  RawOrder,
  RawTicketOrderDetail,
  MappedTicket,
} from "../constants/types/types";

type TabType = "all" | "COMPLETED" | "PENDING" | "CANCELLED";
type SubTabType = "UPCOMING" | "PAST";

const MyTickets = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const [activeSubTab, setActiveSubTab] = useState<SubTabType>("UPCOMING");
  const [loading, setIsLoading] = useState<boolean>(true);
  const [tickets, setTickets] = useState<MappedTicket[]>([]);

  const PAGE_LIMIT = 6;

  useEffect(() => {
    const handleFetchMyTicket = async () => {
      setIsLoading(true);
      setTickets([]); 

      try {
        const response = await axios.get<OrdersHistoryResponse>("/api/orders/history", {
          params: {
            page: 1,
            limit: PAGE_LIMIT,
            status: activeTab,
            eventTime: activeSubTab,
          },
        });

        const result = response.data;
        const orders: RawOrder[] = result.orders || [];

        const mappedTickets: MappedTicket[] = [];

        orders.forEach((order: RawOrder) => {
            let items: RawTicketOrderDetail[] = [];
            if (Array.isArray(order.ticketOrderDetails)) {
                items = order.ticketOrderDetails;
            } else if (Array.isArray(order.orderDetails)) {
                items = order.orderDetails;
            }

            items.forEach((item: RawTicketOrderDetail) => {
                const event = item.ticketType?.event;
                
                let dateStr = "";
                if (event?.startDate) {
                    const d = new Date(event.startDate);
                    const day = d.getDate().toString().padStart(2, '0');
                    const month = (d.getMonth() + 1).toString().padStart(2, '0');
                    const year = d.getFullYear();
                    dateStr = `${day} Tháng ${month} ${year}`;
                }

                mappedTickets.push({
                    id: item.id || Math.random(),
                    ticket_id: order.id ? `${order.id}` : "N/A",
                    event_name: event?.title || "Sự kiện không xác định",
                    event_date: dateStr,
                    event_location: event?.location,
                    event_duration: event?.duration,
                    status: order.status
                });
            });
        });
        setTickets(mappedTickets);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setTickets([]);
        setIsLoading(false);
      }
    };

    handleFetchMyTicket();
  }, [activeTab, activeSubTab]);

  const tabs = [
    { id: "all" as TabType, label: "Tất cả" },
    { id: "COMPLETED" as TabType, label: "Thành công" },
    { id: "PENDING" as TabType, label: "Đang xử lý" },
    { id: "CANCELLED" as TabType, label: "Đã hủy" },
  ];


  if (loading)
    return (
      <div className="flex flex-1 items-center justify-center min-h-screen bg-black font-bold text-white">
        Đang tải...
      </div>
    );

  return (
    <div className="min-h-screen bg-[#212121]">
      <div className="mx-4 md:mx-30 py-4 md:py-8">
        {/* Breadcrumb */}
        <div className="text-xs md:text-sm text-gray-400 mb-4 md:mb-8">
          <button
            onClick={() => navigate("/")}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Trang chủ
          </button>
          <span className="mx-1 md:mx-2">›</span>
          <span className="text-white">Vé của tôi</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 md:gap-8">
          {/* Sidebar - ẩn trên mobile */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <UserSidebar />
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-4 md:mb-6 lg:mb-8">
              Vé của tôi
            </h1>

            {/* Tabs - grid 2x2 trên mobile */}
            <div className="grid grid-cols-2 md:flex gap-2 md:gap-3 lg:gap-4 mb-4 md:mb-6 lg:mb-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 md:px-6 lg:px-10 py-2 md:py-2.5 lg:py-3 rounded-full font-medium text-sm md:text-base transition-colors ${
                    activeTab === tab.id
                      ? "bg-[#2dc275] text-white"
                      : "bg-[#52525b] text-gray-300 hover:bg-[#616169]"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Sub Tabs */}
            <div className="flex gap-6 md:gap-8 lg:gap-12 mb-6 md:mb-8 border-b border-gray-700">
              <button
                onClick={() => setActiveSubTab("UPCOMING")}
                className={`pb-2 md:pb-3 font-medium transition-colors relative text-sm md:text-base ${
                  activeSubTab === "UPCOMING"
                    ? "text-[#2dc275]"
                    : "text-gray-400 hover:text-gray-300"
                }`}
              >
                Sắp diễn ra
                {activeSubTab === "UPCOMING" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2dc275]"></div>
                )}
              </button>
              <button
                onClick={() => setActiveSubTab("PAST")}
                className={`pb-2 md:pb-3 font-medium transition-colors relative text-sm md:text-base ${
                  activeSubTab === "PAST"
                    ? "text-[#2dc275]"
                    : "text-gray-400 hover:text-gray-300"
                }`}
              >
                Đã kết thúc
                {activeSubTab === "PAST" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2dc275]"></div>
                )}
              </button>
            </div>

            {/* Empty State */}
            {!loading && tickets.length === 0 && (
              <div className="flex flex-col items-center justify-center py-8 md:py-12 lg:py-20">
                <div className="w-40 h-40 md:w-64 md:h-64 lg:w-80 lg:h-80 mb-4 md:mb-6">
                  <img
                    src="/emptyState.svg"
                    alt="No tickets"
                    className="w-full h-full object-contain"
                  />
                </div>
                <p className="text-gray-400 text-sm md:text-base lg:text-xl">
                  Bạn chưa có vé nào
                </p>
              </div>
            )}

            {/* Ticket List - Sử dụng component SelectTicketLayout */}
            {tickets.length > 0 && (
              <SelectTicketLayout tickets={tickets} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyTickets;