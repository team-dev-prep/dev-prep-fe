import { createContext } from "react";
import { AuthContextType } from "./types";

// 전역에서 로그인 상태를 관리하기 위한 AuthContext 생성
export const AuthContext = createContext<AuthContextType | null>(null);
