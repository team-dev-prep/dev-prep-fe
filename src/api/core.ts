// 📌axios 인스턴스 및 인터셉터 설정

import axios from "axios";
import { API_BASE_URL } from "../constants";
import {
  getAuthState,
  markRefreshAttempted,
  markRefreshFailed,
  resetAuthState,
} from "../state/authState";
import { postRefreshAccessToken } from "./auth";

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
    const { isRefreshAttempted } = getAuthState();

    if (error.response?.status === 401 && !originalRequest._retry && !isRefreshAttempted) {
      originalRequest._retry = true;
      markRefreshAttempted();

      try {
        await postRefreshAccessToken();

        return apiClient(originalRequest);
      } catch {
        markRefreshFailed();
        resetAuthState();
        alert("세션이 만료되었습니다. 다시 로그인해주세요.");
        window.location.href = "/";

        return Promise.reject(new Error("세션이 만료되었습니다. 다시 로그인해주세요."));
      }
    }

    return Promise.reject(error);
  },
);

apiClient.interceptors.request.use((config) => {
  return config;
});
