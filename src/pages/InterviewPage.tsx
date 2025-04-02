import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AnswerInput, Button, Counter, Question, Timer } from "../components/common";
import { postUserAnswer } from "../utils/api";

const InterviewPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userId, totalCount, questions } = location.state;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState("");

  const currentQuestion = questions[currentQuestionIndex];

  // 답변 제출 API
  const mutation = useMutation({
    mutationFn: () =>
      postUserAnswer({
        userId,
        questionId: currentQuestion.id,
        userAnswer: answer,
      }),
    onSuccess: () => {
      if (currentQuestionIndex === questions.length - 1) {
        alert("모든 답변이 성공적으로 제출되었습니다.");
        navigate("/feedback", { state: { userId } }); // ✅ 이렇게 수정!
      } else {
        setCurrentQuestionIndex((prev) => prev + 1);
        setAnswer("");
      }
    },
    onError: () => {
      alert("답변 제출에 실패했습니다.");
    },
  });

  return (
    <div
      className="mx-auto flex w-full max-w-[1200px] flex-col"
      style={{ height: "calc(100vh - 130px)" }}
    >
      <div className="flex w-full justify-center py-6">
        <Timer key={currentQuestion.id} time={currentQuestion.time} />
      </div>

      <div className="flex w-full max-w-[1200px] flex-1 flex-col px-4">
        <Question text={currentQuestion.content} />
        <div className="flex flex-1">
          <AnswerInput isFixedHeight={true} onChange={(e) => setAnswer(e.target.value)} />
        </div>
      </div>

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
          />
        </div>
      </div>
    </div>
  );
};

export default InterviewPage;
