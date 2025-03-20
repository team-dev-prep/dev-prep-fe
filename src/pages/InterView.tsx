import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnswerInput, Button, Counter, Question, Timer } from "../components/common";
import { getQuestion, postUserAnswer } from "../utils/api";

const Interview = () => {
  const questionId = 1; // 현재 MVP에서는 1번 질문만 조회 가능
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  // 질문 조회 API
  const {
    data: question,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["question", questionId],
    queryFn: () => getQuestion(questionId),
  });

  // 답변 제출 API
  const mutation = useMutation({
    mutationFn: () => postUserAnswer(questionId, answer),
    onSuccess: () => {
      alert("답변이 성공적으로 제출되었습니다.");
      navigate("/feedback");
    },
    onError: () => {
      alert("답변 제출에 실패했습니다.");
    },
  });

  if (isLoading) return <p>로딩 중...</p>;
  if (isError || !question) return <p>질문을 불러오는 데 실패했습니다.</p>;

  return (
    <div
      className="mx-auto flex w-full max-w-[1200px] flex-col"
      style={{ height: "calc(100vh - 130px)" }}
    >
      <div className="flex w-full justify-center py-6">
        <Timer />
      </div>

      <div className="flex w-full max-w-[1200px] flex-1 flex-col px-4">
        <Question text={question.content} />
        <div className="flex flex-1">
          <AnswerInput isFixedHeight={true} onChange={(e) => setAnswer(e.target.value)} />
        </div>
      </div>

      <div className="flex w-full max-w-[1200px] items-center justify-between p-4 pt-6">
        <div className="flex-1"></div>
        <Counter current={1} total={1} />
        <div className="flex flex-1 justify-end">
          <Button
            label="결과 보기"
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

export default Interview;
