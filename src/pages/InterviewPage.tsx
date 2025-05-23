import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { postUserAnswer } from "../api/question";
import { AnswerInput, Button, Counter, Question, Timer } from "../components/common";
import { ROUTES } from "../constants";
import showToast from "../utils/toast";

const InterviewPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userId, interviewId, totalCount, questions } = location.state;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [canSubmit, setCanSubmit] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false); // 중복 제출 방지용 플래그

  const currentQuestion = questions[currentQuestionIndex];

  // 다음 질문으로 이동하거나 마지막 질문이면 결과 페이지로 이동
  const moveToNext = () => {
    const isLast = currentQuestionIndex === questions.length - 1;

    if (isLast) {
      showToast({
        type: "success",
        message: "모든 답변이 성공적으로 제출되었어요. 결과 페이지로 이동할게요.",
      });
      navigate(`/${ROUTES.FEEDBACK}`, { state: { userId, interviewId } });
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
        interviewId,
        questionId: currentQuestion.id,
        userAnswer: answer,
      }),
    onSuccess: () => {
      moveToNext();
    },
    onError: (error) => {
      showToast({ type: "error", message: (error as Error).message });
    },
  });

  // 질문 전환 시 버튼 및 제출 상태 초기화
  useEffect(() => {
    setHasSubmitted(false);
    setCanSubmit(false);

    const timer = setTimeout(() => {
      setCanSubmit(true);
    }, 3000); // 출시 전까지는 3초로 진행

    return () => clearTimeout(timer);
  }, [currentQuestionIndex]);

  const handleAutoSubmit = () => {
    if (!hasSubmitted) {
      setHasSubmitted(true);
      mutation.mutate();
    }
  };

  return (
    <div
      className="mx-auto flex w-full max-w-[1200px] flex-col"
      style={{ height: "calc(100vh - 130px)" }}
    >
      {/* 타이머 영역 */}
      <div className="flex w-full justify-center py-6">
        <Timer
          key={currentQuestion.id}
          time={currentQuestion.time}
          onBeforeEnd={() => {
            showToast({ type: "info", message: "10초 후에 다음 질문으로 넘어갑니다!" });
          }}
          onTimeOver={handleAutoSubmit}
        />
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
              if (!hasSubmitted) {
                setHasSubmitted(true);
                mutation.mutate();
              }
            }}
            className="bg-blue3 text-lg text-white shadow-md"
            disabled={!canSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default InterviewPage;
