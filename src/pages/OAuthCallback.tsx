import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ROUTES } from "../constants";
import { postGithubLogin } from "../utils/api";

const OAuthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const code = searchParams.get("code");

    if (code) {
      postGithubLogin(code)
        .then(() => {
          navigate(ROUTES.ROOT);
        })
        .catch(() => {
          alert("로그인 실패");
          navigate(ROUTES.ROOT);
        });
    }
  }, []);

  return <div className="p-4 text-center">GitHub 로그인 처리 중...</div>;
};

export default OAuthCallback;
