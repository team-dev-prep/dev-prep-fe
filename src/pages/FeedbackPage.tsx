import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getAllAnswer } from "../api/question";
import { AnswerInput, Button, Counter, ModelAnswer, Question } from "../components/common";
import { ROUTES } from "../constants";

const FeedbackPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userId = location.state?.userId;

  // userId가 없으면 홈으로 리다이렉트
  useEffect(() => {
    if (!userId) {
      navigate(ROUTES.ROOT, { replace: true });
    }
  }, [userId, navigate]);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // 답변 데이터 불러오기
  const { data, isLoading, isError } = useQuery({
    queryKey: ["answerResult", userId],
    queryFn: () => getAllAnswer(userId),
    enabled: !!userId,
  });

  // 로딩 및 에러 처리
  if (isLoading) return <p>로딩 중...</p>;
  if (isError || !data) return <p>답변을 불러오는 데 실패했습니다.</p>;

  const { totalCount, results } = data;
  const currentItem = results[currentQuestionIndex];

  // 다음 질문으로 이동하거나 마지막엔 홈으로
  const handleNextOrExit = () => {
    const isLast = currentQuestionIndex === results.length - 1;

    if (isLast) {
      navigate(ROUTES.ROOT);
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  return (
    <div
      className="mx-auto flex h-full w-full max-w-[1200px] flex-col"
      style={{ height: "calc(100vh - 130px)" }}
    >
      {/* 질문 및 답변 표시 영역 */}
      <div className="flex w-full max-w-[1200px] flex-1 flex-col px-4 py-6">
        <Question text={currentItem.content} />
        <div className="mb-2 flex flex-col">
          <span className="py-1 font-semibold text-gray8">작성 답안</span>
          <AnswerInput value={currentItem.userAnswer} readOnly={true} />
        </div>
        <div className="flex flex-col">
          <span className="py-1 font-semibold text-gray8">모범 답안</span>
          <ModelAnswer text={currentItem.modelAnswer} />
        </div>
      </div>

      {/* 하단 네비게이션 영역 */}
      <div className="flex w-full max-w-[1200px] items-center justify-between p-4 pt-6">
        <div className="flex-1"></div>
        <Counter current={currentQuestionIndex + 1} total={totalCount} />
        <div className="flex flex-1 justify-end">
          <Button
            label={currentQuestionIndex === results.length - 1 ? "나가기" : "다음"}
            onClick={handleNextOrExit}
            className="bg-blue3 text-lg text-white shadow-md"
          />
        </div>
      </div>
    </div>
  );
};

export default FeedbackPage;
