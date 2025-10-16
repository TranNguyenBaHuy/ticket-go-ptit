import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserSidebar from "../components/Layouts/Client/UserSidebar";
import { userBookings } from "../constants/types/types";

type TabType = "all" | "success" | "pending" | "cancelled";
type SubTabType = "upcoming" | "past";

const MyTickets = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const [activeSubTab, setActiveSubTab] = useState<SubTabType>("upcoming");

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

            {/* Ticket List */}
            {filteredTickets.length > 0 && (
              <div className="space-y-3 md:space-y-4">
                {filteredTickets.map((ticket) => (
                  <div
                    key={ticket.ticket_id}
                    className="bg-[#27272A] p-3 md:p-4 lg:p-6 rounded-lg"
                  >
                    <h3 className="text-white font-semibold text-sm md:text-base lg:text-lg">
                      {ticket.event_name}
                    </h3>
                    <p className="text-gray-400 text-xs md:text-sm mt-1 md:mt-2">
                      {ticket.event_date}
                    </p>
                    <p className="text-[#2dc275] font-bold text-sm md:text-base lg:text-lg mt-1 md:mt-2">
                      {ticket.price.toLocaleString("de-DE")} đ
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyTickets;
