import { useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { LoadingFallback } from "../components/common";
import { ROUTES } from "../constants";
import { useAuth } from "../hooks/useAuth";

const OAuthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { loginWithCode } = useAuth();
  const hasCalled = useRef(false); // StrictMode 중복 실행 방지용

  useEffect(() => {
    const code = searchParams.get("code");

    if (!code || hasCalled.current) return;
    hasCalled.current = true;

    const login = async () => {
      try {
        await loginWithCode(code);
      } catch (e) {
        console.error("GitHub 로그인 실패:", e);
        alert("로그인 실패");
      } finally {
        window.history.replaceState({}, "", ROUTES.ROOT);
        navigate(ROUTES.ROOT, { replace: true });
      }
    };

    login();
  }, [searchParams, navigate, loginWithCode]);

  return <LoadingFallback message="GitHub 로그인 처리 중입니다..." />;
};

export default OAuthCallback;
