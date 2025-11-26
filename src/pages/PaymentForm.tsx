import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import axios from "@/utils/axiosInterceptor";
import type { Event } from "@/constants/types/types";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:9092";

interface PaymentFormState {
  receiverName: string;
  receiverPhone: string;
  receiverEmail: string;
  paymentExpiresAt: number;
}

const PaymentForm = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("VNPAY");
  const [cartDetails, setCartDetails] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [event, setEvent] = useState<Event | null>(null);

  const state = location.state as PaymentFormState;

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchEventData();
    fetchCartData();
  }, []);

  const fetchEventData = async () => {
    try {
      const response = await fetch(`${API_URL}/api/events/${String(id)}`);
      if (!response.ok) throw new Error("Không thể lấy thông tin sự kiện");
      const result = await response.json();
      setEvent(result);
    } catch (error) {
      console.error("Fetch event error:", error);
    }
  };

  const fetchCartData = async () => {
    try {
      const response = await fetch(`${API_URL}/api/carts`, {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Không thể lấy thông tin giỏ hàng");
      }

      const result = await response.json();
      if (result.cartDetails && Array.isArray(result.cartDetails)) {
        setCartDetails(result.cartDetails);
      }
    } catch (error) {
      console.error("Fetch cart error:", error);
      toast.error("Lỗi khi lấy thông tin giỏ hàng");
    } finally {
      setLoading(false);
    }
  };

  const calculateTotal = () => {
    return cartDetails.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleSubmit = async () => {
    if (!state) {
      toast.error("Thông tin không hợp lệ");
      return;
    }

    setIsProcessing(true);

    try {
      const totalPrice = calculateTotal();

      const response = await axios.post("/api/carts/place-order", {
        receiverName: state.receiverName,
        receiverPhone: state.receiverPhone,
        receiverEmail: state.receiverEmail,
        totalPrice: totalPrice,
        paymentMethod: paymentMethod,
      });

      if (!response.data.success) {
        throw new Error(response.data.message || "Không thể tạo đơn hàng");
      }

      // If VNPay, redirect to payment URL
      if (paymentMethod === "VNPAY" && response.data.paymentUrl) {
        sessionStorage.setItem(
          "pendingPayment",
          JSON.stringify({
            orderId: response.data.orderId,
            amount: totalPrice,
          })
        );
        window.location.href = response.data.paymentUrl;
      } else {
        // For cash payment
        toast.success("Đặt vé thành công!");
        navigate("/my-tickets");
      }
    } catch (error: any) {
      console.error("Payment error:", error);
      toast.error(error.response?.data?.message || error.message || "Có lỗi xảy ra");
      setIsProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-1 min-h-screen bg-black text-white text-xl items-center justify-center">
        Đang tải...
      </div>
    );
  }

  if (!state) {
    return (
      <div className="flex flex-1 min-h-screen bg-black text-white items-center justify-center">
        <div className="text-center">
          <p className="text-xl mb-4">Thông tin không hợp lệ</p>
          <Button onClick={() => navigate(-1)} className="bg-[#2dc275]">
            Quay lại
          </Button>
        </div>
      </div>
    );
  }

  const totalPrice = calculateTotal();

  return (
    <>
      <div className="flex flex-1 gap-5 mx-10 lg:mx-auto max-w-[1200px]">
        {/* FORM */}
        <div className="flex-7">
          <h1 className="text-2xl font-bold my-10 text-[#2dc275]">
            THANH TOÁN
          </h1>

          <div className="flex flex-col gap-10 text-white">
            {/* Receiver Info */}
            <div className="bg-[#38383d] p-4 rounded-2xl">
              <h3 className="text-[#2dc275] text-lg font-semibold mb-4">
                Thông tin nhận vé
              </h3>
              <div className="space-y-2 text-sm">
                <p>
                  <span className="text-gray-400">Tên:</span>{" "}
                  <span className="text-white font-semibold">{state.receiverName}</span>
                </p>
                <p>
                  <span className="text-gray-400">Số điện thoại:</span>{" "}
                  <span className="text-white font-semibold">{state.receiverPhone}</span>
                </p>
                {state.receiverEmail && (
                  <p>
                    <span className="text-gray-400">Email:</span>{" "}
                    <span className="text-white font-semibold">{state.receiverEmail}</span>
                  </p>
                )}
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-[#38383d] p-4 rounded-2xl">
              <h3 className="text-[#2dc275] text-lg font-semibold mb-4">
                Phương thức thanh toán
              </h3>
              <div className="space-y-3">
                <div
                  onClick={() => setPaymentMethod("VNPAY")}
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    paymentMethod === "VNPAY"
                      ? "border-[#2dc275] bg-[#2dc275]/10"
                      : "border-gray-600 bg-gray-800/30"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex-1">
                      <p className="text-white font-semibold">VNPay</p>
                      <p className="text-gray-400 text-sm">
                        Thẻ tín dụng, Thẻ ghi nợ, Internet Banking
                      </p>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        paymentMethod === "VNPAY"
                          ? "border-[#2dc275]"
                          : "border-gray-600"
                      }`}
                    >
                      {paymentMethod === "VNPAY" && (
                        <div className="w-3 h-3 rounded-full bg-[#2dc275]"></div>
                      )}
                    </div>
                  </div>
                </div>

                <div
                  onClick={() => setPaymentMethod("CASH")}
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    paymentMethod === "CASH"
                      ? "border-[#2dc275] bg-[#2dc275]/10"
                      : "border-gray-600 bg-gray-800/30"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex-1">
                      <p className="text-white font-semibold">Thanh toán tiền mặt</p>
                      <p className="text-gray-400 text-sm">
                        Thanh toán khi nhận vé tại sự kiện
                      </p>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        paymentMethod === "CASH"
                          ? "border-[#2dc275]"
                          : "border-gray-600"
                      }`}
                    >
                      {paymentMethod === "CASH" && (
                        <div className="w-3 h-3 rounded-full bg-[#2dc275]"></div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ORDER INFO */}
        <div className="flex flex-col gap-4 bg-white text-black flex-3 mt-28 rounded-xl p-4 h-fit">
          {/* Event Title */}
          {event && (
            <div className="pb-4 border-b border-gray-300">
              <h3 className="font-bold text-lg text-black">{event.title}</h3>
            </div>
          )}

          {/* Ticket Details Header */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Thông tin đặt vé</h3>

            <div className="flex flex-col gap-3 border-b-1 border-dashed border-b-gray-600 pb-4">
              {/* TITLE */}
              <div className="flex justify-between">
                <p className="font-semibold text-md">Loại vé</p>
                <p className="font-semibold text-md">Số lượng</p>
              </div>

              {/* INFO */}
              <div className="flex flex-col gap-2">
                {cartDetails && cartDetails.length > 0 ? (
                  cartDetails.map((item) => (
                    <div key={item.id} className="flex justify-between items-center">
                      <div className="flex flex-col">
                        <p className="font-normal">{item.ticketType?.type ?? "Loại vé"}</p>
                        <p className="font-normal text-gray-500">
                          {item.price.toLocaleString("vi-VN")} đ
                        </p>
                      </div>
                      <div className="flex flex-col text-end">
                        <p className="font-normal text-gray-500">{item.quantity}</p>
                        <p className="font-normal text-gray-500">
                          {(item.price * item.quantity).toLocaleString("vi-VN")} đ
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex">Giỏ hàng trống</div>
                )}
              </div>
            </div>

            <div className="flex justify-between mt-3">
              <p className="font-semibold text-md">
                Tạm tính{" "}
                {cartDetails.length > 0
                  ? cartDetails.reduce((total, item) => total + item.quantity, 0)
                  : 0}{" "}
                ghế
              </p>
              <p className="font-bold text-lg text-[#2dc275]">
                {totalPrice.toLocaleString("vi-VN")} đ
              </p>
            </div>
          </div>

          <p className="text-sm text-center text-black/30 font-semibold">
            Nhấn tiếp tục để hoàn tất thanh toán
          </p>

          <Button
            type="button"
            disabled={isProcessing}
            className="w-full bg-[#2dc275] hover:bg-[#25a860] text-white py-6 rounded-lg text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleSubmit}
          >
            {isProcessing ? "Đang xử lý..." : "Tiếp tục"}
          </Button>
        </div>
      </div>
    </>
  );
};

export default PaymentForm;
