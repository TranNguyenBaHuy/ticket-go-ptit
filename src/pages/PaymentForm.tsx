import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import axios from "@/utils/axiosInterceptor";
import type { Event } from "@/constants/types/types";
import { Calendar, MapPin } from "lucide-react";
import { formatDateTimeDisplay } from "@/utils/utils";
import CountdownTimer from "../components/Layouts/Client/CountdownTimer";

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
      const response = await axios.get("/api/carts");
      console.log("Cart response:", response.data);
      if (response.data.cartDetails && Array.isArray(response.data.cartDetails)) {
        console.log("Setting cart details:", response.data.cartDetails);
        setCartDetails(response.data.cartDetails);
      } else {
        console.warn("No cart details found in response");
      }
    } catch (error: any) {
      console.error("Fetch cart error:", error);
      if (error.response?.status === 401) {
        toast.error("Vui lòng đăng nhập để tiếp tục");
      } else {
        toast.error("Lỗi khi lấy thông tin giỏ hàng");
      }
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
  const initialMinutes = state?.paymentExpiresAt
    ? Math.max(0, (state.paymentExpiresAt - Date.now()) / (1000 * 60))
    : 15;

  return (
    <>
      {/* EVENT HEADER */}
      {event && (
        <div className="relative w-full h-56 md:h-64 overflow-hidden">
          <img
            src={`/images/event/${event.bannerUrl}`}
            alt={`${event.title} banner`}
            className="absolute inset-0 w-full h-full object-cover blur-sm"
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative flex flex-row items-center justify-between mx-10 lg:mx-auto max-w-[1250px] gap-6 text-white h-full">
            <div className="flex flex-col gap-3 flex-1">
              <h1 className="text-2xl md:text-3xl font-bold border-b border-white pb-3">
                {event.title}
              </h1>
              <div className="flex items-center gap-2">
                <Calendar size={20} />
                <p className="text-sm md:text-base">
                  {event.duration}, {formatDateTimeDisplay(event.startDate)}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={20} />
                <p className="text-sm md:text-base">{event.location}</p>
              </div>
            </div>
            {state?.paymentExpiresAt && (
              <div className="flex-shrink-0">
                <CountdownTimer
                  initialMinutes={initialMinutes}
                  onTimeout={() => {
                    toast.error("Hết thời gian thanh toán");
                    navigate(-1);
                  }}
                />
              </div>
            )}
          </div>
        </div>
      )}

      {/* PAYMENT SECTION */}
      <div className="bg-black w-full pb-10">
        <div className="mx-10 lg:mx-auto max-w-[1200px] pt-10">
          <h1 className="text-2xl font-bold mb-10 text-[#2dc275]">
            THANH TOÁN
          </h1>

          <div className="flex flex-1 gap-5">
            {/* FORM - LEFT SIDE */}
            <div className="flex-7">
              <div className="flex flex-col gap-6 text-white">
                {/* Receiver Info */}
                <div className="bg-[#38383d] p-4 rounded-2xl">
                  <h3 className="text-[#2dc275] text-lg font-semibold mb-4">
                    Thông tin nhận vé
                  </h3>
                  <p className="text-sm text-gray-300">
                    Vé điện tử sẽ được hiển thị trong mục <b>"Vé của tôi"</b> của tài khoản <br />
                    <span className="font-semibold">{state.receiverEmail || state.receiverName}</span>
                  </p>
                </div>

                {/* Voucher Section */}
                <div className="bg-[#38383d] p-4 rounded-2xl">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-[#2dc275] text-lg font-semibold">
                      Mã khuyến mãi
                    </h3>
                    <a href="#" className="text-[#2dc275] text-sm hover:underline">
                      Chọn voucher
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400">+</span>
                    <input
                      type="text"
                      placeholder="Thêm khuyến mãi"
                      className="bg-transparent border border-gray-600 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 flex-1 focus:outline-none focus:border-[#2dc275]"
                    />
                  </div>
                </div>

                {/* Payment Method */}
                <div className="bg-[#38383d] p-4 rounded-2xl">
                  <h3 className="text-[#2dc275] text-lg font-semibold mb-4">
                    Phương thức thanh toán
                  </h3>
                  <div className="space-y-3">
                    {[
                      { value: "VNPAY", label: "VNPAY/Ứng dụng ngân hàng", icon: "💳" },
                      { value: "VIETQR", label: "VietQR", icon: "📱" },
                      { value: "SHOPEEPAY", label: "ShopeePay", icon: "🛍️" },
                      { value: "ZALOPAY", label: "Zalopay", icon: "💰" },
                      { value: "CARD", label: "Thẻ ghi nợ/Thẻ tín dụng", icon: "💳" },
                    ].map((method) => (
                      <div
                        key={method.value}
                        onClick={() => setPaymentMethod(method.value)}
                        className={`border rounded-lg p-3 cursor-pointer transition-all flex items-center gap-3 ${
                          paymentMethod === method.value
                            ? "border-[#2dc275] bg-[#2dc275]/10"
                            : "border-gray-600 bg-gray-800/30"
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                            paymentMethod === method.value
                              ? "border-[#2dc275]"
                              : "border-gray-600"
                          }`}
                        >
                          {paymentMethod === method.value && (
                            <div className="w-3 h-3 rounded-full bg-[#2dc275]"></div>
                          )}
                        </div>
                        <span className="text-sm text-white font-medium">{method.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* ORDER INFO - RIGHT SIDE */}
            <div className="flex-3 flex flex-col gap-4">
              {/* Ticket Details Box */}
              <div className="bg-white text-black rounded-xl overflow-hidden h-fit">
                <div className="p-4 border-b border-gray-300">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-base">Thông tin đặt vé</h3>
                    <a href="#" className="text-blue-600 text-xs hover:underline">
                      Chọn lại vé
                    </a>
                  </div>
                </div>

                <div className="p-4">
                  {cartDetails && cartDetails.length > 0 ? (
                    <div className="space-y-3">
                      {cartDetails.map((item) => (
                        <div key={item.id} className="flex justify-between items-start">
                          <div className="flex-1">
                            <p className="font-semibold text-sm">{item.ticketType?.type ?? "Loại vé"}</p>
                            <p className="text-xs text-gray-600 mt-1">
                              {item.price.toLocaleString("vi-VN")} đ
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-semibold">x{item.quantity}</p>
                            <p className="text-xs text-gray-600 mt-1">
                              {(item.price * item.quantity).toLocaleString("vi-VN")} đ
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-600">Giỏ hàng trống</p>
                  )}
                </div>
              </div>

              {/* Order Info & Total Box */}
              <div className="bg-white text-black rounded-xl overflow-hidden h-fit">
                <div className="p-4 border-b border-gray-300">
                  <h3 className="font-semibold text-sm mb-3">Thông tin đơn hàng</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Tạm tính</span>
                      <span className="text-gray-600">{totalPrice.toLocaleString("vi-VN")} đ</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gray-50">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-bold text-base">Tổng tiền</span>
                    <span className="font-bold text-lg text-[#2dc275]">
                      {totalPrice.toLocaleString("vi-VN")} đ
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mb-4 leading-relaxed">
                    Bằng cách thanh toán, bạn đã đồng ý với Điều khoản Dịch vụ Chung
                  </p>
                  <Button
                    type="button"
                    disabled={isProcessing}
                    className="w-full bg-[#2dc275] hover:bg-[#25a860] text-white py-3 rounded-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handleSubmit}
                  >
                    {isProcessing ? "Đang xử lý..." : "Thanh toán"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentForm;
