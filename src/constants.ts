export const API_BASE_URL =
  import.meta.env.VITE_MOCK_MODE === "true" ? "" : import.meta.env.VITE_API_BASE_URL;

export const API_ENDPOINTS = {
  PRE_QUESTION: "prequestion",
  QUESTION: "question",
  ANSWERS: "answers",
  RESULT: "result",
  AUTH: {
    LOGIN: "auth/github/callback",
    ME: "auth/me",
    LOGOUT: "auth/logout",
    REFRESH: "auth/refresh",
  },
};

export const ROUTES = {
  ROOT: "/",
  PRE_OPTION: "preOption",
  PRE_INTERVIEW: "preInterview",
  PRE_FEEDBACK: "preFeedback",
  OPTION: "option",
  INTERVIEW: "interview",
  FEEDBACK: "feedback",
  OAUTH_CALLBACK: "oauth/callback",
};
