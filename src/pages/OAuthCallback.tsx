import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { githubLogin } from "../utils/api";

const OAuthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const code = searchParams.get("code");

    if (code) {
      githubLogin(code)
        .then(() => {
          navigate("/");
        })
        .catch(() => {
          alert("로그인 실패");
          navigate("/");
        });
    }
  }, []);

  return <div className="p-4 text-center">GitHub 로그인 처리 중...</div>;
};

export default OAuthCallback;
