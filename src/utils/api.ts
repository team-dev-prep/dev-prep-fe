import axios from "axios";
import { API_BASE_URL, API_ENDPOINTS } from "../constants";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const postQuestionOption = async (techCount: number, personalityCount: number) => {
  try {
    const response = await apiClient.post(`/${API_ENDPOINTS.QUESTIONS}`, {
      techCount,
      personalityCount,
      jobId: 0, // 현재는 무조건 0 (FE)
    });
    return response.data;
  } catch (error) {
    console.error("[postQuestionRequest] 질문 요청 중 오류:", error);
    throw error;
  }
};

export const getQuestion = async (id: number) => {
  try {
    const response = await apiClient.get(`/${API_ENDPOINTS.INTERVIEW}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`[getQuestion] API 요청 중 오류 발생 (id: ${id}):`, error);
    throw error;
  }
};

export const postUserAnswer = async (questionId: number, content: string) => {
  try {
    const response = await apiClient.post(`/${API_ENDPOINTS.INTERVIEW}/${questionId}`, {
      contents: content,
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
