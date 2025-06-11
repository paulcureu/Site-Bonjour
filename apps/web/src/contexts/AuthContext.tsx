// src/contexts/AuthContext.tsx

import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import type { PropsWithChildren } from 'react';
import type { AuthState, AuthContextValue } from './AuthContext.types';
import apiClient from '../api/apiClient';


const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  user: null,
};


const AuthContext = createContext<AuthContextValue>({
  ...initialState,
  login: () => {},
  logout: () => {},
});


export function AuthProvider({ children }: PropsWithChildren) {
  const getInitialState = (): AuthState => {
    try {
      const storedState = localStorage.getItem('authState');
      if (storedState) {
        return JSON.parse(storedState);
      }
    } catch (error) {
      console.error("Eroare la parsarea stării de auth din localStorage", error);
    }
    return initialState;
  };

  const [authState, setAuthState] = useState<AuthState>(getInitialState);

  useEffect(() => {
    localStorage.setItem('authState', JSON.stringify(authState));
  }, [authState]);

  useEffect(() => {
    const requestInterceptor = apiClient.interceptors.request.use(
      (config) => {
        if (authState.accessToken) {
          config.headers.Authorization = `Bearer ${authState.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = apiClient.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          try {
            console.log('Se încearcă reînnoirea token-ului...');
            const response = await apiClient.post('/auth/refresh', {
              refreshToken: authState.refreshToken,
            });
            const { accessToken, refreshToken, user } = response.data;
            setAuthState({ accessToken, refreshToken, user });
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            return apiClient(originalRequest);
          } catch (refreshError) {
            console.error('Logout din cauza eșecului la refresh.', refreshError);
            setAuthState(initialState);
            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      apiClient.interceptors.request.eject(requestInterceptor);
      apiClient.interceptors.response.eject(responseInterceptor);
    };
  }, [authState.accessToken, authState.refreshToken]);

  const login = (data: AuthState) => {
    setAuthState(data);
  };

  const logout = () => {
    setAuthState(initialState);
  };

  const value = useMemo(
    () => ({
      ...authState,
      login,
      logout,
    }),
    [authState]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth trebuie folosit în interiorul unui AuthProvider');
  }
  return context;
}