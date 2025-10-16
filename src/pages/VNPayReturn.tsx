import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

// Response code messages
const RESPONSE_CODES: Record<string, string> = {
  "00": "Giao dịch thành công",
  "07": "Trừ tiền thành công. Giao dịch bị nghi ngờ (liên quan tới lừa đảo, giao dịch bất thường).",
  "09": "Giao dịch không thành công do: Thẻ/Tài khoản của khách hàng chưa đăng ký dịch vụ InternetBanking tại ngân hàng.",
  "10": "Giao dịch không thành công do: Khách hàng xác thực thông tin thẻ/tài khoản không đúng quá 3 lần",
  "11": "Giao dịch không thành công do: Đã hết hạn chờ thanh toán. Xin quý khách vui lòng thực hiện lại giao dịch.",
  "12": "Giao dịch không thành công do: Thẻ/Tài khoản của khách hàng bị khóa.",
  "13": "Giao dịch không thành công do Quý khách nhập sai mật khẩu xác thực giao dịch (OTP).",
  "24": "Giao dịch không thành công do: Khách hàng hủy giao dịch",
  "51": "Giao dịch không thành công do: Tài khoản của quý khách không đủ số dư để thực hiện giao dịch.",
  "65": "Giao dịch không thành công do: Tài khoản của Quý khách đã vượt quá hạn mức giao dịch trong ngày.",
  "75": "Ngân hàng thanh toán đang bảo trì.",
  "79": "Giao dịch không thành công do: KH nhập sai mật khẩu thanh toán quá số lần quy định.",
  "99": "Các lỗi khác (lỗi còn lại, không có trong danh sách mã lỗi đã liệt kê)",
};

