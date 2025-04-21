import { useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ROUTES } from "../constants";
import { useAuth } from "../hooks/useAuth";

const OAuthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { loginWithCode } = useAuth();
  const calledRef = useRef(false);

  useEffect(() => {
    const code = searchParams.get("code");

    const login = async () => {
      if (calledRef.current) return;
      calledRef.current = true;

      try {
        await loginWithCode(code!);
        navigate(ROUTES.ROOT);
      } catch (e) {
        alert("로그인 실패");
        navigate(ROUTES.ROOT);
      }
    };

    if (code) login();
  }, []);

  return <div className="p-4 text-center">GitHub 로그인 처리 중...</div>;
};

export default OAuthCallback;
