import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CheckCircle, AlertCircle } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:9092";

interface OrderDetail {
  id: number;
  quantity: number;
  price: number;
  ticketType: {
    type: string;
    event: {
      title: string;
    };
  };
}

interface OrderData {
  id: number;
  totalPrice: number;
  receiverName: string;
  receiverPhone: string;
  receiverEmail?: string;
  status: string;
  paymentStatus: string;
  paymentMethod: string;
  paymentRef?: string;
  createdAt: string;
  ticketOrderDetails: OrderDetail[];
}

const ThanksPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const orderId = searchParams.get("orderId");

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!orderId) {
      setError("Không tìm thấy mã đơn hàng");
      setLoading(false);
      return;
    }

    const fetchOrderData = async () => {
      try {
        const response = await fetch(`${API_URL}/api/orders/${orderId}`, {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Không thể lấy thông tin đơn hàng");
        }

        const data = await response.json();
        if (data.success && data.orderDetails) {
          setOrderData(data.orderDetails);
        } else {
          throw new Error(data.message || "Lỗi khi lấy thông tin đơn hàng");
        }
      } catch (err) {
        console.error("Fetch order error:", err);
        setError(
          err instanceof Error ? err.message : "Lỗi khi lấy thông tin đơn hàng"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrderData();
  }, [orderId]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString("vi-VN");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0f1419] to-[#1a1f2e] flex items-center justify-center p-4">
        <div className="text-center">
          <svg
            className="animate-spin h-12 w-12 text-[#2dc275] mx-auto mb-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <p className="text-white text-lg">Đang tải thông tin đơn hàng...</p>
        </div>
      </div>
    );
  }

  if (error || !orderData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0f1419] to-[#1a1f2e] flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          <div className="bg-[#1e2533] rounded-2xl p-8 md:p-12 shadow-2xl border border-[#2a3142]">
            <div className="flex justify-center mb-8">
              <div className="bg-red-500/20 rounded-full p-4 shadow-lg">
                <AlertCircle className="w-16 h-16 text-red-500" />
              </div>
            </div>
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-bold text-red-500 mb-3">
                Lỗi
              </h1>
              <p className="text-gray-400 text-base md:text-lg">
                {error || "Không thể tải thông tin đơn hàng"}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigate("/my-tickets")}
                className="flex-1 bg-[#2dc275] hover:bg-[#25a860] text-white font-semibold py-6 rounded-lg text-base transition-colors"
              >
                Xem vé của tôi
              </button>
              <button
                onClick={() => navigate("/")}
                className="flex-1 bg-[#38383d] hover:bg-[#45454a] text-white font-semibold py-6 rounded-lg text-base transition-colors"
              >
                Về trang chủ
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const isPaymentSuccess = orderData.paymentStatus === "SUCCESS";

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f1419] to-[#1a1f2e] flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Success/Status Card */}
        <div className="bg-[#1e2533] rounded-2xl p-8 md:p-12 shadow-2xl border border-[#2a3142]">
          {/* Status Icon */}
          <div className="flex justify-center mb-8">
            {isPaymentSuccess ? (
              <div className="bg-gradient-to-br from-[#2dc275] to-[#1fa860] rounded-full p-4 shadow-lg">
                <CheckCircle className="w-16 h-16 text-white" />
              </div>
            ) : (
              <div className="bg-yellow-500/20 rounded-full p-4 shadow-lg">
                <AlertCircle className="w-16 h-16 text-yellow-500" />
              </div>
            )}
          </div>

          {/* Status Message */}
          <div className="text-center mb-10">
            <h1
              className={`text-3xl md:text-4xl font-bold mb-3 ${
                isPaymentSuccess ? "text-[#2dc275]" : "text-yellow-500"
              }`}
            >
              {isPaymentSuccess ? "Thanh toán thành công!" : "Đơn hàng đang xử lý"}
            </h1>
            <p className="text-gray-400 text-base md:text-lg">
              {isPaymentSuccess
                ? "Cảm ơn bạn đã thanh toán. Vé của bạn đã được xác nhận."
                : "Đơn hàng của bạn đang chờ xử lý. Vui lòng kiểm tra email để nhận thông tin chi tiết."}
            </p>
          </div>

          {/* Order Details */}
          <div className="bg-[#161b27] rounded-xl p-6 md:p-8 mb-8 border border-[#2a3142]">
            <h2 className="text-white text-xl font-bold mb-6">Chi tiết đơn hàng</h2>

            <div className="space-y-5">
              {/* Order ID */}
              <div className="flex justify-between items-center pb-4 border-b border-[#2a3142]">
                <span className="text-gray-400 font-medium">Mã đơn hàng:</span>
                <span className="text-white font-mono text-sm md:text-base">
                  ORD{orderData.id}
                </span>
              </div>

              {/* Receiver Name */}
              <div className="flex justify-between items-center pb-4 border-b border-[#2a3142]">
                <span className="text-gray-400 font-medium">Người nhận:</span>
                <span className="text-white font-semibold">
                  {orderData.receiverName}
                </span>
              </div>

              {/* Receiver Phone */}
              <div className="flex justify-between items-center pb-4 border-b border-[#2a3142]">
                <span className="text-gray-400 font-medium">Số điện thoại:</span>
                <span className="text-white font-mono text-sm md:text-base">
                  {orderData.receiverPhone}
                </span>
              </div>

              {/* Receiver Email */}
              {orderData.receiverEmail && (
                <div className="flex justify-between items-center pb-4 border-b border-[#2a3142]">
                  <span className="text-gray-400 font-medium">Email:</span>
                  <span className="text-white text-sm md:text-base break-all">
                    {orderData.receiverEmail}
                  </span>
                </div>
              )}

              {/* Total Amount */}
              <div className="flex justify-between items-center pb-4 border-b border-[#2a3142]">
                <span className="text-gray-400 font-medium">Tổng tiền:</span>
                <span className="text-[#2dc275] font-bold text-lg">
                  {formatCurrency(orderData.totalPrice)} đ
                </span>
              </div>

              {/* Payment Method */}
              <div className="flex justify-between items-center pb-4 border-b border-[#2a3142]">
                <span className="text-gray-400 font-medium">Phương thức:</span>
                <span className="text-white font-semibold">
                  {orderData.paymentMethod === "VNPAY"
                    ? "VNPay"
                    : orderData.paymentMethod}
                </span>
              </div>

              {/* Payment Status */}
              <div className="flex justify-between items-center pb-4 border-b border-[#2a3142]">
                <span className="text-gray-400 font-medium">Trạng thái thanh toán:</span>
                <span
                  className={`font-semibold ${
                    orderData.paymentStatus === "SUCCESS"
                      ? "text-[#2dc275]"
                      : orderData.paymentStatus === "FAILED"
                        ? "text-red-500"
                        : "text-yellow-500"
                  }`}
                >
                  {orderData.paymentStatus === "SUCCESS"
                    ? "Đã thanh toán"
                    : orderData.paymentStatus === "FAILED"
                      ? "Thanh toán thất bại"
                      : "Chưa thanh toán"}
                </span>
              </div>

              {/* Payment Ref */}
              {orderData.paymentRef && (
                <div className="flex justify-between items-center pb-4 border-b border-[#2a3142]">
                  <span className="text-gray-400 font-medium">Mã GD:</span>
                  <span className="text-white font-mono text-sm md:text-base">
                    {orderData.paymentRef}
                  </span>
                </div>
              )}

              {/* Order Date */}
              <div className="flex justify-between items-center pt-2">
                <span className="text-gray-400 font-medium">Thời gian:</span>
                <span className="text-white font-mono text-sm md:text-base">
                  {formatDate(orderData.createdAt)}
                </span>
              </div>
            </div>
          </div>

          {/* Ticket Details */}
          {orderData.ticketOrderDetails && orderData.ticketOrderDetails.length > 0 && (
            <div className="bg-[#161b27] rounded-xl p-6 md:p-8 mb-8 border border-[#2a3142]">
              <h2 className="text-white text-xl font-bold mb-6">Chi tiết vé</h2>

              <div className="space-y-4">
                {orderData.ticketOrderDetails.map((detail, index) => (
                  <div
                    key={index}
                    className="border border-[#2a3142] rounded-lg p-4 bg-[#0f1419]"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <p className="text-white font-semibold">
                          {detail.ticketType.event.title}
                        </p>
                        <p className="text-gray-400 text-sm">
                          Loại: {detail.ticketType.type}
                        </p>
                      </div>
                      <span className="text-[#2dc275] font-bold">
                        x{detail.quantity}
                      </span>
                    </div>
                    <div className="flex justify-between items-center pt-3 border-t border-[#2a3142]">
                      <span className="text-gray-400">Giá:</span>
                      <span className="text-white font-semibold">
                        {formatCurrency(detail.price)} đ
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => navigate("/my-tickets")}
              className="flex-1 bg-[#2dc275] hover:bg-[#25a860] text-white font-semibold py-6 rounded-lg text-base transition-colors"
            >
              Xem vé của tôi
            </button>
            <button
              onClick={() => navigate("/")}
              className="flex-1 bg-[#38383d] hover:bg-[#45454a] text-white font-semibold py-6 rounded-lg text-base transition-colors"
            >
              Về trang chủ
            </button>
          </div>
        </div>

        {/* Debug Info (Development Only) */}
        {import.meta.env.DEV && (
          <div className="mt-6 bg-[#1e2533] rounded-lg p-4 border border-[#2a3142]">
            <details className="cursor-pointer">
              <summary className="text-gray-400 hover:text-gray-300 font-medium">
                ▶ Debug Info (Development Only)
              </summary>
              <pre className="mt-3 text-xs text-gray-500 overflow-auto max-h-40 bg-[#0f1419] p-3 rounded">
                {JSON.stringify(orderData, null, 2)}
              </pre>
            </details>
          </div>
        )}
      </div>
    </div>
  );
};

export default ThanksPage;
