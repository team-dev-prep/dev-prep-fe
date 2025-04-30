let isRefreshAttempted = false; // 전역에서 한 번만 refresh 시도했는지 여부 추적
let isRefreshFailed = false; // refresh 실패 여부를 저장해 이후 me 호출을 차단

export const getAuthState = () => ({
  isRefreshAttempted,
  isRefreshFailed: isRefreshFailed || sessionStorage.getItem("isRefreshFailed") === "true",
});

export const markRefreshAttempted = () => {
  isRefreshAttempted = true;
};

export const markRefreshFailed = () => {
  isRefreshFailed = true;
};

export const resetAuthState = () => {
  isRefreshAttempted = false;
  isRefreshFailed = false;
};
