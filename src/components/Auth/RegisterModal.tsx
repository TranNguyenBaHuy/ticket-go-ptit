import React, { useState } from 'react';
import { X, Eye, EyeOff, Info, ChevronDown } from 'lucide-react';
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

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Vui lòng nhập họ tên';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Vui lòng nhập email';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }

    if (!formData.phone?.trim() && !formData.email.trim()) {
      newErrors.phone = 'Vui lòng nhập email hoặc số điện thoại';
    }

    if (!formData.password) {
      newErrors.password = 'Vui lòng nhập mật khẩu';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
    }

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
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    clearError();

    try {
      const response = await register(formData);
      if (response.success) {
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
    
    // Clear error for this field
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-md shadow-xl">
        {/* Header */}
        <div className="bg-green-600 rounded-t-lg px-6 py-4 flex items-center justify-between">
          <h2 className="text-white text-xl font-bold">Đăng ký</h2>
          <div className="flex items-center space-x-3">
            {/* Dog character placeholder */}
            <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
              <span className="text-yellow-800 text-sm">🐶</span>
            </div>
            <button
              onClick={onClose}
              className="w-6 h-6 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <X className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Name Input */}
          <div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Nhập họ và tên"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          {/* Email Input */}
          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Nhập email"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Phone Input */}
          <div>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Nhập số điện thoại (tùy chọn)"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                errors.phone ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>

          {/* Password Input */}
          <div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Nhập mật khẩu"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent pr-12 ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          {/* Confirm Password Input */}
          <div>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Xác nhận mật khẩu"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent pr-12 ${
                  errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Đang tạo tài khoản...' : 'Tạo tài khoản'}
          </button>

          {/* Loading State */}
          {isSubmitting && (
            <div className="flex items-center justify-center space-x-2 text-green-600">
              <div className="animate-spin w-4 h-4 border-2 border-green-600 border-t-transparent rounded-full"></div>
              <span>Đang tạo tài khoản...</span>
              <div className="flex items-center space-x-2 ml-auto">
                <span className="text-xs text-gray-500">CLOUDFLARE</span>
                <a href="#" className="text-xs text-blue-600 hover:underline">Quyền riêng tư</a>
                <a href="#" className="text-xs text-blue-600 hover:underline">Điều khoản</a>
              </div>
            </div>
          )}

          {/* Error Message */}
          {authState.error && (
            <div className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-lg">
              {authState.error}
            </div>
          )}

          {/* Login Link */}
          <div className="text-center">
            <span className="text-gray-600">Đã có tài khoản? </span>
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="text-green-600 font-medium hover:text-green-700 transition-colors"
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
            className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-3"
          >
            <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
              <span className="text-blue-600 font-bold text-sm">G</span>
            </div>
            <span>Đăng ký với Google</span>
            <ChevronDown className="w-4 h-4" />
          </button>

          {/* Terms and Conditions */}
          <div className="text-xs text-gray-500 text-center leading-relaxed">
            Bằng việc tiếp tục, bạn đã đọc và đồng ý với{' '}
            <a href="#" className="text-blue-600 hover:underline">Điều khoản sử dụng</a>{' '}
            và{' '}
            <a href="#" className="text-blue-600 hover:underline">
              Chính sách bảo mật thông tin cá nhân
            </a>{' '}
            của Ticketbox
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterModal;
