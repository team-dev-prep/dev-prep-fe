import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AnswerInput, Button, Counter, Question, Timer } from "../components/common";
import { ROUTES } from "../constants";
import showToast from "../utils/toast";

interface Question {
  id: number;
  content: string;
  modelAnswer: string;
  time: number;
}

const PreInterviewPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { total, questions } = location.state;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [userAnswers, setUserAnswers] = useState<string[]>([]);

  const currentQuestion = questions[currentQuestionIndex];

  const handleNext = () => {
    const updatedAnswers = [...userAnswers, answer];

    if (currentQuestionIndex === questions.length - 1) {
      const feedbackData = questions.map((q: Question, i: number) => ({
        id: q.id,
        content: q.content,
        modelAnswer: q.modelAnswer,
        userAnswer: updatedAnswers[i],
      }));

      showToast({ type: "info", message: "모든 답변이 제출되었어요. 결과 페이지로 이동합니다." });

      navigate(`/${ROUTES.PRE_FEEDBACK}`, {
        state: { results: feedbackData, totalCount: total },
      });
    } else {
      setUserAnswers(updatedAnswers);
      setCurrentQuestionIndex((prev) => prev + 1);
      setAnswer("");
    }
  };

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
          <AnswerInput
            key={currentQuestion.id}
            isFixedHeight={true}
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
        </div>
      </div>

      <div className="flex w-full max-w-[1200px] items-center justify-between p-4 pt-6">
        <div className="flex-1"></div>
        <Counter current={currentQuestionIndex + 1} total={total} />
        <div className="flex flex-1 justify-end">
          <Button
            label={currentQuestionIndex === questions.length - 1 ? "결과 보기" : "다음"}
            onClick={(event) => {
              event.preventDefault();
              handleNext();
            }}
            className="bg-blue3 text-lg text-white shadow-md"
          />
        </div>
      </div>
    </div>
  );
};

export default PreInterviewPage;
