import React, { useState, useEffect, useRef } from 'react';
import { X, Eye, EyeOff, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import type { RegisterCredentials } from '../../constants/types/types';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({ isOpen, onClose, onSwitchToLogin }) => {
  const { register, authState, clearError } = useAuth();
  const [formData, setFormData] = useState<RegisterCredentials>({
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    name: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState<'weak' | 'medium' | 'strong' | null>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Focus management
  useEffect(() => {
    if (isOpen && nameInputRef.current) {
      setTimeout(() => nameInputRef.current?.focus(), 100);
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

  // Calculate password strength
  useEffect(() => {
    if (!formData.password) {
      setPasswordStrength(null);
      return;
    }
    
    let strength = 0;
    if (formData.password.length >= 8) strength++;
    if (/[a-z]/.test(formData.password) && /[A-Z]/.test(formData.password)) strength++;
    if (/\d/.test(formData.password)) strength++;
    if (/[^a-zA-Z\d]/.test(formData.password)) strength++;
    
    if (strength <= 1) setPasswordStrength('weak');
    else if (strength <= 2) setPasswordStrength('medium');
    else setPasswordStrength('strong');
  }, [formData.password]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Vui lòng nhập họ tên';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Họ tên phải có ít nhất 2 ký tự';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Vui lòng nhập email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }

    // Phone validation (Vietnamese format)
    if (formData.phone && formData.phone.trim()) {
      const phoneRegex = /^(0|\+84)(\s|\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\d)(\s|\.)?(\d{3})(\s|\.)?(\d{3})$/;
      if (!phoneRegex.test(formData.phone)) {
        newErrors.phone = 'Số điện thoại không hợp lệ';
      }
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Vui lòng nhập mật khẩu';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Vui lòng xác nhận mật khẩu';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Mật khẩu xác nhận không khớp';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await register(formData);
      if (response.success) {
        setShowSuccess(true);
        // Show success message briefly before closing
        setTimeout(() => {
          setShowSuccess(false);
          onClose();
          // Reset form
          setFormData({
            email: '',
            phone: '',
            password: '',
            confirmPassword: '',
            name: ''
          });
          setErrors({});
        }, 1500);
      }
    } catch (error) {
      console.error('Register error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    if (authState.error) clearError();
  };

  const handleGoogleRegister = () => {
    // TODO: Implement Google OAuth when backend is ready
    console.log('Google register clicked');
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
      aria-labelledby="register-modal-title"
    >
      <div 
        ref={modalRef}
        className="bg-white rounded-2xl w-full max-w-md shadow-2xl transform transition-all max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-t-2xl px-6 py-5 flex items-center justify-between sticky top-0 z-10">
          <h2 id="register-modal-title" className="text-white text-2xl font-bold">Đăng ký</h2>
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
              <span className="font-medium">Đăng ký thành công!</span>
            </div>
          )}

          {/* Name Input */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Họ và tên <span className="text-red-500">*</span>
            </label>
            <input
              ref={nameInputRef}
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Nguyễn Văn A"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                errors.name
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-green-500 focus:border-transparent'
              }`}
              disabled={isSubmitting}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'name-error' : undefined}
            />
            {errors.name && (
              <div id="name-error" className="flex items-center space-x-1 text-red-600 text-sm mt-2">
                <AlertCircle className="w-4 h-4" />
                <span>{errors.name}</span>
              </div>
            )}
          </div>

          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="example@email.com"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                errors.email
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-green-500 focus:border-transparent'
              }`}
              disabled={isSubmitting}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
            {errors.email && (
              <div id="email-error" className="flex items-center space-x-1 text-red-600 text-sm mt-2">
                <AlertCircle className="w-4 h-4" />
                <span>{errors.email}</span>
              </div>
            )}
          </div>

          {/* Phone Input */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              Số điện thoại <span className="text-gray-400 text-xs">(Tùy chọn)</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="0912345678"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                errors.phone
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-green-500 focus:border-transparent'
              }`}
              disabled={isSubmitting}
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? 'phone-error' : undefined}
            />
            {errors.phone && (
              <div id="phone-error" className="flex items-center space-x-1 text-red-600 text-sm mt-2">
                <AlertCircle className="w-4 h-4" />
                <span>{errors.phone}</span>
              </div>
            )}
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Mật khẩu <span className="text-red-500">*</span>
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
                  errors.password
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-green-500 focus:border-transparent'
                }`}
                disabled={isSubmitting}
                aria-invalid={!!errors.password}
                aria-describedby={errors.password ? 'password-error' : undefined}
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
            {/* Password Strength Indicator */}
            {passwordStrength && (
              <div className="mt-2">
                <div className="flex space-x-1">
                  <div className={`h-1 flex-1 rounded ${
                    passwordStrength === 'weak' ? 'bg-red-500' :
                    passwordStrength === 'medium' ? 'bg-yellow-500' :
                    'bg-green-500'
                  }`} />
                  <div className={`h-1 flex-1 rounded ${
                    passwordStrength === 'medium' || passwordStrength === 'strong' ? 
                    (passwordStrength === 'medium' ? 'bg-yellow-500' : 'bg-green-500') :
                    'bg-gray-200'
                  }`} />
                  <div className={`h-1 flex-1 rounded ${
                    passwordStrength === 'strong' ? 'bg-green-500' : 'bg-gray-200'
                  }`} />
                </div>
                <p className={`text-xs mt-1 ${
                  passwordStrength === 'weak' ? 'text-red-600' :
                  passwordStrength === 'medium' ? 'text-yellow-600' :
                  'text-green-600'
                }`}>
                  Độ mạnh: {passwordStrength === 'weak' ? 'Yếu' : passwordStrength === 'medium' ? 'Trung bình' : 'Mạnh'}
                </p>
              </div>
            )}
            {errors.password && (
              <div id="password-error" className="flex items-center space-x-1 text-red-600 text-sm mt-2">
                <AlertCircle className="w-4 h-4" />
                <span>{errors.password}</span>
              </div>
            )}
          </div>

          {/* Confirm Password Input */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
              Xác nhận mật khẩu <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Nhập lại mật khẩu"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors pr-12 ${
                  errors.confirmPassword
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-green-500 focus:border-transparent'
                }`}
                disabled={isSubmitting}
                aria-invalid={!!errors.confirmPassword}
                aria-describedby={errors.confirmPassword ? 'confirmPassword-error' : undefined}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                disabled={isSubmitting}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50 p-1"
                aria-label={showConfirmPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.confirmPassword && (
              <div id="confirmPassword-error" className="flex items-center space-x-1 text-red-600 text-sm mt-2">
                <AlertCircle className="w-4 h-4" />
                <span>{errors.confirmPassword}</span>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting || showSuccess}
            className="w-full py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0"
          >
            {isSubmitting ? 'Đang xử lý...' : showSuccess ? 'Thành công!' : 'Đăng ký'}
          </button>

          {/* Loading State */}
          {isSubmitting && (
            <div className="flex items-center justify-center space-x-2 text-green-600 bg-green-50 p-3 rounded-lg">
              <div className="animate-spin w-5 h-5 border-2 border-green-600 border-t-transparent rounded-full"></div>
              <span className="font-medium">Đang tạo tài khoản...</span>
            </div>
          )}

          {/* Error Message */}
          {authState.error && !isSubmitting && (
            <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-4 rounded-lg border border-red-200">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm font-medium">{authState.error}</span>
            </div>
          )}

          {/* Login Link */}
          <div className="text-center">
            <span className="text-gray-600 text-sm">Đã có tài khoản? </span>
            <button
              type="button"
              onClick={onSwitchToLogin}
              disabled={isSubmitting}
              className="text-green-600 font-semibold hover:text-green-700 transition-colors hover:underline disabled:opacity-50 text-sm"
            >
              Đăng nhập ngay
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

          {/* Google Register */}
          <button
            type="button"
            onClick={handleGoogleRegister}
            disabled={isSubmitting}
            className="w-full py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 hover:border-gray-400 transition-all flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span>Đăng ký với Google</span>
          </button>

          {/* Terms and Conditions */}
          <div className="text-xs text-gray-500 text-center leading-relaxed pt-2">
            Bằng việc đăng ký, bạn đã đọc và đồng ý với{' '}
            <a href="#" className="text-green-600 hover:underline font-medium" tabIndex={isSubmitting ? -1 : 0}>
              Điều khoản sử dụng
            </a>{' '}
            và{' '}
            <a href="#" className="text-green-600 hover:underline font-medium" tabIndex={isSubmitting ? -1 : 0}>
              Chính sách bảo mật
            </a>{' '}
            của Ticketbox
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterModal;
