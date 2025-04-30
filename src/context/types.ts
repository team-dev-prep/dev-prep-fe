export interface User {
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
