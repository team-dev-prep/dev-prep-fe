import { useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { LoadingFallback } from "../components/common";
import { ROUTES } from "../constants";
import { useAuth } from "../hooks/useAuth";
import showToast from "../utils/toast";

const OAuthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { loginWithCode } = useAuth();
  const hasCalled = useRef(false); // 중복 호출 방지 플래그 (Strict Mode 대응)

  useEffect(() => {
    const code = searchParams.get("code");
    const state = searchParams.get("state");
    const savedState = sessionStorage.getItem("oauth_state");

    sessionStorage.removeItem("oauth_state");

    // state가 없을 경우 홈으로 리디렉션
    if (!state || state !== savedState) {
      showToast({ type: "error", message: "보안 검증에 실패했습니다. 다시 시도해주세요." });
      navigate(ROUTES.ROOT, { replace: true });
      return;
    }

    // 인증 코드가 없을 경우 홈으로 리디렉션
    if (!code) {
      showToast({ type: "error", message: "인증 코드가 없어요. 잠시 후 다시 시도해주세요." });
      navigate(ROUTES.ROOT, { replace: true });
      return;
    }

    // 로그인 로직이 이미 호출된 경우 중단
    if (hasCalled.current) {
      console.warn("[OAuthCallback] 이미 로그인 호출됨");
      return;
    }

    hasCalled.current = true;

    // GitHub 로그인 처리
    const login = async () => {
      try {
        await loginWithCode(code);
        navigate(ROUTES.ROOT, { replace: true });
      } catch (error) {
        console.error("[OAuthCallback] 로그인 실패:", error);
        showToast({ type: "error", message: (error as Error).message });
        navigate(ROUTES.ROOT, { replace: true });
      }
    };

    login();
  }, [searchParams, navigate, loginWithCode]);

  return <LoadingFallback message="GitHub 로그인 처리 중입니다..." />;
};

export default OAuthCallback;
