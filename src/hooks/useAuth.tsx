import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import type { User, LoginCredentials, RegisterCredentials, AuthResponse, AuthState } from '../constants/types/types';

// Authentication Context
const AuthContext = createContext<{
  authState: AuthState;
  login: (credentials: LoginCredentials) => Promise<AuthResponse>;
  register: (credentials: RegisterCredentials) => Promise<AuthResponse>;
  logout: () => void;
  clearError: () => void;
} | null>(null);

// Mock API functions - Replace these with actual API calls when backend is ready
const mockApiCall = async (endpoint: string, data: any): Promise<AuthResponse> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock responses based on endpoint
  switch (endpoint) {
    case 'login':
      // Simulate login logic
      if (data.emailOrPhone === 'admin@example.com' && data.password === 'password') {
        return {
          success: true,
          user: {
            id: '1',
            email: 'admin@example.com',
            name: 'Admin User',
            avatar: ''
          },
          token: 'mock-jwt-token'
        };
      } else {
        return {
          success: false,
          message: 'Email hoặc mật khẩu không chính xác'
        };
      }
    
    case 'register':
      // Simulate registration logic
      if (data.email === 'existing@example.com') {
        return {
          success: false,
          message: 'Email đã được sử dụng'
        };
      }
      return {
        success: true,
        user: {
          id: '2',
          email: data.email,
          name: data.name,
          phone: data.phone
        },
        token: 'mock-jwt-token'
      };
    
    default:
      return {
        success: false,
        message: 'API endpoint not found'
      };
  }
};

// TODO: Replace with actual API calls when backend is ready
export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    // Replace with: const response = await fetch('/api/auth/login', { method: 'POST', body: JSON.stringify(credentials) });
    return mockApiCall('login', credentials);
  },
  
  register: async (credentials: RegisterCredentials): Promise<AuthResponse> => {
    // Replace with: const response = await fetch('/api/auth/register', { method: 'POST', body: JSON.stringify(credentials) });
    return mockApiCall('register', credentials);
  },
  
  logout: async (): Promise<void> => {
    // Replace with: await fetch('/api/auth/logout', { method: 'POST' });
    localStorage.removeItem('auth_token');
  },
  
  getCurrentUser: async (): Promise<User | null> => {
    // Replace with: const response = await fetch('/api/auth/me');
    const token = localStorage.getItem('auth_token');
    if (token) {
      return {
        id: '1',
        email: 'admin@example.com',
        name: 'Admin User'
      };
    }
    return null;
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null
  });

  // Initialize auth state on app load
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const user = await authApi.getCurrentUser();
        if (user) {
          setAuthState({
            user,
            isAuthenticated: true,
            isLoading: false,
            error: null
          });
        } else {
          setAuthState({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null
          });
        }
      } catch (error) {
        setAuthState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: 'Failed to initialize authentication'
        });
      }
    };

    initializeAuth();
  }, []);

  const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const response = await authApi.login(credentials);
      
      if (response.success && response.user && response.token) {
        localStorage.setItem('auth_token', response.token);
        setAuthState({
          user: response.user,
          isAuthenticated: true,
          isLoading: false,
          error: null
        });
      } else {
        setAuthState(prev => ({
          ...prev,
          isLoading: false,
          error: response.message || 'Đăng nhập thất bại'
        }));
      }
      
      return response;
    } catch (error) {
      const errorMessage = 'Có lỗi xảy ra khi đăng nhập';
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage
      }));
      return { success: false, message: errorMessage };
    }
  };

  const register = async (credentials: RegisterCredentials): Promise<AuthResponse> => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const response = await authApi.register(credentials);
      
      if (response.success && response.user && response.token) {
        localStorage.setItem('auth_token', response.token);
        setAuthState({
          user: response.user,
          isAuthenticated: true,
          isLoading: false,
          error: null
        });
      } else {
        setAuthState(prev => ({
          ...prev,
          isLoading: false,
          error: response.message || 'Đăng ký thất bại'
        }));
      }
      
      return response;
    } catch (error) {
      const errorMessage = 'Có lỗi xảy ra khi đăng ký';
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage
      }));
      return { success: false, message: errorMessage };
    }
  };

  const logout = async () => {
    try {
      await authApi.logout();
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null
      });
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const clearError = () => {
    setAuthState(prev => ({ ...prev, error: null }));
  };

  return (
    <AuthContext.Provider value={{ authState, login, register, logout, clearError }}>
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
