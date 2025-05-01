import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("로그인 상태를 확인할 수 없어요. 잠시 후 다시 시도해주세요.");
  return ctx;
};
