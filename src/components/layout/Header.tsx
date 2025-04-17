import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../common";
import { UserCircleIcon } from "@heroicons/react/24/outline";

const Header = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  const handleGithubLogin = () => {
    const clientId = import.meta.env.VITE_GITHUB_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_GITHUB_REDIRECT_URI;
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=read:user user:email`;

    window.location.href = githubAuthUrl;
  };

  return (
    <header className="flex h-[70px] w-full items-center justify-between border-b border-solid border-gray2">
      {/* 로고 */}
      <Button label={"DevPrep"} onClick={() => navigate("/")} className="px-4 text-xl font-black" />

      {/* 로그인/로그아웃 영역 */}
      <div>
        {isLogin ? (
          <Button
            onClick={handleGithubLogin}
            className="flex items-center gap-1 text-gray8 hover:bg-blue2"
          >
            <UserCircleIcon className="size-[28px]" />
            <p className="font-semibold">Login</p>
          </Button>
        ) : (
          <Button onClick={() => {}} className="flex items-center gap-1 text-gray8 hover:bg-blue2">
            <img src="" alt="프로필" className="size-[28px] rounded-full" />
            <p className="font-semibold">Logout</p>
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;
