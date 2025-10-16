import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:9092";

// Test Card Information (for display only)
const TEST_CARD = {
  bank: "NCB",
  cardNumber: "9704198526191432198",
  cardHolder: "NGUYEN VAN A",
  issueDate: "07/15",
  otp: "123456",
};

interface PaymentState {
  eventId: string;
  eventName: string;
  ticketType: string;
  quantity: number;
  totalAmount: number;
}

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [showTestCard, setShowTestCard] = useState(false);

  const paymentData = location.state as PaymentState;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleVNPayPayment = async () => {
    if (!paymentData) return;

    setIsProcessing(true);

    try {
      // Call backend API to create payment
      const response = await fetch(`${API_URL}/api/payment/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          eventId: paymentData.eventId,
          eventName: paymentData.eventName,
          ticketType: paymentData.ticketType,
          quantity: paymentData.quantity,
          totalAmount: paymentData.totalAmount,
        }),
      });

      const data = await response.json();

      if (!data.success || !data.paymentUrl) {
        throw new Error(data.message || "Failed to create payment");
      }

      // Store payment info in sessionStorage for verification later
      sessionStorage.setItem(
        "pendingPayment",
        JSON.stringify({
          txnRef: data.txnRef,
          orderId: data.orderId,
          ...paymentData,
        })
      );

      // Redirect to VNPay
      window.location.href = data.paymentUrl;
    } catch (error) {
      console.error("Payment error:", error);
      alert("Có lỗi xảy ra khi tạo thanh toán. Vui lòng thử lại.");
      setIsProcessing(false);
    }
  };

  if (!paymentData) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <div className="w-20 h-20 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-12 h-12 text-yellow-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white mb-4">
            Không có thông tin thanh toán
          </h1>
          <p className="text-gray-400 mb-8">
            Vui lòng chọn vé từ trang sự kiện để tiếp tục thanh toán.
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => navigate("/all-events")}
              className="px-6 py-3 bg-[#2dc275] text-white rounded-lg font-semibold hover:bg-[#25a562] transition-colors"
            >
              Xem sự kiện
            </button>
            <button
              onClick={() => navigate("/")}
              className="px-6 py-3 bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-600 transition-colors"
            >
              Về trang chủ
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center text-[#2dc275] font-bold text-xl mb-8">
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
          <p className="mx-auto">Thanh toán</p>
        </div>

        {/* Payment Summary */}
        <div className="bg-gray-900 rounded-lg p-6 mb-6">
          <h2 className="text-white text-2xl font-bold mb-4">
            Thông tin đơn hàng
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between text-white">
              <span className="text-gray-400">Sự kiện:</span>
              <span className="font-semibold">{paymentData.eventName}</span>
            </div>
            <div className="flex justify-between text-white">
              <span className="text-gray-400">Loại vé:</span>
              <span className="font-semibold">{paymentData.ticketType}</span>
            </div>
            <div className="flex justify-between text-white">
              <span className="text-gray-400">Số lượng:</span>
              <span className="font-semibold">{paymentData.quantity}</span>
            </div>
            <div className="border-t border-gray-700 pt-3 mt-3">
              <div className="flex justify-between text-white text-xl">
                <span className="font-bold">Tổng cộng:</span>
                <span className="font-bold text-[#2dc275]">
                  {paymentData.totalAmount.toLocaleString("vi-VN")} đ
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Test Card Info */}
        <div className="bg-yellow-900/30 border border-yellow-600 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <svg
              className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-1"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            <div className="flex-1">
              <h3 className="text-yellow-500 font-bold mb-2">
                Môi trường TEST - Thẻ thử nghiệm
              </h3>
              <button
                onClick={() => setShowTestCard(!showTestCard)}
                className="text-yellow-400 underline text-sm mb-2"
              >
                {showTestCard ? "Ẩn" : "Hiện"} thông tin thẻ test
              </button>
              {showTestCard && (
                <div className="bg-black/50 rounded p-3 mt-2 space-y-1 text-sm">
                  <p className="text-white">
                    <span className="text-gray-400">Ngân hàng:</span>{" "}
                    {TEST_CARD.bank}
                  </p>
                  <p className="text-white">
                    <span className="text-gray-400">Số thẻ:</span>{" "}
                    {TEST_CARD.cardNumber}
                  </p>
                  <p className="text-white">
                    <span className="text-gray-400">Tên chủ thẻ:</span>{" "}
                    {TEST_CARD.cardHolder}
                  </p>
                  <p className="text-white">
                    <span className="text-gray-400">Ngày phát hành:</span>{" "}
                    {TEST_CARD.issueDate}
                  </p>
                  <p className="text-white">
                    <span className="text-gray-400">Mật khẩu OTP:</span>{" "}
                    {TEST_CARD.otp}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div className="bg-gray-900 rounded-lg p-6 mb-6">
          <h2 className="text-white text-xl font-bold mb-4">
            Phương thức thanh toán
          </h2>
          <div className="space-y-3">
            <div className="border border-[#2dc275] rounded-lg p-4 bg-[#2dc275]/10">
              <div className="flex items-center gap-3">
                <img
                  src="https://vinadesign.vn/uploads/images/2023/05/vnpay-logo-vinadesign-25-12-57-55.jpg"
                  alt="VNPay"
                  className="h-8"
                />
                <div className="flex-1">
                  <p className="text-white font-semibold">VNPay</p>
                  <p className="text-gray-400 text-sm">
                    Thanh toán qua cổng VNPay
                  </p>
                </div>
                <div className="w-5 h-5 rounded-full border-2 border-[#2dc275] flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-[#2dc275]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Button */}
        <button
          onClick={handleVNPayPayment}
          disabled={isProcessing}
          className={`w-full py-4 rounded-lg font-bold text-lg transition-all ${
            isProcessing
              ? "bg-gray-600 text-gray-400 cursor-not-allowed"
              : "bg-[#2dc275] text-white hover:bg-[#25a562]"
          }`}
        >
          {isProcessing ? (
            <span className="flex items-center justify-center gap-2">
              <svg
                className="animate-spin h-5 w-5"
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
              Đang xử lý...
            </span>
          ) : (
            "Thanh toán ngay"
          )}
        </button>
      </div>
    </div>
  );
};

export default Payment;
