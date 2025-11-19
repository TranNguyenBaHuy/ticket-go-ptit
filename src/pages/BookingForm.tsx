import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Event } from "@/constants/types/types";
import { Calendar, MapPin } from "lucide-react";
import { formatDateTimeDisplay } from "@/utils/utils";
import CountdownTimer from "../components/Layouts/Client/CountdownTimer";
import PaymentForm from "./PaymentForm";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const Schema = z.object({
  name: z.string().min(1, "Vui lòng nhập họ tên"),
  email: z.string().email("Email không hợp lệ"),
  phone: z.string().min(9, "Số điện thoại không hợp lệ"),
});

const BookingForm = () => {
  const { id } = useParams();
  const [event, setEvent] = useState<Event>();
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");
  const [showPayment, setShowPayment] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(Schema),
  });

  const onSubmit = (data: any) => {
    console.log("Form data:", data);
    toast.success("Đặt vé thành công! Mời bạn thanh toán");
    setShowPayment(true);
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(`/api/events/${String(id)}`);

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Sự kiện không tồn tại. Mời bạn chọn sự kiện khác");
          }
          throw new Error(`Error when loaded data: ${response.statusText}`);
        }
        const result = await response.json();
        setEvent(result);
      } catch (err: any) {
        setError(err.message);
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    window.scrollTo(0, 0);

    fetchEvents();
  }, []);

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        setIsLoading(true);

        const response = await fetch(`/api/carts/checkout?page=1&limit=1`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) return;

        const result = await response.json();

        console.log("FETCH CART DATA", result.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (token) {
      fetchCartData();
    }
  }, [token]);

  if (loading) {
    return (
      <div className="flex flex-1 min-h-screen bg-black text-white text-xl items-center justify-center">
        Đang tải...
      </div>
    );
  }

  // Hiển thị PaymentForm khi showPayment = true
  // if (showPayment) {
  //   return <PaymentForm visible={true} />;
  // }

  return (
    <>
      <div className="relative w-full h-62 md:h-72 lg:h-62 overflow-hidden">
        <img
          src={`/images/event/${event?.bannerUrl}`}
          alt={`${event?.title} banner`}
          className="absolute inset-0 w-full h-full object-cover blur-lg"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="flex flex-row items-center justify-between relative mx-10 lg:mx-auto max-w-[1250px] gap-6 md:gap-8  text-white h-full ">
          {/* INFO SECTION */}
          <div className="flex flex-col flex-9 gap-2">
            <h1 className="flex-1 w-full lg:text-3xl sm:text-xl md:text-2xl font-bold mb-2 py-5 border-b-white border-b-1 ">
              {event?.title.toUpperCase()}
            </h1>
            <div className="flex items-center mb-2 gap-2 text-white">
              <Calendar strokeWidth={3} size={24} className="text-white" />
              <p className="font-bold text-xl sm:text-sm lg:text-lg">
                {event?.duration},{" "}
                {event
                  ? formatDateTimeDisplay(event.startDate)
                  : "Chưa có ngày diễn ra"}
              </p>
            </div>
            <div className="flex items-center gap-2 text-white">
              <MapPin strokeWidth={3} size={24} className="text-white" />
              <p className="font-bold text-xl sm:text-sm lg:text-lg">
                {event?.location}
              </p>
            </div>
          </div>
          {/* COUNTDOWN SECTION */}
          <div className="flex-1">
            <CountdownTimer initialMinutes={15} />
          </div>
        </div>
      </div>

      <div className="bg-black w-full flex flex-1 pb-10">
        {!showPayment && (
          <div className="flex flex-1 gap-5 mx-10 lg:mx-auto max-w-[1200px]">
            {/* FORM */}
            <div className="flex-7">
              <h1 className="text-2xl font-bold my-10 text-[#2dc275]">
                BẢNG CÂU HỎI
              </h1>

              <div className="bg-[#38383d] px-4 py-10 rounded-xl shadow-lg">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* NAME */}
                  <div className="flex flex-col gap-3">
                    <Label className="text-white">Họ và tên / Fullname</Label>
                    <Input
                      type="text"
                      placeholder="Nhập họ và tên"
                      className="bg-[#2c2c30] border-gray-600 text-white py-6"
                      {...register("name")}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  {/* EMAIL */}
                  <div className="flex flex-col gap-3">
                    <Label className="text-white">Email</Label>
                    <Input
                      type="email"
                      placeholder="Nhập email"
                      className="bg-[#2c2c30] border-gray-600 text-white py-6"
                      {...register("email")}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* PHONE NUM */}
                  <div className="flex flex-col gap-3">
                    <Label className="text-white">
                      Số điện thoại / Phone Number
                    </Label>
                    <Input
                      type="text"
                      placeholder="Nhập số điện thoại"
                      className="bg-[#2c2c30] border-gray-600 text-white py-6"
                      {...register("phone")}
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>
                </form>
              </div>
            </div>
            {/* ORDER INFO  */}
            <div className="flex flex-col gap-4 bg-white text-black flex-3 mt-28 rounded-xl p-4 h-fit">
              <h3 className="font-semibold text-lg">Thông tin đặt vé</h3>

              <div className="flex flex-col gap-3   border-b-1 border-dashed border-b-gray-600 pb-4">
                {/* TITLE */}
                <div className="flex justify-between">
                  <p className="font-semibold text-md">Loại vé</p>
                  <p className="font-semibold text-md">Số lượng</p>
                </div>

                {/* INFO  */}
                <div className="flex">KHOA VÀ PHƯƠNG</div>
              </div>

              <p className="text-sm text-center text-black/30 font-semibold">
                Vui lòng trả lời tất cả các câu hỏi để tiếp tục
              </p>

              <Button
                type="button"
                onClick={handleSubmit(onSubmit)}
                className="w-full bg-[#2dc275] hover:bg-black hover:text-white text-white py-6 rounded-lg text-lg"
              >
                Tiếp tục
              </Button>
            </div>
          </div>
        )}
        {/* FORM SECTION */}

        {showPayment && <PaymentForm />}
      </div>
    </>
  );
};

export default BookingForm;