const VNPayReturn = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [paymentStatus, setPaymentStatus] = useState<{
    success: boolean;
    message: string;
    details?: any;
  } | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    // Get all VNPay return parameters
    const vnpParams: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      vnpParams[key] = value;
    });

    // Get response code
    const responseCode = vnpParams["vnp_ResponseCode"];
    const transactionStatus = vnpParams["vnp_TransactionStatus"];
    const amount = parseInt(vnpParams["vnp_Amount"]) / 100; // Convert back from smallest unit
    const txnRef = vnpParams["vnp_TxnRef"];
    const bankCode = vnpParams["vnp_BankCode"];
    const bankTranNo = vnpParams["vnp_BankTranNo"];
    const cardType = vnpParams["vnp_CardType"];
    const orderInfo = vnpParams["vnp_OrderInfo"];
    const payDate = vnpParams["vnp_PayDate"];

    // Get pending payment info
    const pendingPaymentStr = sessionStorage.getItem("pendingPayment");
    let pendingPayment = null;
    if (pendingPaymentStr) {
      pendingPayment = JSON.parse(pendingPaymentStr);
    }

    if (responseCode === "00" && transactionStatus === "00") {
      // Payment successful
      setPaymentStatus({
        success: true,
        message: "Thanh toán thành công!",
        details: {
          amount,
          txnRef,
          bankCode,
          bankTranNo,
          cardType,
          orderInfo,
          payDate,
          pendingPayment,
        },
      });

      // Clear pending payment
      sessionStorage.removeItem("pendingPayment");

      // Here you would typically:
      // 1. Send transaction info to your backend
      // 2. Update order status in database
      // 3. Send confirmation email
      // 4. Generate ticket
    } else {
      // Payment failed
      const errorMessage = RESPONSE_CODES[responseCode] || "Lỗi không xác định";
      setPaymentStatus({
        success: false,
        message: errorMessage,
        details: {
          responseCode,
          transactionStatus,
          txnRef,
          orderInfo,
        },
      });
    }
  }, [searchParams]);

  const formatDate = (dateStr: string) => {
    if (!dateStr || dateStr.length !== 14) return dateStr;
    // Format: yyyyMMddHHmmss -> dd/MM/yyyy HH:mm:ss
    const year = dateStr.substring(0, 4);
    const month = dateStr.substring(4, 6);
    const day = dateStr.substring(6, 8);
    const hour = dateStr.substring(8, 10);
    const minute = dateStr.substring(10, 12);
    const second = dateStr.substring(12, 14);
    return `${day}/${month}/${year} ${hour}:${minute}:${second}`;
  };

  if (!paymentStatus) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
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
          <p className="text-white text-lg">Đang xử lý kết quả thanh toán...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Result Card */}
        <div className="bg-gray-900 rounded-lg p-8 text-center">
          {paymentStatus.success ? (
            <>
              {/* Success Icon */}
              <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-12 h-12 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-green-500 mb-2">
                Thanh toán thành công!
              </h1>
              <p className="text-gray-400 mb-8">
                Cảm ơn bạn đã thanh toán. Vé của bạn đã được xác nhận.
              </p>
            </>
          ) : (
            <>
              {/* Error Icon */}
              <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-12 h-12 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-red-500 mb-2">
                Thanh toán thất bại
              </h1>
              <p className="text-gray-400 mb-8">{paymentStatus.message}</p>
            </>
          )}

          {/* Transaction Details */}
          {paymentStatus.details && (
            <div className="bg-black/50 rounded-lg p-6 mb-6 text-left">
              <h2 className="text-white text-xl font-bold mb-4">
                Chi tiết giao dịch
              </h2>
              <div className="space-y-3">
                {paymentStatus.success ? (
                  <>
                    <div className="flex justify-between text-white">
                      <span className="text-gray-400">Mã giao dịch:</span>
                      <span className="font-mono">
                        {paymentStatus.details.txnRef}
                      </span>
                    </div>
                    <div className="flex justify-between text-white">
                      <span className="text-gray-400">Số tiền:</span>
                      <span className="font-semibold text-[#2dc275]">
                        {paymentStatus.details.amount.toLocaleString("vi-VN")} đ
                      </span>
                    </div>
                    <div className="flex justify-between text-white">
                      <span className="text-gray-400">Ngân hàng:</span>
                      <span>{paymentStatus.details.bankCode}</span>
                    </div>
                    <div className="flex justify-between text-white">
                      <span className="text-gray-400">Mã GD ngân hàng:</span>
                      <span className="font-mono">
                        {paymentStatus.details.bankTranNo}
                      </span>
                    </div>
                    <div className="flex justify-between text-white">
                      <span className="text-gray-400">Loại thẻ:</span>
                      <span>{paymentStatus.details.cardType}</span>
                    </div>
                    <div className="flex justify-between text-white">
                      <span className="text-gray-400">Thời gian:</span>
                      <span>{formatDate(paymentStatus.details.payDate)}</span>
                    </div>
                    <div className="flex justify-between text-white">
                      <span className="text-gray-400">Nội dung:</span>
                      <span className="text-right max-w-xs">
                        {paymentStatus.details.orderInfo}
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between text-white">
                      <span className="text-gray-400">Mã giao dịch:</span>
                      <span className="font-mono">
                        {paymentStatus.details.txnRef}
                      </span>
                    </div>
                    <div className="flex justify-between text-white">
                      <span className="text-gray-400">Mã lỗi:</span>
                      <span className="text-red-500">
                        {paymentStatus.details.responseCode}
                      </span>
                    </div>
                    <div className="flex justify-between text-white">
                      <span className="text-gray-400">Nội dung:</span>
                      <span className="text-right max-w-xs">
                        {paymentStatus.details.orderInfo}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4 justify-center">
            {paymentStatus.success ? (
              <>
                <button
                  onClick={() => navigate("/my-tickets")}
                  className="px-6 py-3 bg-[#2dc275] text-white rounded-lg font-semibold hover:bg-[#25a562] transition-colors"
                >
                  Xem vé của tôi
                </button>
                <button
                  onClick={() => navigate("/")}
                  className="px-6 py-3 bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-600 transition-colors"
                >
                  Về trang chủ
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate(-2)}
                  className="px-6 py-3 bg-[#2dc275] text-white rounded-lg font-semibold hover:bg-[#25a562] transition-colors"
                >
                  Thử lại
                </button>
                <button
                  onClick={() => navigate("/")}
                  className="px-6 py-3 bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-600 transition-colors"
                >
                  Về trang chủ
                </button>
              </>
            )}
          </div>
        </div>

        {/* Debug Info (only in development) */}
        {import.meta.env.DEV && paymentStatus.details && (
          <div className="mt-6 bg-gray-900 rounded-lg p-4">
            <details>
              <summary className="text-gray-400 cursor-pointer mb-2">
                Debug Info (Development Only)
              </summary>
              <pre className="text-xs text-gray-500 overflow-auto">
                {JSON.stringify(paymentStatus.details, null, 2)}
              </pre>
            </details>
          </div>
        )}
      </div>
    </div>
  );
};

export default VNPayReturn;
