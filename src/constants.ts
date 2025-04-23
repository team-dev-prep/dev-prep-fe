export const API_BASE_URL =
  import.meta.env.VITE_MOCK_MODE === "true" ? "" : import.meta.env.VITE_API_BASE_URL;

export const API_ENDPOINTS = {
  QUESTION: "question",
  ANSWERS: "answers",
  RESULT: "result",
  AUTH: {
    LOGIN: "auth/github/callback",
    ME: "auth/me",
    LOGOUT: "auth/logout",
  },
};

export const ROUTES = {
  ROOT: "/",
  OPTION: "option",
  INTERVIEW: "interview",
  FEEDBACK: "feedback",
  OAUTH_CALLBACK: "oauth/callback",
};
