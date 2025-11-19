import PaymentMethods from "@/components/Layouts/Client/PaymentMethods";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

// type Props = {
//   visible: boolean;
// };

const PaymentForm = () => {
  const [paymentMethod, setPaymentMethod] = useState("vnpay");

  const handleSelect = (value: string) => {
    setPaymentMethod(value);
  };

  const handleSubmit = () => {
    toast.success("Thành công");
  };

  return (
    <>
      <div className="flex flex-1 gap-5 mx-10 lg:mx-auto max-w-[1200px]">
        {/* FORM */}
        <div className="flex-7">
          <h1 className="text-2xl font-bold my-10 text-[#2dc275]">
            THANH TOÁN
          </h1>

          <div className="flex flex-col gap-10 text-white">
            <div className="bg-[#38383d] p-4 rounded-2xl">
              <h3 className="text-[#2dc275] text-lg font-semibold ">
                Thông tin nhận vé
              </h3>

              <p className="text-sm line-clamp-2 mt-4">
                Vé điện tử sẽ được hiển thị trong mục <b>"Vé của tôi"</b> của
                tài khoản <br />
                trannguyenbahuy2908@gmail.com
              </p>
              <div className="space-y-6"></div>
            </div>

            {/* <div className="bg-[#38383d] p-4 rounded-2xl">
              <h3 className="text-[#2dc275] text-lg font-semibold ">
                Mã khuyến mãi
              </h3>
              <div className="space-y-6">
                
              </div>
            </div> */}

            <div className="bg-[#38383d] p-4 rounded-2xl">
              <h3 className="text-[#2dc275] text-lg font-semibold ">
                Phương thức thanh toán
              </h3>
              <PaymentMethods
                onSelect={handleSelect}
                selected={paymentMethod}
              />
            </div>
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
            // type="submit"
            type="button"
            className="w-full bg-[#2dc275] hover:bg-black hover:text-white text-white py-6 rounded-lg text-lg"
            onClick={handleSubmit}
          >
            Tiếp tục
          </Button>
        </div>
      </div>
    </>
  );
};

export default PaymentForm;
