import React from "react";

interface Ticket {
  ticket_id: string;
  event_name: string;
  event_date: string;
  price: number;
  status: string;
}

interface SelectTicketLayoutProps {
  tickets: Ticket[];
}

const SelectTicketLayout: React.FC<SelectTicketLayoutProps> = ({ tickets }) => {
  return (
    <div className="space-y-3">
      {tickets.map((ticket, index) => {
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
              {index < tickets.length - 1 && (
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
  );
};

export default SelectTicketLayout;