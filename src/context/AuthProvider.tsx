import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, postGithubLogin, postGithubLogout } from "../api/auth";
import { LoadingFallback } from "../components/common";
import { ROUTES } from "../constants";
import { resetAuthState } from "../state/authState";
import { AuthContext } from "./AuthContext";
import { User } from "./types";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading] = useState(false);

  const navigate = useNavigate();

  const loginWithCode = async (code: string) => {
    await postGithubLogin(code);
    const user = await getCurrentUser();
    setUser(user);
    navigate(ROUTES.ROOT);
  };

  const logout = async () => {
    await postGithubLogout();
    resetAuthState();
    setUser(null);
    navigate(ROUTES.ROOT);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLogin: !!user,
        setUser,
        logout,
        loginWithCode,
      }}
    >
      {isLoading ? (
        <div className="flex min-h-screen flex-col items-center justify-center">
          <LoadingFallback message="로그인 상태 확인 중입니다..." />
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};
