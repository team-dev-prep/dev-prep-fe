// 📌axios 인스턴스 및 인터셉터 설정

import axios from "axios";
import { API_BASE_URL, ROUTES } from "../constants";
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

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await postRefreshAccessToken();

        return apiClient(originalRequest);
      } catch {
        window.location.href = ROUTES.ROOT;

        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  },
);
