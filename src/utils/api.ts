import axios from "axios";
import { API_BASE_URL, API_ENDPOINTS } from "../constants";

// axios 인스턴스 생성
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// 응답 인터셉터: Access Token 만료 시 자동 재발급
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 401 에러 && 아직 재시도하지 않은 요청인 경우
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Refresh Token으로 Access Token 재발급
        await postRefreshAccessToken();
        // 기존 요청 재시도
        return apiClient(originalRequest);
      } catch (refreshError) {
        // 재발급 실패 → 로그아웃 처리
        window.location.href = "/";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

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
    console.error("[postQuestionRequest] 질문 요청 중 오류 발생: ", error);
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
    console.error(`[postUserAnswer] API 요청 중 오류 발생 (questionId: ${questionId}): `, error);
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
    console.error(`[getAllAnswer] API 요청 중 오류 발생 (userId: ${userId}): `, error);
    throw error;
  }
};

// 깃허브 로그인 요청
export const postGithubLogin = async (code: string) => {
  try {
    const response = await apiClient.post(`/${API_ENDPOINTS.AUTH.LOGIN}`, { code });

    return response.data;
  } catch (error) {
    console.error("[postGithubLogin] GitHub 로그인 중 오류 발생: ", error);
    throw error;
  }
};

// 현재 로그인한 유저 정보 가져오기
export const getCurrentUser = async () => {
  try {
    const response = await apiClient.get(`/${API_ENDPOINTS.AUTH.ME}`);

    return response.data;
  } catch (error) {
    console.error("[getCurrentUser] 로그인 정보 가져오는 중 오류 발생: ", error);
    throw error;
  }
};

// 깃허브 로그아웃 요청
export const postGithubLogout = async () => {
  try {
    await apiClient.post(`/${API_ENDPOINTS.AUTH.LOGOUT}`);
  } catch (error) {
    console.error("[githubLogout] GitHub 로그아웃 중 오류 발생:", error);
    throw error;
  }
};

// Refresh Token으로 Access Token 재발급
export const postRefreshAccessToken = async () => {
  try {
    await apiClient.post(`/${API_ENDPOINTS.AUTH.REFRESH}`);
  } catch (error) {
    console.error("[postRefreshAccessToken] 토큰 재발급 실패:", error);
    throw error;
  }
};
