import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../common";
import { UserCircleIcon } from "@heroicons/react/24/outline";

const Header = () => {
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLogin, setIsLogin] = useState(true);

  return (
    <header className="flex h-[70px] w-full items-center justify-between border-b border-solid border-gray2">
      {/* 로고 */}
      <Button label={"DevPrep"} onClick={() => navigate("/")} className="px-4 text-xl font-black" />

      {/* 로그인/로그아웃 영역 */}
      <div>
        {isLogin ? (
          <Button onClick={() => {}} className="hover:bg-blue2 flex items-center gap-1 text-gray8">
            <UserCircleIcon className="size-[28px]" />
            <p className="font-semibold">Login</p>
          </Button>
        ) : (
          <Button onClick={() => {}} className="hover:bg-blue2 flex items-center gap-1 text-gray8">
            <img src="" alt="프로필" className="size-[28px] rounded-full" />
            <p>Logout</p>
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;
