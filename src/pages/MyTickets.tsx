import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserSidebar from "../components/Layouts/Client/UserSidebar";
import { userBookings } from "../constants/types/types";

type TabType = "all" | "success" | "pending" | "cancelled";
type SubTabType = "upcoming" | "past";

const MyTickets = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const [activeSubTab, setActiveSubTab] = useState<SubTabType>("upcoming");
  const [loading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleFetchMyTicket = async () => {
      setIsLoading(true);

      const url = `/api/orders/history`;

      try {
        const response = await fetch(url);

        if (!response.ok)
          throw new Error(`Response status: ${response.status}`);

        const result = await response.json;

        console.log("FETCH TICKET DETAILS", result);

        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    handleFetchMyTicket();
  }, [activeTab]);

  const tabs = [
    { id: "all" as TabType, label: "Tất cả" },
    { id: "completed" as TabType, label: "Thành công" },
    { id: "pending" as TabType, label: "Đang xử lý" },
    { id: "cancelled" as TabType, label: "Đã hủy" },
  ];

  const filteredTickets = userBookings.filter((ticket) => {
    if (activeTab === "all") return true;
    return ticket.status === activeTab;
  });

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
                onClick={() => setActiveSubTab("upcoming")}
                className={`pb-2 md:pb-3 font-medium transition-colors relative text-sm md:text-base ${
                  activeSubTab === "upcoming"
                    ? "text-[#2dc275]"
                    : "text-gray-400 hover:text-gray-300"
                }`}
              >
                Sắp diễn ra
                {activeSubTab === "upcoming" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2dc275]"></div>
                )}
              </button>
              <button
                onClick={() => setActiveSubTab("past")}
                className={`pb-2 md:pb-3 font-medium transition-colors relative text-sm md:text-base ${
                  activeSubTab === "past"
                    ? "text-[#2dc275]"
                    : "text-gray-400 hover:text-gray-300"
                }`}
              >
                Đã kết thúc
                {activeSubTab === "past" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2dc275]"></div>
                )}
              </button>
            </div>

            {/* Empty State */}
            {filteredTickets.length === 0 && (
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

            {/* Ticket List - Giao diện mới giống hình mẫu */}
            {filteredTickets.length > 0 && (
              <div className="space-y-3">
                {filteredTickets.map((ticket, index) => {
                  // Parse event_date nếu có format "26 Tháng 07 2023"
                  const dateParts = ticket.event_date ? ticket.event_date.split(' ') : [];
                  const day = dateParts[0] || '';
                  const month = dateParts.slice(1, 3).join(' ') || '';
                  const year = dateParts[3] || '';

                  return (
                    <div key={ticket.ticket_id} className="flex gap-3">
                      {/* Timeline section */}
                      <div className="flex flex-col items-center w-16 flex-shrink-0">
                        {/* Date */}
                        <div className="text-center mb-2">
                          <div className="text-white text-3xl font-bold leading-none">{day}</div>
                          <div className="text-gray-400 text-xs">{month}</div>
                          {year && <div className="text-gray-400 text-xs">{year}</div>}
                        </div>
                        {/* Dot */}
                        <div className="w-5 h-5 bg-black rounded-full border-[3px] border-gray-500 flex-shrink-0"></div>
                        {/* Line - không hiển thị cho item cuối cùng */}
                        {index < filteredTickets.length - 1 && (
                          <div className="w-[2px] bg-gray-600 flex-1 min-h-[60px]"></div>
                        )}
                      </div>

                      {/* Ticket Card */}
                      <div className="flex-1 bg-[#3a3a3a] rounded-lg p-4">
                        <div className="space-y-3">
                          <h3 className="text-white font-semibold text-base leading-tight">
                            {ticket.event_name}
                          </h3>

                          {/* Status Badges */}
                          <div className="flex gap-2 flex-wrap">
                            <span className="bg-[#2dc275] text-white text-xs px-3 py-1 rounded-full font-medium">
                              {
                                {
                                  completed: "Thành công",
                                  pending: "Đang xử lý",
                                  cancelled: "Đã hủy",
                                  all: "Tất cả",
                                  success: "Thành công"
                                }[ticket.status as string] || "Chưa xác định"
                              }
                            </span>
                            <span className="bg-gray-700 text-white text-xs px-3 py-1 rounded-full">
                              Vé điện tử
                            </span>
                          </div>

                          {/* Order Code */}
                          {ticket.ticket_id && (
                            <div className="flex items-center gap-2 text-gray-300 text-sm">
                              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                              <span>Order code: {ticket.ticket_id}</span>
                            </div>
                          )}

                          {/* Time */}
                          <div className="flex items-center gap-2 text-gray-300 text-sm">
                            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>08:00 PM - 10:00 PM</span>
                          </div>

                          {/* Location */}
                          <div className="flex items-start gap-2 text-gray-300 text-sm">
                            <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <div>
                              Cung thể thao Quần Ngựa<br/>
                              30 Văn Cao, Liễu Giai, Ba Đình, Hà Nội
                            </div>
                          </div>

                          {/* Price */}
                          <div className="flex items-center gap-2 text-[#2dc275] font-bold text-sm md:text-base">
                            <span>{ticket.price.toLocaleString("de-DE")} đ</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyTickets;