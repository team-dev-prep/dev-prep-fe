import { UserCircleIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants";
import { useAuth } from "../../hooks/useAuth";
import { Button } from "../common";

const Header = () => {
  const navigate = useNavigate();
  const { user, isLogin, logout } = useAuth();

  const handleGithubLogin = () => {
    if (isLogin) {
      navigate(ROUTES.ROOT);
      return;
    }

    const clientId = import.meta.env.VITE_GITHUB_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_GITHUB_REDIRECT_URI;

    if (!clientId || !redirectUri) {
      console.error("GitHub OAuth configuration is missing");
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
          <Button onClick={logout} className="flex items-center gap-1 text-gray8 hover:bg-blue2">
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
