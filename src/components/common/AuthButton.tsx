import { UserCircleIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants";
import { useAuth } from "../../hooks/useAuth";
import redirectToGithubAuthorize from "../../utils/oauth";
import { Button } from "../common";

const AuthButton = () => {
  const navigate = useNavigate();
  const { user, isLogin, logout } = useAuth();

  const handleGithubLogin = () => {
    if (!isLogin) redirectToGithubAuthorize();
    else navigate(ROUTES.ROOT);
  };

  const handleLogout = async () => {
    await logout();
    navigate(ROUTES.ROOT);
  };

  return isLogin ? (
    // 로그인 상태 → 프로필 이미지 + Logout 버튼
    <Button onClick={handleLogout} className="flex items-center gap-1 text-gray8 hover:bg-blue2">
      <img src={user?.avatar} alt="프로필" className="size-[28px] rounded-full" />
      <p className="font-semibold">Logout</p>
    </Button>
  ) : (
    // 비로그인 상태 → Login 버튼
    <Button
      onClick={handleGithubLogin}
      className="flex items-center gap-1 text-gray8 hover:bg-blue2"
    >
      <UserCircleIcon className="size-[28px]" />
      <p className="font-semibold">Login</p>
    </Button>
  );
};

export default AuthButton;
