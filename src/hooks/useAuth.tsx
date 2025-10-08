import { useState, useEffect, createContext, useContext, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { User, LoginCredentials, RegisterCredentials, AuthResponse, AuthState } from '../constants/types/types';

// API Configuration - Uncomment when backend is ready
// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';
const AUTH_TOKEN_KEY = 'ticketbox_auth_token';
const AUTH_USER_KEY = 'ticketbox_auth_user';
const TOKEN_EXPIRY_KEY = 'ticketbox_token_expiry';

// Authentication Context
interface AuthContextType {
  authState: AuthState;
  login: (credentials: LoginCredentials) => Promise<AuthResponse>;
  register: (credentials: RegisterCredentials) => Promise<AuthResponse>;
  logout: () => Promise<void>;
  clearError: () => void;
  refreshToken: () => Promise<boolean>;
  isTokenValid: () => boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Helper: Check if token is expired
const isTokenExpired = (): boolean => {
  const expiry = localStorage.getItem(TOKEN_EXPIRY_KEY);
  if (!expiry) return true;
  return Date.now() > parseInt(expiry);
};

// Helper: Set token with expiry (default 24 hours)
const setAuthToken = (token: string, expiryHours: number = 24): void => {
  localStorage.setItem(AUTH_TOKEN_KEY, token);
  const expiry = Date.now() + (expiryHours * 60 * 60 * 1000);
  localStorage.setItem(TOKEN_EXPIRY_KEY, expiry.toString());
};

// Helper: Clear all auth data
const clearAuthData = (): void => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(AUTH_USER_KEY);
  localStorage.removeItem(TOKEN_EXPIRY_KEY);
};

// Helper: Get stored user
const getStoredUser = (): User | null => {
  try {
    const userStr = localStorage.getItem(AUTH_USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
  } catch {
    return null;
  }
};

// Mock API functions - Replace these with actual API calls when backend is ready
const mockApiCall = async (endpoint: string, data: any): Promise<AuthResponse> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1200));
  
  // Mock responses based on endpoint
  switch (endpoint) {
    case 'login':
      // Simulate login logic with better validation
      if (data.emailOrPhone === 'admin@example.com' && data.password === 'password') {
        const user = {
          id: '1',
          email: 'admin@example.com',
          name: 'Admin User',
          avatar: 'https://ui-avatars.com/api/?name=Admin+User&background=10b981&color=fff'
        };
        return {
          success: true,
          user,
          token: 'mock-jwt-token-' + Date.now()
        };
      } else if (data.emailOrPhone === 'user@example.com' && data.password === '123456') {
        const user = {
          id: '2',
          email: 'user@example.com',
          name: 'Test User',
          phone: '0912345678'
        };
        return {
          success: true,
          user,
          token: 'mock-jwt-token-' + Date.now()
        };
      } else {
        return {
          success: false,
          message: 'Email/số điện thoại hoặc mật khẩu không chính xác'
        };
      }
    
    case 'register':
      // Simulate registration logic
      if (data.email === 'existing@example.com') {
        return {
          success: false,
          message: 'Email đã được sử dụng. Vui lòng sử dụng email khác.'
        };
      }
      if (data.phone === '0123456789') {
        return {
          success: false,
          message: 'Số điện thoại đã được đăng ký.'
        };
      }
      const newUser = {
        id: 'user-' + Date.now(),
        email: data.email,
        name: data.name,
        phone: data.phone,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(data.name)}&background=10b981&color=fff`
      };
      return {
        success: true,
        user: newUser,
        token: 'mock-jwt-token-' + Date.now()
      };
    
    default:
      return {
        success: false,
        message: 'API endpoint không tồn tại'
      };
  }
};

// TODO: Replace with actual API calls when backend is ready
export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    try {
      // TODO: Replace with actual API call
      // const response = await fetch(`${API_BASE_URL}/auth/login`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(credentials)
      // });
      // const data = await response.json();
      // return data;
      
      return mockApiCall('login', credentials);
    } catch (error) {
      console.error('Login API error:', error);
      return {
        success: false,
        message: 'Không thể kết nối đến máy chủ. Vui lòng thử lại.'
      };
    }
  },
  
  register: async (credentials: RegisterCredentials): Promise<AuthResponse> => {
    try {
      // TODO: Replace with actual API call
      // const response = await fetch(`${API_BASE_URL}/auth/register`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(credentials)
      // });
      // const data = await response.json();
      // return data;
      
      return mockApiCall('register', credentials);
    } catch (error) {
      console.error('Register API error:', error);
      return {
        success: false,
        message: 'Không thể kết nối đến máy chủ. Vui lòng thử lại.'
      };
    }
  },
  
  logout: async (): Promise<void> => {
    try {
      // TODO: Replace with actual API call
      // const token = localStorage.getItem(AUTH_TOKEN_KEY);
      // await fetch(`${API_BASE_URL}/auth/logout`, {
      //   method: 'POST',
      //   headers: {
      //     'Authorization': `Bearer ${token}`,
      //     'Content-Type': 'application/json'
      //   }
      // });
      
      clearAuthData();
    } catch (error) {
      console.error('Logout API error:', error);
      clearAuthData(); // Clear local data even if API fails
    }
  },
  
  getCurrentUser: async (): Promise<User | null> => {
    try {
      const token = localStorage.getItem(AUTH_TOKEN_KEY);
      if (!token || isTokenExpired()) {
        clearAuthData();
        return null;
      }
      
      // TODO: Replace with actual API call
      // const response = await fetch(`${API_BASE_URL}/auth/me`, {
      //   headers: { 'Authorization': `Bearer ${token}` }
      // });
      // if (!response.ok) {
      //   clearAuthData();
      //   return null;
      // }
      // const data = await response.json();
      // return data.user;
      
      // For now, return stored user
      return getStoredUser();
    } catch (error) {
      console.error('Get current user error:', error);
      clearAuthData();
      return null;
    }
  },
  
  refreshToken: async (): Promise<AuthResponse> => {
    try {
      const token = localStorage.getItem(AUTH_TOKEN_KEY);
      if (!token) {
        return { success: false, message: 'No token found' };
      }
      
      // TODO: Replace with actual API call
      // const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
      //   method: 'POST',
      //   headers: {
      //     'Authorization': `Bearer ${token}`,
      //     'Content-Type': 'application/json'
      //   }
      // });
      // const data = await response.json();
      // return data;
      
      // Mock: Just extend the current token
      const user = getStoredUser();
      if (user) {
        setAuthToken(token, 24);
        return { success: true, user, token };
      }
      return { success: false, message: 'Token refresh failed' };
    } catch (error) {
      console.error('Refresh token error:', error);
      return { success: false, message: 'Token refresh failed' };
    }
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

  const login = useCallback(async (credentials: LoginCredentials): Promise<AuthResponse> => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const response = await authApi.login(credentials);
      
      if (response.success && response.user && response.token) {
        // Store token with expiry
        setAuthToken(response.token, 24);
        // Store user data
        localStorage.setItem(AUTH_USER_KEY, JSON.stringify(response.user));
        
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
          error: response.message || 'Đăng nhập thất bại. Vui lòng thử lại.'
        }));
      }
      
      return response;
    } catch (error) {
      const errorMessage = 'Có lỗi xảy ra khi đăng nhập. Vui lòng kiểm tra kết nối mạng.';
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage
      }));
      return { success: false, message: errorMessage };
    }
  }, []);

  const register = useCallback(async (credentials: RegisterCredentials): Promise<AuthResponse> => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const response = await authApi.register(credentials);
      
      if (response.success && response.user && response.token) {
        // Store token with expiry
        setAuthToken(response.token, 24);
        // Store user data
        localStorage.setItem(AUTH_USER_KEY, JSON.stringify(response.user));
        
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
          error: response.message || 'Đăng ký thất bại. Vui lòng thử lại.'
        }));
      }
      
      return response;
    } catch (error) {
      const errorMessage = 'Có lỗi xảy ra khi đăng ký. Vui lòng kiểm tra kết nối mạng.';
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage
      }));
      return { success: false, message: errorMessage };
    }
  }, []);

  const logout = useCallback(async () => {
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
      // Still clear state even if API call fails
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null
      });
    }
  }, []);

  const clearError = useCallback(() => {
    setAuthState(prev => ({ ...prev, error: null }));
  }, []);

  const refreshToken = useCallback(async (): Promise<boolean> => {
    try {
      const response = await authApi.refreshToken();
      if (response.success && response.user && response.token) {
        setAuthToken(response.token, 24);
        localStorage.setItem(AUTH_USER_KEY, JSON.stringify(response.user));
        setAuthState(prev => ({
          ...prev,
          user: response.user!,
          isAuthenticated: true
        }));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Token refresh error:', error);
      return false;
    }
  }, []);

  const isTokenValid = useCallback((): boolean => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    return !!token && !isTokenExpired();
  }, []);

  return (
    <AuthContext.Provider 
      value={{ 
        authState, 
        login, 
        register, 
        logout, 
        clearError, 
        refreshToken, 
        isTokenValid 
      }}
    >
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
