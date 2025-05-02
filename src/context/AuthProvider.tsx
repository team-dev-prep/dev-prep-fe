import { useState } from "react";
import { getCurrentUser, postGithubLogin, postGithubLogout } from "../api/auth";
import { LoadingFallback } from "../components/common";
import { resetAuthState } from "../state/authState";
import { getIsLoggingIn, markLoginFinished, markLoginStarted } from "../state/loginState";
import { AuthContext } from "./AuthContext";
import { User } from "./types";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const loginWithCode = async (code: string) => {
    if (getIsLoggingIn()) return;
    markLoginStarted();

    setIsLoading(true);

    try {
      await postGithubLogin(code);
      const user = await getCurrentUser();
      setUser(user);
    } catch (error) {
      console.error("GitHub 로그인 실패:", error);
      throw error;
    } finally {
      markLoginFinished();
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await postGithubLogout();

      try {
        await getCurrentUser();
        alert("정상적으로 로그아웃되지 않았어요. 브라우저를 새로고침해 주세요.");
      } catch {
        resetAuthState();
        setUser(null);
      }
    } catch (error) {
      console.warn("로그아웃 요청 자체가 실패했어요.");
      alert("서버에 로그아웃 요청을 보내지 못했어요. 잠시 후 다시 시도해주세요.");
    } finally {
      resetAuthState();
      setUser(null);
    }
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
