import { useEffect, useState } from "react";

interface TimerProps {
  time: number;
}

const Timer = ({ time }: TimerProps) => {
  const [remaining, setRemaining] = useState(time);

  useEffect(() => {
    if (remaining <= 0) {
      alert("시간이 종료되었습니다.");
      return;
    }

    const interval = setInterval(() => {
      setRemaining((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [remaining]);

  const minutes = String(Math.floor(remaining / 60)).padStart(2, "0");
  const seconds = String(remaining % 60).padStart(2, "0");

  return (
    <div className="flex flex-col items-center">
      <div className="flex h-[100px] w-[200px] items-center justify-center rounded-lg border-2 border-solid border-gray3 bg-gray2 font-keania text-5xl shadow-md">
        {minutes}:{seconds}
      </div>
      <p className="mt-2 text-sm text-gray8">! 주어진 시간 내에 질문에 대한 답을 작성하세요 !</p>
    </div>
  );
};

export default Timer;
