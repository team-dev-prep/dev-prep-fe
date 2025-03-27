import { useState } from "react";
import { Button, SelectBox } from "../components/common";

const InterviewSetupPage = () => {
  const [technicalCount, setTechnicalCount] = useState("");
  const [personalityCount, setPersonalityCount] = useState("");
  const countOptions = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

  return (
    <div className="flex w-full max-w-[1200px] flex-col" style={{ height: "calc(100vh - 130px)" }}>
      {/* 옵션 선택 영역 */}
      <div className="flex flex-1 items-center justify-center">
        <div className="flex flex-col gap-[32px]">
          <div className="flex items-center justify-center gap-[24px]">
            <div className="text-2xl font-[600]">기술 질문</div>
            <SelectBox
              options={countOptions}
              placeholder="기술 질문 개수를 선택하세요 (최대 10개)"
              value={technicalCount}
              onChange={setTechnicalCount}
            />
          </div>

          <div className="flex items-center justify-center gap-[24px]">
            <div className="text-2xl font-[600]">인성 질문</div>
            <SelectBox
              options={countOptions}
              placeholder="인성 질문 개수를 선택하세요 (최대 10개)"
              value={personalityCount}
              onChange={setPersonalityCount}
            />
          </div>
        </div>
      </div>

      {/* 버튼 영역 */}
      <div className="flex justify-end px-4 py-6">
        <Button label="인터뷰 시작하기" />
      </div>
    </div>
  );
};

export default InterviewSetupPage;
