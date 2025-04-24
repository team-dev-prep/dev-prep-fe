// 📌사용자 인증 관련 API

import { API_ENDPOINTS } from "../constants";
import { apiClient } from "./core";

// GitHub 로그인
export const postGithubLogin = async (code: string) => {
  try {
    const response = await apiClient.post(`/${API_ENDPOINTS.AUTH.LOGIN}`, { code });

    return response.data;
  } catch (error) {
    console.error("[postGithubLogin] 요청 실패:", error);

    throw error;
  }
};

// 현재 로그인 유저 조회
export const getCurrentUser = async () => {
  try {
    const response = await apiClient.get(`/${API_ENDPOINTS.AUTH.ME}`);

    return response.data;
  } catch (error) {
    console.error("[getCurrentUser] 요청 실패:", error);

    throw error;
  }
};

// 로그아웃
export const postGithubLogout = async () => {
  try {
    await apiClient.post(`/${API_ENDPOINTS.AUTH.LOGOUT}`);
  } catch (error) {
    console.error("[postGithubLogout] 요청 실패:", error);

    throw error;
  }
};

// Access Token 재발급 (Refresh Token 기반)
export const postRefreshAccessToken = async () => {
  try {
    await apiClient.post(`/${API_ENDPOINTS.AUTH.REFRESH}`);
  } catch (error) {
    console.error("[postRefreshAccessToken] 요청 실패:", error);

    throw error;
  }
};
