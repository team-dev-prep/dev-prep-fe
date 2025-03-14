import { useEffect, useState } from "react";

const Timer = () => {
  const [time, setTime] = useState(600); // 10분 타이머

  useEffect(() => {
    if (time <= 0) return;

    const interval = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [time]);

  const minutes = String(Math.floor(time / 60)).padStart(2, "0");
  const seconds = String(time % 60).padStart(2, "0");

  return (
    <div className="flex flex-col items-center">
      <div className="bg-gray2 font-keania border-gray3 flex h-[100px] w-[200px] items-center justify-center rounded-lg border-2 border-solid text-5xl shadow-md">
        {minutes}:{seconds}
      </div>
      <p className="text-gray8 mt-2 text-sm">! 주어진 시간 내에 질문에 대한 답을 작성하세요 !</p>
    </div>
  );
};

export default Timer;
