export const API_BASE_URL =
  import.meta.env.VITE_MOCK_MODE === "true" ? "" : "http://52.79.129.140:8080";

export const API_ENDPOINTS = {
  QUESTION: "question",
  ANSWERS: "answers",
  RESULT: "result",
  AUTH: {
    LOGIN: "api/auth/github/callback",
    ME: "api/auth/me",
    LOGOUT: "api/auth/logout",
  },
};

export const ROUTES = {
  ROOT: "/",
  OPTION: "option",
  INTERVIEW: "interview",
  FEEDBACK: "feedback",
  OAUTH_CALLBACK: "oauth/callback",
};
