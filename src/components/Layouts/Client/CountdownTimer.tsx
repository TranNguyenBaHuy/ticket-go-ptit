import { useEffect, useState } from "react";

interface CountdownTimerProps {
  initialMinutes?: number;
  onTimeout?: () => void;
}

const CountdownTimer = ({ initialMinutes = 15, onTimeout }: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(Math.round(initialMinutes * 60)); // giây

  useEffect(() => {
    if (timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  useEffect(() => {
    if (timeLeft === 0) {
      onTimeout?.();
    }
  }, [timeLeft, onTimeout]);

  const minutes = Math.floor(timeLeft / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (timeLeft % 60).toString().padStart(2, "0");

  return (
    <div className="backdrop-blur-sm bg-white/20 rounded-xl px-4 py-9 flex flex-col items-center shadow-lg border border-white/40">
      <p className="text-sm sm:text-base text-gray-200 font-medium mb-4">
        Hoàn tất đặt vé trong
      </p>
      <div className="flex items-center gap-3">
        <div className="bg-[#ff424e] text-white font-bold text-lg sm:text-2xl rounded-3xl px-5.5 py-5.5 min-w-[60px] text-center tabular-nums">
          {minutes}
        </div>
        <span className="text-white text-xl sm:text-3xl font-bold">:</span>
        <div className="bg-[#ff424e] text-white font-bold text-lg sm:text-2xl rounded-3xl px-5.5 py-5.5 min-w-[60px] text-center tabular-nums">
          {seconds}
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
