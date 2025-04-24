// 📌질문/답변 관련 API

import { API_ENDPOINTS } from "../constants";
import { apiClient } from "./core";

// 질문 개수 선택
export const postQuestionOption = async (techCount: number, personalityCount: number) => {
  try {
    const response = await apiClient.post(`/${API_ENDPOINTS.QUESTION}`, {
      techCount,
      personalityCount,
      jobId: 0, // 현재는 무조건 프론트엔드
    });

    return response.data;
  } catch (error) {
    console.error("[postQuestionOption] 요청 실패:", error);

    throw error;
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

    throw error;
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

    throw error;
  }
};
