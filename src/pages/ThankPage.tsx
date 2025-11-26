import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface TransactionDetails {
  orderCode?: string;
  amount?: string;
  bank?: string;
  bankCode?: string;
  method?: string;
  time?: string;
  description?: string;
}

interface ThankPageProps {
  transactionDetails?: TransactionDetails;
}

const ThankPage = ({ transactionDetails }: ThankPageProps) => {
  const navigate = useNavigate();

  const details = transactionDetails || {
    orderCode: "ORD1760587441801",
    amount: "1.100.000 đ",
    bank: "NCB",
    bankCode: "VNP15205783",
    method: "ATM",
    time: "18/10/2025 11:06:31",
    description: "Thanh toán vé Water bomb Hồ Chí Minh City 2025 - Standard x1, VIP x1",
  };

  const handleBackHome = () => {
    navigate("/");
  };

  const handleViewTickets = () => {
    navigate("/my-tickets");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f1419] to-[#1a1f2e] flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Success Card */}
        <div className="bg-[#1e2533] rounded-2xl p-8 md:p-12 shadow-2xl border border-[#2a3142]">
          {/* Success Icon */}
          <div className="flex justify-center mb-8">
            <div className="bg-gradient-to-br from-[#2dc275] to-[#1fa860] rounded-full p-4 shadow-lg">
              <CheckCircle className="w-16 h-16 text-white" />
            </div>
          </div>

          {/* Success Message */}
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-[#2dc275] mb-3">
              Thanh toán thành công!
            </h1>
            <p className="text-gray-400 text-base md:text-lg">
              Cảm ơn bạn đã thanh toán. Vé của bạn đã được xác nhận.
            </p>
          </div>

          {/* Transaction Details */}
          <div className="bg-[#161b27] rounded-xl p-6 md:p-8 mb-8 border border-[#2a3142]">
            <h2 className="text-white text-xl font-bold mb-6">Chi tiết giao dịch</h2>

            <div className="space-y-5">
              {/* Order Code */}
              <div className="flex justify-between items-center pb-4 border-b border-[#2a3142]">
                <span className="text-gray-400 font-medium">Mã giao dịch:</span>
                <span className="text-white font-mono text-sm md:text-base">
                  {details.orderCode}
                </span>
              </div>

              {/* Amount */}
              <div className="flex justify-between items-center pb-4 border-b border-[#2a3142]">
                <span className="text-gray-400 font-medium">Số tiền:</span>
                <span className="text-[#2dc275] font-bold text-lg">
                  {details.amount}
                </span>
              </div>

              {/* Bank */}
              <div className="flex justify-between items-center pb-4 border-b border-[#2a3142]">
                <span className="text-gray-400 font-medium">Ngân hàng:</span>
                <span className="text-white font-semibold">{details.bank}</span>
              </div>

              {/* Bank Code */}
              <div className="flex justify-between items-center pb-4 border-b border-[#2a3142]">
                <span className="text-gray-400 font-medium">Mã GD ngân hàng:</span>
                <span className="text-white font-mono text-sm md:text-base">
                  {details.bankCode}
                </span>
              </div>

              {/* Payment Method */}
              <div className="flex justify-between items-center pb-4 border-b border-[#2a3142]">
                <span className="text-gray-400 font-medium">Loại thẻ:</span>
                <span className="text-white font-semibold">{details.method}</span>
              </div>

              {/* Time */}
              <div className="flex justify-between items-center pb-4 border-b border-[#2a3142]">
                <span className="text-gray-400 font-medium">Thời gian:</span>
                <span className="text-white font-mono text-sm md:text-base">
                  {details.time}
                </span>
              </div>

              {/* Description */}
              <div className="flex flex-col pt-2">
                <span className="text-gray-400 font-medium mb-2">Nội dung:</span>
                <span className="text-gray-300 text-sm md:text-base text-right">
                  {details.description}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={handleViewTickets}
              className="flex-1 bg-[#2dc275] hover:bg-[#25a860] text-white font-semibold py-6 rounded-lg text-base transition-colors"
            >
              Xem vé của tôi
            </Button>
            <Button
              onClick={handleBackHome}
              className="flex-1 bg-[#38383d] hover:bg-[#45454a] text-white font-semibold py-6 rounded-lg text-base transition-colors"
            >
              Về trang chủ
            </Button>
          </div>
        </div>

        {/* Debug Info (Development Only) */}
        {process.env.NODE_ENV === "development" && (
          <div className="mt-6 bg-[#1e2533] rounded-lg p-4 border border-[#2a3142]">
            <details className="cursor-pointer">
              <summary className="text-gray-400 hover:text-gray-300 font-medium">
                ▶ Debug Info (Development Only)
              </summary>
              <pre className="mt-3 text-xs text-gray-500 overflow-auto max-h-40 bg-[#0f1419] p-3 rounded">
                {JSON.stringify(details, null, 2)}
              </pre>
            </details>
          </div>
        )}
      </div>
    </div>
  );
};

export default ThankPage;
