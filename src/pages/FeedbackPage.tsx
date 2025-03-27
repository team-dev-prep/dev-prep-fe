import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { AnswerInput, Button, Counter, ModelAnswer, Question } from "../components/common";
import { getAllAnswer } from "../utils/api";

const FeedbackPage = () => {
  const questionId = 1; // 현재 MVP에서는 1번 질문만 조회 가능
  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["answerResult", questionId],
    queryFn: () => getAllAnswer(questionId),
  });

  if (isLoading) return <p>로딩 중...</p>;
  if (isError) return <p>답변을 불러오는 데 실패했습니다.</p>;

  return (
    <div
      className="mx-auto flex h-full w-full max-w-[1200px] flex-col"
      style={{ height: "calc(100vh - 130px)" }}
    >
      <div className="flex w-full max-w-[1200px] flex-1 flex-col px-4 py-6">
        <Question text={data.question} />
        <div className="mb-2 flex flex-col">
          <span className="py-1 font-[600] text-gray8">작성 답안</span>
          <AnswerInput value={data.userAnswer} readOnly={true} />
        </div>
        <div className="flex flex-col">
          <span className="py-1 font-[600] text-gray8">모범 답안</span>
          <ModelAnswer text={data.modelAnswer} />
        </div>
      </div>

      <div className="flex w-full max-w-[1200px] items-center justify-between p-4 pt-6">
        <div className="flex-1"></div>
        <Counter current={1} total={1} />
        <div className="flex flex-1 justify-end">
          <Button label="나가기" onClick={() => navigate("/")} />
        </div>
      </div>
    </div>
  );
};

export default FeedbackPage;
