import { useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { LoadingFallback } from "../components/common";
import { ROUTES } from "../constants";
import { useAuth } from "../hooks/useAuth";

const OAuthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { loginWithCode } = useAuth();
  const hasCalled = useRef(false);

  useEffect(() => {
    const code = searchParams.get("code");

    if (!code) {
      alert("인증 코드가 없어요. 잠시 후 다시 시도해주세요.");
      navigate(ROUTES.ROOT, { replace: true });
      return;
    }

    if (hasCalled.current) {
      console.warn("[OAuthCallback] 이미 로그인 호출됨");
      return;
    }

    hasCalled.current = true;

    const login = async () => {
      try {
        await loginWithCode(code);
        navigate(ROUTES.ROOT, { replace: true });
      } catch (error) {
        console.error("[OAuthCallback] 로그인 실패:", error);
        alert((error as Error).message);
        navigate(ROUTES.ROOT, { replace: true });
      }
    };

    login();
  }, [searchParams, navigate, loginWithCode]);

  return <LoadingFallback message="GitHub 로그인 처리 중입니다..." />;
};

export default OAuthCallback;
