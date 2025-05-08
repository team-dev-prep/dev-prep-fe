// 📌axios 인스턴스 및 인터셉터 설정

import axios from "axios";
import { API_BASE_URL } from "../constants";
import { getAuthState, markRefreshAttempted, markRefreshFailed } from "../state/authState";
import showToast from "../utils/toast";
import { postRefreshAccessToken } from "./auth";

let isAlertShown = false;

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
    const { isRefreshAttempted, isRefreshFailed } = getAuthState();

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !isRefreshAttempted &&
      !isRefreshFailed
    ) {
      originalRequest._retry = true;
      markRefreshAttempted();

      try {
        await postRefreshAccessToken();
        return apiClient(originalRequest);
      } catch {
        markRefreshFailed();

        if (!isAlertShown) {
          isAlertShown = true;
          showToast({ type: "warning", message: "세션이 만료되었습니다. 다시 로그인해주세요." });
          window.location.href = "/";
        }

        return Promise.reject(new Error("세션 만료로 재로그인 필요"));
      }
    }

    return Promise.reject(error);
  },
);

apiClient.interceptors.request.use((config) => config);
