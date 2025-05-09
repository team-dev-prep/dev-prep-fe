import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postQuestionOption } from "../api/question";
import { Button, SelectBox } from "../components/common";
import { ROUTES } from "../constants";
import showToast from "../utils/toast";

const InterviewSetupPage = () => {
  const navigate = useNavigate();

  // 선택된 옵션 상태
  const [jobId, setJobId] = useState("");
  const [technicalCount, setTechnicalCount] = useState("");
  const [personalityCount, setPersonalityCount] = useState("");

  // 드롭다운 옵션
  const jobOptions = [
    { label: "프론트엔드", value: "0" },
    { label: "백엔드", value: "1" },
  ];
  const countOptions = Array.from({ length: 10 }, (_, i) => {
    const val = (i + 1).toString();
    return { label: val, value: val };
  });

  // 질문 요청 API 호출
  const mutation = useMutation({
    mutationFn: () =>
      postQuestionOption(Number(jobId), Number(personalityCount), Number(technicalCount)),
    onSuccess: (data) => {
      navigate(`/${ROUTES.INTERVIEW}`, { state: data });
    },
    onError: (error) => {
      showToast({ type: "error", message: (error as Error).message });
    },
  });

  // 모든 항목이 선택됐을 때만 인터뷰 시작
  const handleStartInterview = () => {
    if (!jobId || !personalityCount || !technicalCount) {
      showToast({ type: "error", message: "모든 항목을 선택해주세요." });
      return;
    }

    mutation.mutate();
  };

  return (
    <div className="flex w-full max-w-[1200px] flex-col" style={{ height: "calc(100vh - 130px)" }}>
      {/* 옵션 선택 영역 */}
      <div className="flex flex-1 items-center justify-center">
        <div className="flex flex-col gap-[32px]">
          <div className="flex items-center justify-center gap-[24px]">
            <div className="text-2xl font-semibold">직무 선택</div>
            <SelectBox
              options={jobOptions}
              placeholder="인터뷰를 진행할 직무를 선택하세요 (프론트/백)"
              value={jobId}
              onChange={setJobId}
            />
          </div>

          <div className="flex items-center justify-center gap-[24px]">
            <div className="text-2xl font-semibold">인성 질문</div>
            <SelectBox
              options={countOptions}
              placeholder="인성 질문 개수를 선택하세요 (최대 10개)"
              value={personalityCount}
              onChange={setPersonalityCount}
            />
          </div>

          <div className="flex items-center justify-center gap-[24px]">
            <div className="text-2xl font-semibold">기술 질문</div>
            <SelectBox
              options={countOptions}
              placeholder="기술 질문 개수를 선택하세요 (최대 10개)"
              value={technicalCount}
              onChange={setTechnicalCount}
            />
          </div>
        </div>
      </div>

      {/* 버튼 영역 */}
      <div className="flex justify-end px-4 py-6">
        <Button
          label="인터뷰 시작하기"
          onClick={handleStartInterview}
          className="bg-blue3 text-lg text-white shadow-md"
        />
      </div>
    </div>
  );
};

export default InterviewSetupPage;
