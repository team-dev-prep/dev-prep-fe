import { UserCircleIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../../api/auth";
import { ROUTES } from "../../constants";
import { useAuth } from "../../hooks/useAuth";
import { Button } from "../common";

const Header = () => {
  const navigate = useNavigate();
  const { user, isLogin, logout, setUser } = useAuth();

  const handleGithubLogin = async () => {
    if (isLogin) return navigate(ROUTES.ROOT);

    try {
      const user = await getCurrentUser();

      if (user) {
        // 서버에 사용자 정보가 있다면 자동 로그인
        setUser(user);
        navigate(ROUTES.ROOT);
      } else {
        throw new Error("유저 정보 없음");
      }
    } catch {
      // GitHub OAuth로 이동
      redirectToGithubAuthorize();
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate(ROUTES.ROOT);
  };

  const redirectToGithubAuthorize = () => {
    const clientId = import.meta.env.VITE_GITHUB_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_GITHUB_REDIRECT_URI;

    if (!clientId || !redirectUri) {
      console.error("[GitHubLogin] OAuth 설정 누락");
      return;
    }

    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=read:user user:email`;
    window.location.href = githubAuthUrl;
  };

  return (
    <header className="flex h-[70px] w-full items-center justify-between border-b border-solid border-gray2">
      <Button
        label={"DevPrep"}
        onClick={() => navigate(ROUTES.ROOT)}
        className="px-4 text-xl font-black"
      />
      <div>
        {isLogin ? (
          <Button
            onClick={handleLogout}
            className="flex items-center gap-1 text-gray8 hover:bg-blue2"
          >
            <img src={user?.avatar} alt="프로필" className="size-[28px] rounded-full" />
            <p className="font-semibold">Logout</p>
          </Button>
        ) : (
          <Button
            onClick={handleGithubLogin}
            className="flex items-center gap-1 text-gray8 hover:bg-blue2"
          >
            <UserCircleIcon className="size-[28px]" />
            <p className="font-semibold">Login</p>
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;
