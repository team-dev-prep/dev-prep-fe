import axios from "axios";
import { API_BASE_URL, API_ENDPOINTS } from "../constants";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// 기술 질문, 인성 질문 개수 선택하기
export const postQuestionOption = async (techCount: number, personalityCount: number) => {
  try {
    const response = await apiClient.post(`/${API_ENDPOINTS.QUESTION}`, {
      techCount,
      personalityCount,
      jobId: 0, // 현재는 무조건 0 (FE)
    });
    return response.data; // userId, totalCount, questions[]
  } catch (error) {
    console.error("[postQuestionRequest] 질문 요청 중 오류:", error);
    throw error;
  }
};

// 질문에 대한 답하기
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
    console.error(`[postUserAnswer] API 요청 중 오류 발생 (questionId: ${questionId}):`, error);
    throw error;
  }
};

// 질문, 사용자 답안, 모범 답안 가져오기
export const getAllAnswer = async (userId: number) => {
  try {
    const response = await apiClient.get(`/${API_ENDPOINTS.RESULT}`, {
      params: { userId },
    });

    return response.data;
  } catch (error) {
    console.error(`[getAllAnswer] API 요청 중 오류 발생 (userId: ${userId}):`, error);
    throw error;
  }
};

// 깃허브 로그인 요청
export const postGithubLogin = async (code: string) => {
  try {
    const response = await apiClient.post(`/${API_ENDPOINTS.AUTH.LOGIN}`, { code });

    return response.data;
  } catch (error) {
    console.error(`[postGithubLogin] GitHub 로그인 중 오류 발생:`, error);
    throw error;
  }
};
