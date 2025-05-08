import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postJobIdOption } from "../api/question";
import { Button, SelectBox } from "../components/common";
import { ROUTES } from "../constants";
import showToast from "../utils/toast";

const PreInterviewSetupPage = () => {
  const navigate = useNavigate();

  const [jobId, setJobId] = useState("");

  const jobOptions = [
    { label: "프론트엔드", value: "0" },
    { label: "백엔드", value: "1" },
  ];

  const mutation = useMutation({
    mutationFn: () => postJobIdOption(Number(jobId)),
    onSuccess: (data) => {
      navigate(`/${ROUTES.PRE_INTERVIEW}`, { state: data });
    },
    onError: (error) => {
      showToast({ type: "error", message: (error as Error).message });
    },
  });

  const handleStartInterview = () => {
    if (!jobId) {
      showToast({ type: "error", message: "직무를 선택해주세요." });
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

export default PreInterviewSetupPage;
