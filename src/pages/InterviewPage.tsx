import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { postUserAnswer } from "../api/question";
import { AnswerInput, Button, Counter, Question, Timer } from "../components/common";
import { ROUTES } from "../constants";
import showToast from "../utils/toast";

const InterviewPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userId, totalCount, questions } = location.state;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState("");

  const currentQuestion = questions[currentQuestionIndex];

  // 다음 질문으로 이동하거나 마지막 질문이면 결과 페이지로 이동
  const moveToNext = () => {
    const isLast = currentQuestionIndex === questions.length - 1;

    if (isLast) {
      showToast({
        type: "success",
        message: "모든 답변이 성공적으로 제출되었어요. 결과 페이지로 이동할게요.",
      });
      navigate(`/${ROUTES.FEEDBACK}`, { state: { userId } });
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
      setAnswer("");
    }
  };

  // 답변 제출 API 요청
  const mutation = useMutation({
    mutationFn: () =>
      postUserAnswer({
        userId,
        questionId: currentQuestion.id,
        userAnswer: answer,
      }),
    onSuccess: () => moveToNext(),
    onError: (error) => {
      showToast({ type: "error", message: (error as Error).message });
    },
  });

  return (
    <div
      className="mx-auto flex w-full max-w-[1200px] flex-col"
      style={{ height: "calc(100vh - 130px)" }}
    >
      {/* 타이머 영역 */}
      <div className="flex w-full justify-center py-6">
        <Timer key={currentQuestion.id} time={currentQuestion.time} />
      </div>

      {/* 질문 및 답변 입력 영역 */}
      <div className="flex w-full max-w-[1200px] flex-1 flex-col px-4">
        <Question text={currentQuestion.content} />
        <div className="flex flex-1">
          <AnswerInput
            key={currentQuestion.id}
            isFixedHeight={true}
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
        </div>
      </div>

      {/* 하단 네비게이션 영역 */}
      <div className="flex w-full max-w-[1200px] items-center justify-between p-4 pt-6">
        <div className="flex-1"></div>
        <Counter current={currentQuestionIndex + 1} total={totalCount} />
        <div className="flex flex-1 justify-end">
          <Button
            label={currentQuestionIndex === questions.length - 1 ? "결과 보기" : "다음"}
            onClick={(event) => {
              event.preventDefault();
              mutation.mutate();
            }}
            className="bg-blue3 text-lg text-white shadow-md"
          />
        </div>
      </div>
    </div>
  );
};

export default InterviewPage;
