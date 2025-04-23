import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constants";
import { getCurrentUser, postGithubLogin, postGithubLogout } from "../utils/api";

interface User {
  id: number;
  name: string;
  avatar: string;
}

export interface AuthContextType {
  user: User | null;
  isLogin: boolean;
  setUser: (user: User | null) => void;
  logout: () => Promise<void>;
  loginWithCode: (code: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getCurrentUser();
        if (user) setUser(user);
      } catch {
        // 로그인 안 된 상태일 수 있으므로 조용히 무시
      }
    };
    fetchUser();
  }, []);

  const loginWithCode = async (code: string) => {
    await postGithubLogin(code);
    const user = await getCurrentUser();
    setUser(user);
  };

  const logout = async () => {
    await postGithubLogout();
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
      {children}
    </AuthContext.Provider>
  );
};
