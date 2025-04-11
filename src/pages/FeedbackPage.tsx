import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AnswerInput, Button, Counter, ModelAnswer, Question } from "../components/common";
import { getAllAnswer } from "../utils/api";

const FeedbackPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userId = location.state?.userId;
  
  // Redirect if no userId is provided
  useEffect(() => {
    if (!userId) {
      navigate('/', { replace: true });
    }
  }, [userId, navigate]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["answerResult", userId],
    queryFn: () => getAllAnswer(userId),
    enabled: !!userId,
  });

  if (isLoading) return <p>로딩 중...</p>;
  if (isError || !data) return <p>답변을 불러오는 데 실패했습니다.</p>;

  const { totalCount, results } = data;
  const currentItem = results[currentQuestionIndex];

  return (
    <div
      className="mx-auto flex h-full w-full max-w-[1200px] flex-col"
      style={{ height: "calc(100vh - 130px)" }}
    >
      <div className="flex w-full max-w-[1200px] flex-1 flex-col px-4 py-6">
        <Question text={currentItem.content} />
        <div className="mb-2 flex flex-col">
          <span className="py-1 font-[600] text-gray8">작성 답안</span>
          <AnswerInput value={currentItem.userAnswer} readOnly={true} />
        </div>
        <div className="flex flex-col">
          <span className="py-1 font-[600] text-gray8">모범 답안</span>
          <ModelAnswer text={currentItem.modelAnswer} />
        </div>
      </div>

      <div className="flex w-full max-w-[1200px] items-center justify-between p-4 pt-6">
        <div className="flex-1"></div>
        <Counter current={currentQuestionIndex + 1} total={totalCount} />
        <div className="flex flex-1 justify-end">
          {currentQuestionIndex === results.length - 1 ? (
            <Button label="나가기" onClick={() => navigate("/")} />
          ) : (
            <Button label="다음" onClick={() => setCurrentQuestionIndex((prev) => prev + 1)} />
          )}
        </div>
      </div>
    </div>
  );
};

export default FeedbackPage;
