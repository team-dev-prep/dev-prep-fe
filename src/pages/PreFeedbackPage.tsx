import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AnswerInput, Button, Counter, Modal, ModelAnswer, Question } from "../components/common";
import { ROUTES } from "../constants";
import redirectToGithubAuthorize from "../utils/oauth";

const PreFeedbackPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { results, totalCount } = location.state ?? {};

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 결과가 없을 경우 홈으로 이동
  useEffect(() => {
    if (!results || !totalCount) {
      navigate(ROUTES.ROOT, { replace: true });
    }
  }, [results, totalCount, navigate]);

  const currentItem = results?.[currentQuestionIndex];
  if (!currentItem) return null;

  // 다음 질문으로 넘어가거나 마지막이면 모달 오픈
  const handleNextOrExit = () => {
    const isLast = currentQuestionIndex === results.length - 1;

    if (isLast) {
      setIsModalOpen(true);
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  return (
    <div
      className="mx-auto flex h-full w-full max-w-[1200px] flex-col"
      style={{ height: "calc(100vh - 130px)" }}
    >
      {/* 회원가입 유도 모달 */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="지금, 더 깊이 있는 인터뷰 경험을 시작해보세요"
        content={
          <>
            <p className="mb-2">지금 회원가입하면,</p>
            <ul className="list-disc pl-5">
              <li>다양한 직무 및 난이도의 질문을 자유롭게 선택할 수 있습니다.</li>
              <li>AI 분석 기반의 구조화된 피드백으로 역량을 성장시켜보세요.</li>
            </ul>
          </>
        }
        actions={
          <>
            <Button
              className="border border-blue3 bg-blue3 text-white"
              onClick={() => redirectToGithubAuthorize()}
            >
              회원가입 후 인터뷰 이어가기
            </Button>
            <Button className="border border-gray4 text-blue3" onClick={() => navigate("/")}>
              홈으로 돌아가기
            </Button>
          </>
        }
      />

      {/* 피드백 본문 영역 */}
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

export default PreFeedbackPage;
