import { useRef, useState } from "react";
import { getCurrentUser, postGithubLogin, postGithubLogout } from "../api/auth";
import { LoadingFallback } from "../components/common";
import { resetAuthState } from "../state/authState";
import showToast from "../utils/toast";
import { AuthContext } from "./AuthContext";
import { User } from "./types";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null); // 현재 로그인한 사용자 정보
  const [isLoading, setIsLoading] = useState(false); // 로그인 처리 중 로딩 상태
  const lastUsedCode = useRef<string | null>(null); // 중복 로그인 요청 방지를 위한 code 추적

  // GitHub OAuth 로그인
  const loginWithCode = async (code: string) => {
    if (lastUsedCode.current === code) {
      console.warn("[AuthProvider] 중복된 code로 로그인 시도 방지됨");
      return;
    }

    lastUsedCode.current = code;
    setIsLoading(true);

    try {
      await postGithubLogin(code);
      const user = await getCurrentUser();
      setUser(user);
    } catch (error) {
      console.error("[AuthProvider] GitHub 로그인 실패:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // 로그아웃 처리
  const logout = async () => {
    try {
      await postGithubLogout();
    } catch (error) {
      console.warn("[AuthProvider] 로그아웃 요청 실패:", error);
      showToast({
        type: "error",
        message: "서버에 로그아웃 요청을 보내지 못했어요. 잠시 후 다시 시도해주세요.",
      });
    } finally {
      setTimeout(() => {
        resetAuthState();
      }, 0);
      setUser(null);
    }
  };

  // 로딩 중에는 fallback 컴포넌트 보여줌
  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <LoadingFallback message="로그인 상태 확인 중입니다..." />
      </div>
    );
  }

  // 로그인 상태 컨텍스트 전역 제공
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
      {children}
    </AuthContext.Provider>
  );
};
