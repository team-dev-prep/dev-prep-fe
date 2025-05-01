import { useEffect, useState } from "react";
import { getCurrentUser, postGithubLogin, postGithubLogout } from "../api/auth";
import { LoadingFallback } from "../components/common";
import { resetAuthState } from "../state/authState";
import { getIsLoggingIn, markLoginFinished, markLoginStarted } from "../state/loginState";
import { AuthContext } from "./AuthContext";
import { User } from "./types";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const checkCurrentUser = async () => {
      try {
        setIsLoading(true);
        const user = await getCurrentUser();
        setUser(user);
      } catch (error) {
        console.warn("로그인 상태를 확인할 수 없어요.");
      } finally {
        setIsLoading(false);
      }
    };

    checkCurrentUser();
  }, []);

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
    } catch (error) {
      console.warn("로그아웃 중 문제가 발생했어요. 토큰이 정상 제거되지 않았을 수 있어요.");
      alert("정상적으로 로그아웃되지 않았을 수 있어요. 브라우저를 새로고침해 주세요.");
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
