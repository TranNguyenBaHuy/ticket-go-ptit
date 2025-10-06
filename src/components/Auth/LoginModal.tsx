import React, { useState, useEffect, useRef } from 'react';
import { X, Eye, EyeOff, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import type { LoginCredentials } from '../../constants/types/types';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToRegister: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onSwitchToRegister }) => {
  const { login, authState, clearError } = useAuth();
  const [formData, setFormData] = useState<LoginCredentials>({
    emailOrPhone: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState<{
    emailOrPhone?: string;
    password?: string;
  }>({});
  const [showSuccess, setShowSuccess] = useState(false);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Focus management
  useEffect(() => {
    if (isOpen && emailInputRef.current) {
      setTimeout(() => emailInputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen && !isSubmitting) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, isSubmitting, onClose]);

  // Validate email or phone
  const validateEmailOrPhone = (value: string): string | undefined => {
    if (!value.trim()) {
      return 'Vui lòng nhập email hoặc số điện thoại';
    }
    // Check if it's a phone number (Vietnamese format)
    const phoneRegex = /^(0|\+84)(\s|\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\d)(\s|\.)?(\d{3})(\s|\.)?(\d{3})$/;
    // Check if it's an email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!phoneRegex.test(value) && !emailRegex.test(value)) {
      return 'Email hoặc số điện thoại không hợp lệ';
    }
    return undefined;
  };

  // Validate password
  const validatePassword = (value: string): string | undefined => {
    if (!value) {
      return 'Vui lòng nhập mật khẩu';
    }
    if (value.length < 6) {
      return 'Mật khẩu phải có ít nhất 6 ký tự';
    }
    return undefined;
  };

  // Validate form
  const validateForm = (): boolean => {
    const errors: typeof validationErrors = {};
    
    const emailOrPhoneError = validateEmailOrPhone(formData.emailOrPhone);
    if (emailOrPhoneError) errors.emailOrPhone = emailOrPhoneError;
    
    const passwordError = validatePassword(formData.password);
    if (passwordError) errors.password = passwordError;
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    setValidationErrors({});

    // Validate form
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await login(formData);
      if (response.success) {
        setShowSuccess(true);
        // Show success message briefly before closing
        setTimeout(() => {
          setShowSuccess(false);
          onClose();
          // Reset form
          setFormData({ emailOrPhone: '', password: '' });
          setValidationErrors({});
        }, 1500);
      }
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear errors when user starts typing
    if (authState.error) clearError();
    if (validationErrors[name as keyof typeof validationErrors]) {
      setValidationErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleGoogleLogin = () => {
    // TODO: Implement Google OAuth when backend is ready
    console.log('Google login clicked');
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget && !isSubmitting) {
          onClose();
        }
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="login-modal-title"
    >
      <div 
        ref={modalRef}
        className="bg-white rounded-2xl w-full max-w-md shadow-2xl transform transition-all"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-t-2xl px-6 py-5 flex items-center justify-between">
          <h2 id="login-modal-title" className="text-white text-2xl font-bold">Đăng nhập</h2>
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="text-white hover:text-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed p-1 rounded-full hover:bg-white/10"
            aria-label="Đóng"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5" noValidate>
          {/* Success Message */}
          {showSuccess && (
            <div className="flex items-center space-x-2 text-green-600 bg-green-50 p-4 rounded-lg border border-green-200 animate-fade-in">
              <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
              <span className="font-medium">Đăng nhập thành công!</span>
            </div>
          )}

          {/* Email/Phone Input */}
          <div>
            <label htmlFor="emailOrPhone" className="block text-sm font-medium text-gray-700 mb-2">
              Email hoặc Số điện thoại
            </label>
            <input
              ref={emailInputRef}
              type="text"
              id="emailOrPhone"
              name="emailOrPhone"
              value={formData.emailOrPhone}
              onChange={handleInputChange}
              placeholder="example@email.com hoặc 0912345678"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                validationErrors.emailOrPhone
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-green-500 focus:border-transparent'
              }`}
              disabled={isSubmitting}
              aria-invalid={!!validationErrors.emailOrPhone}
              aria-describedby={validationErrors.emailOrPhone ? 'emailOrPhone-error' : undefined}
            />
            {validationErrors.emailOrPhone && (
              <div id="emailOrPhone-error" className="flex items-center space-x-1 text-red-600 text-sm mt-2">
                <AlertCircle className="w-4 h-4" />
                <span>{validationErrors.emailOrPhone}</span>
              </div>
            )}
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Mật khẩu
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Nhập mật khẩu của bạn"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors pr-12 ${
                  validationErrors.password
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-green-500 focus:border-transparent'
                }`}
                disabled={isSubmitting}
                aria-invalid={!!validationErrors.password}
                aria-describedby={validationErrors.password ? 'password-error' : undefined}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isSubmitting}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50 p-1"
                aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {validationErrors.password && (
              <div id="password-error" className="flex items-center space-x-1 text-red-600 text-sm mt-2">
                <AlertCircle className="w-4 h-4" />
                <span>{validationErrors.password}</span>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting || showSuccess}
            className="w-full py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0"
          >
            {isSubmitting ? 'Đang xử lý...' : showSuccess ? 'Thành công!' : 'Đăng nhập'}
          </button>

          {/* Loading State */}
          {isSubmitting && (
            <div className="flex items-center justify-center space-x-2 text-green-600 bg-green-50 p-3 rounded-lg">
              <div className="animate-spin w-5 h-5 border-2 border-green-600 border-t-transparent rounded-full"></div>
              <span className="font-medium">Đang xác minh thông tin...</span>
            </div>
          )}

          {/* Error Message */}
          {authState.error && !isSubmitting && (
            <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-4 rounded-lg border border-red-200">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm font-medium">{authState.error}</span>
            </div>
          )}

          {/* Forgot Password */}
          <div className="text-center">
            <a 
              href="#" 
              className="text-sm text-green-600 hover:text-green-700 font-medium transition-colors hover:underline"
              tabIndex={isSubmitting ? -1 : 0}
            >
              Quên mật khẩu?
            </a>
          </div>

          {/* Register Link */}
          <div className="text-center">
            <span className="text-gray-600 text-sm">Chưa có tài khoản? </span>
            <button
              type="button"
              onClick={onSwitchToRegister}
              disabled={isSubmitting}
              className="text-green-600 font-semibold hover:text-green-700 transition-colors hover:underline disabled:opacity-50 text-sm"
            >
              Đăng ký ngay
            </button>
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Hoặc</span>
            </div>
          </div>

          {/* Google Login */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={isSubmitting}
            className="w-full py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 hover:border-gray-400 transition-all flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span>Đăng nhập với Google</span>
          </button>

          {/* Terms and Conditions */}
          <div className="text-xs text-gray-500 text-center leading-relaxed pt-2">
            Bằng việc đăng nhập, bạn đã đọc và đồng ý với{' '}
            <a href="#" className="text-green-600 hover:underline font-medium" tabIndex={isSubmitting ? -1 : 0}>
              Điều khoản sử dụng
            </a>{' '}
            và{' '}
            <a href="#" className="text-green-600 hover:underline font-medium" tabIndex={isSubmitting ? -1 : 0}>
              Chính sách bảo mật
            </a>{' '}
            của TicketGo
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
