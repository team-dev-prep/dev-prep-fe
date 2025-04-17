import { UserCircleIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, postGithubLogout } from "../../utils/api";
import { Button } from "../common";

const Header = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const [userInfo, setUserInfo] = useState<{ avatar_url: string } | null>(null);

  useEffect(() => {
    getCurrentUser().then((user) => {
      if (user) {
        setIsLogin(true);
        setUserInfo(user);
      }
    });
  }, []);

  const handleGithubLogin = () => {
    const clientId = import.meta.env.VITE_GITHUB_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_GITHUB_REDIRECT_URI;
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=read:user user:email`;

    window.location.href = githubAuthUrl;
  };

  const handleGithubLogout = () => {
    postGithubLogout().then(() => {
      setIsLogin(false);
      setUserInfo(null);
      navigate("/");
    });
  };

  return (
    <header className="flex h-[70px] w-full items-center justify-between border-b border-solid border-gray2">
      {/* 로고 */}
      <Button label={"DevPrep"} onClick={() => navigate("/")} className="px-4 text-xl font-black" />

      {/* 로그인/로그아웃 영역 */}
      <div>
        {isLogin ? (
          <Button
            onClick={handleGithubLogout}
            className="flex items-center gap-1 text-gray8 hover:bg-blue2"
          >
            <img src={userInfo?.avatar_url} alt="프로필" className="size-[28px] rounded-full" />
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
