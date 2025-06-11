// src/contexts/AuthContext.types.ts
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'ADMIN' | 'PUBLIC';
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
}

export interface AuthContextValue extends AuthState {
  login: (data: AuthState) => void;
  logout: () => void;
}