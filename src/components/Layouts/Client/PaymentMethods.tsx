import { paymentMethods } from "@/constants/data/paymentMethods";

interface Props {
  selected: string;
  onSelect: (value: string) => void;
}

const PaymentMethods = ({ selected, onSelect }: Props) => {
  return (
    <div className="mx-3 flex flex-col gap-2 ">
      {paymentMethods.map((method) => (
        <label
          key={method.value}
          className="flex items-center gap-3 cursor-pointer p-3 rounded-xl hover:bg-[#2d2d2d]"
        >
          <input
            type="radio"
            name="payment"
            value={method.value}
            checked={selected === method.value}
            onChange={() => onSelect(method.value)}
            className="w-6 h-6"
          />

          <img src={method.icon} alt="" className="w-8 h-8 object-contain" />

          <p className="text-white font-medium">{method.label}</p>
          {/* 
          {method.brands && (
            <div className="flex items-center gap-2">
              {method.brands.map((brand, i) => (
                <img
                  key={i}
                  src={brand}
                  className="w-10 object-contain"
                  alt="brand"
                />
              ))}
            </div>
          )} */}
        </label>
      ))}
    </div>
  );
};

export default PaymentMethods;
