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

export const getAllAnswer = async (id: number) => {
  try {
    const response = await apiClient.get(
      `/${API_ENDPOINTS.INTERVIEW}/${API_ENDPOINTS.RESULT}/${id}`,
    );
    return response.data;
  } catch (error) {
    console.error(`[getAllAnswer] API 요청 중 오류 발생 (id: ${id}):`, error);
    throw error;
  }
};
