import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AnswerInput, Button, Counter, ModelAnswer, Question } from "../components/common";
import { ROUTES } from "../constants";

const PreFeedbackPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { results, totalCount } = location.state ?? {};

  useEffect(() => {
    if (!results || !totalCount) {
      navigate(ROUTES.ROOT, { replace: true });
    }
  }, [results, totalCount, navigate]);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const currentItem = results?.[currentQuestionIndex];

  if (!currentItem) return null;

  return (
    <div
      className="mx-auto flex h-full w-full max-w-[1200px] flex-col"
      style={{ height: "calc(100vh - 130px)" }}
    >
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

      <div className="flex w-full max-w-[1200px] items-center justify-between p-4 pt-6">
        <div className="flex-1"></div>
        <Counter current={currentQuestionIndex + 1} total={totalCount} />
        <div className="flex flex-1 justify-end">
          {currentQuestionIndex === results.length - 1 ? (
            <Button
              label="나가기"
              onClick={() => navigate(ROUTES.ROOT)}
              className="bg-blue3 text-lg text-white shadow-md"
            />
          ) : (
            <Button
              label="다음"
              onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
              className="bg-blue3 text-lg text-white shadow-md"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PreFeedbackPage;
