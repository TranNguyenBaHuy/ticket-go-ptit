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
  const [loading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleFetchMyTicket = async () => {
      setIsLoading(true);

      const url = `/api/orders/history`;

      try {
        const response = await fetch(url);

        if (!response.ok)
          throw new Error(`Response status: ${response.status}`);

        const result = await response.json();

        console.log("FETCH TICKET DETAILS", result);

        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    handleFetchMyTicket();
  }, [activeTab]);

  const tabs = [
    { id: "all" as TabType, label: "Tất cả" },
    { id: "success" as TabType, label: "Thành công" },
    { id: "pending" as TabType, label: "Đang xử lý" },
    { id: "cancelled" as TabType, label: "Đã hủy" },
  ];

  // Mock data để hiển thị giao diện
  const mockTickets = [
    {
      ticket_id: "1",
      event_name: "Lorem Ipsum is simply dummy text of the printing typesetting (max 80 characters)",
      event_date: "26",
      event_month: "Tháng 07",
      event_year: "2023",
      event_time: "08:00 PM - 10:00 PM",
      location: "Cung thể thao Quần Ngựa\n30 Văn Cao, Liễu Giai, Ba Đình, Hà Nội",
      order_code: "A214324CD",
      status: "success",
      ticket_status: "Thành công",
      entrance_status: "Vé điện tử"
    },
    {
      ticket_id: "2",
      event_name: "Lorem Ipsum is simply dummy text of the printing typesetting (max 80 characters)",
      event_date: "26",
      event_month: "Tháng 07",
      event_year: "2023",
      event_time: "08:00 PM - 10:00 PM",
      location: "Cung thể thao Quần Ngựa\n30 Văn Cao, Liễu Giai, Ba Đình, Hà Nội",
      order_code: "A214324CD",
      status: "success",
      ticket_status: "Thành công",
      entrance_status: "Vé vật lý"
    },
    {
      ticket_id: "3",
      event_name: "Lorem Ipsum is simply dummy text of the printing typesetting (max 80 characters)",
      event_date: "26",
      event_month: "Tháng 07",
      event_year: "2023",
      event_time: "08:00 PM - 10:00 PM",
      location: "Cung thể thao Quần Ngựa\n30 Văn Cao, Liễu Giai, Ba Đình, Hà Nội",
      order_code: "A214324CD",
      status: "success",
      ticket_status: "Thành công",
      entrance_status: "Vé điện tử"
    }
  ];

  const filteredTickets = mockTickets.filter((ticket) => {
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
          <div className="flex-1 min-w-0 max-w-3xl">
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-4 md:mb-6 lg:mb-8">
              Vé của tôi
            </h1>

            {/* Tabs */}
            <div className="grid grid-cols-2 md:flex gap-2 md:gap-3 lg:gap-4 mb-4 md:mb-6 lg:mb-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 md:px-6 lg:px-10 py-2 md:py-2.5 lg:py-3 rounded-full font-medium text-sm md:text-base transition-colors ${activeTab === tab.id
                      ? "bg-[#2dc275] text-white"
                      : "bg-[#3a3a3a] text-gray-300 hover:bg-[#616169]"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Success Message - chỉ hiển thị khi tab success */}
            {activeTab === "success" && filteredTickets.length > 0 && (
              <div className="bg-[#2dc275] text-white px-4 py-3 rounded-lg mb-6 flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">Nhận vé thành công</span>
              </div>
            )}

            {/* Sub Tabs */}
            <div className="flex gap-6 md:gap-8 lg:gap-12 mb-6 md:mb-8 border-b border-gray-700">
              <button
                onClick={() => setActiveSubTab("upcoming")}
                className={`pb-2 md:pb-3 font-medium transition-colors relative text-sm md:text-base ${activeSubTab === "upcoming"
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
                className={`pb-2 md:pb-3 font-medium transition-colors relative text-sm md:text-base ${activeSubTab === "past"
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

            {/* Ticket List - Layout mới đúng thiết kế */}
            {filteredTickets.length > 0 && (
              <div className="space-y-3">
                {filteredTickets.map((ticket, index) => (
                  <div key={ticket.ticket_id} className="flex gap-3">
                    {/* Timeline section */}
                    <div className="flex flex-col items-center w-16 flex-shrink-0">
                      {/* Date */}
                      <div className="text-center mb-2">
                        <div className="text-white text-3xl font-bold leading-none">{ticket.event_date}</div>
                        <div className="text-gray-400 text-xs">{ticket.event_month}</div>
                        <div className="text-gray-400 text-xs">{ticket.event_year}</div>
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
                            {ticket.ticket_status}
                          </span>
                          <span className="bg-gray-700 text-white text-xs px-3 py-1 rounded-full">
                            {ticket.entrance_status}
                          </span>
                        </div>

                        {/* Order Code */}
                        <div className="flex items-center gap-2 text-gray-300 text-sm">
                          <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <span>Order code: {ticket.order_code}</span>
                        </div>

                        {/* Time */}
                        <div className="flex items-center gap-2 text-gray-300 text-sm">
                          <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>{ticket.event_time}</span>
                        </div>

                        {/* Location */}
                        <div className="flex items-start gap-2 text-gray-300 text-sm">
                          <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <div className="whitespace-pre-line">{ticket.location}</div>
                        </div>
                      </div>
                    </div>
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