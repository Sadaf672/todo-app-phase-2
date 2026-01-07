// frontend/lib/auth-context.tsx
'use client';

import { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';

type AuthState = {
  user: { id: string; name: string; email: string } | null;
  token: string | null;
  loading: boolean;
  error: string | null;
};

type AuthAction =
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: { user: { id: string; name: string; email: string }; token: string } }
  | { type: 'LOGIN_ERROR'; payload: string }
  | { type: 'REGISTER_START' }
  | { type: 'REGISTER_SUCCESS'; payload: { user: { id: string; name: string; email: string }; token: string } }
  | { type: 'REGISTER_ERROR'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'CHECK_AUTH_STATUS'; payload: { user: { id: string; name: string; email: string } | null; token: string | null } };

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_START':
    case 'REGISTER_START':
      return { ...state, loading: true, error: null };
    case 'LOGIN_SUCCESS':
    case 'REGISTER_SUCCESS':
      return {
        ...state,
        loading: false,
        user: action.payload.user,
        token: action.payload.token,
        error: null,
      };
    case 'LOGIN_ERROR':
    case 'REGISTER_ERROR':
      return { ...state, loading: false, error: action.payload };
    case 'LOGOUT':
      return { ...initialState, loading: false };
    case 'CHECK_AUTH_STATUS':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        loading: false,
      };
    default:
      return state;
  }
};

interface AuthContextType {
  state: AuthState;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const router = useRouter();

  // Check auth status on initial load
  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    if (token && user) {
      try {
        const parsedUser = JSON.parse(user);
        dispatch({
          type: 'CHECK_AUTH_STATUS',
          payload: { user: parsedUser, token }
        });
      } catch (error) {
        // If parsing fails, clear stored data
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    } else {
      dispatch({
        type: 'CHECK_AUTH_STATUS',
        payload: { user: null, token: null }
      });
    }
  }, []);

  const login = async (email: string, password: string) => {
    dispatch({ type: 'LOGIN_START' });
    
    try {
      // In a real app, this would be an API call
      // const response = await apiClient.login(email, password);
      // const { token, user } = response;
      
      // For demo purposes, simulate successful login
      await new Promise(resolve => setTimeout(resolve, 1000));
      const token = 'fake-jwt-token';
      const user = { id: '1', name: 'Demo User', email };
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: { user, token }
      });
      
      router.push('/dashboard');
      router.refresh();
    } catch (error: any) {
      dispatch({
        type: 'LOGIN_ERROR',
        payload: error.message || 'Login failed'
      });
    }
  };

  const register = async (name: string, email: string, password: string) => {
    dispatch({ type: 'REGISTER_START' });
    
    try {
      // In a real app, this would be an API call
      // const response = await apiClient.register(name, email, password);
      // const { token, user } = response;
      
      // For demo purposes, simulate successful registration
      await new Promise(resolve => setTimeout(resolve, 1000));
      const token = 'fake-jwt-token';
      const user = { id: '1', name, email };
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      dispatch({
        type: 'REGISTER_SUCCESS',
        payload: { user, token }
      });
      
      router.push('/dashboard');
      router.refresh();
    } catch (error: any) {
      dispatch({
        type: 'REGISTER_ERROR',
        payload: error.message || 'Registration failed'
      });
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
    router.push('/login');
    router.refresh();
  };

  return (
    <AuthContext.Provider value={{ state, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};