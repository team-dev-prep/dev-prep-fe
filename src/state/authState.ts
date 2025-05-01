const REFRESH_FAILED_KEY = "isRefreshFailed";
const REFRESH_ATTEMPTED_KEY = "isRefreshAttempted";

// sessionStorage 헬퍼 함수
const getBooleanFromStorage = (key: string): boolean => {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(key) === "true";
};

const setBooleanToStorage = (key: string, value: boolean) => {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(key, value ? "true" : "false");
};

// 인증 상태 관리 함수
export const getAuthState = () => ({
  isRefreshAttempted: getBooleanFromStorage(REFRESH_ATTEMPTED_KEY),
  isRefreshFailed: getBooleanFromStorage(REFRESH_FAILED_KEY),
});

export const markRefreshAttempted = () => {
  setBooleanToStorage(REFRESH_ATTEMPTED_KEY, true);
};

export const markRefreshFailed = () => {
  setBooleanToStorage(REFRESH_FAILED_KEY, true);
};

export const resetAuthState = () => {
  setBooleanToStorage(REFRESH_ATTEMPTED_KEY, false);
  setBooleanToStorage(REFRESH_FAILED_KEY, false);
};
