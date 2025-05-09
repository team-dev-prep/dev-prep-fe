// 📌질문/답변 관련 API

import { API_ENDPOINTS } from "../constants";
import { apiClient } from "./core";

// 맛보기 로직용 직무 선택
export const postJobIdOption = async (jobId: number) => {
  try {
    const response = await apiClient.post(`/${API_ENDPOINTS.PRE_QUESTION}`, {
      jobId,
    });

    return response.data;
  } catch (error) {
    console.error("[postJobIdOption] 요청 실패:", error);
    throw new Error("맛보기용 인터뷰 시작 요청에 실패했어요. 잠시 후 다시 시도해주세요.");
  }
};

// 직무, 질문 개수 선택
export const postQuestionOption = async (
  jobId: number,
  personalityCount: number,
  techCount: number,
) => {
  try {
    const response = await apiClient.post(`/${API_ENDPOINTS.QUESTION}`, {
      jobId,
      personalityCount,
      techCount,
    });

    return response.data;
  } catch (error) {
    console.error("[postQuestionOption] 요청 실패:", error);
    throw new Error("인터뷰 시작 요청에 실패했어요. 잠시 후 다시 시도해주세요.");
  }
};

// 답변 제출
export const postUserAnswer = async ({
  userId,
  questionId,
  userAnswer,
}: {
  userId: number;
  questionId: number;
  userAnswer: string;
}) => {
  try {
    const response = await apiClient.post(`/${API_ENDPOINTS.ANSWERS}`, {
      userId,
      questionId,
      userAnswer,
    });

    return response.data;
  } catch (error) {
    console.error("[postUserAnswer] 요청 실패:", error);
    throw new Error("답변 제출에 실패했어요. 네트워크 상태를 확인해주세요.");
  }
};

// 모든 질문 및 답안 조회
export const getAllAnswer = async (userId: number) => {
  try {
    const response = await apiClient.get(`/${API_ENDPOINTS.RESULT}`, {
      params: { userId },
    });

    return response.data;
  } catch (error) {
    console.error("[getAllAnswer] 요청 실패:", error);
    throw new Error("답변 결과를 불러오는 데 실패했어요. 잠시 후 다시 시도해주세요.");
  }
};
