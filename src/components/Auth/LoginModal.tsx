import React, { useState } from 'react';
import { X, Eye, EyeOff, Info, ChevronDown } from 'lucide-react';
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    clearError();

    try {
      const response = await login(formData);
      if (response.success) {
        onClose();
        // Reset form
        setFormData({ emailOrPhone: '', password: '' });
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
    if (authState.error) clearError();
  };

  const handleGoogleLogin = () => {
    // TODO: Implement Google OAuth when backend is ready
    console.log('Google login clicked');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-md shadow-xl">
        {/* Header */}
        <div className="bg-green-600 rounded-t-lg px-6 py-4 flex items-center justify-between">
          <h2 className="text-white text-xl font-bold">Đăng nhập</h2>
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
          {/* Email/Phone Input */}
          <div>
            <input
              type="text"
              name="emailOrPhone"
              value={formData.emailOrPhone}
              onChange={handleInputChange}
              placeholder="Nhập email hoặc số điện thoại"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            />
            <div className="flex items-center justify-end mt-1">
              <button
                type="button"
                className="w-5 h-5 bg-gray-400 rounded-full flex items-center justify-center hover:bg-gray-500 transition-colors"
              >
                <Info className="w-3 h-3 text-white" />
              </button>
            </div>
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent pr-12"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Tiếp tục
          </button>

          {/* Loading State */}
          {isSubmitting && (
            <div className="flex items-center justify-center space-x-2 text-green-600">
              <div className="animate-spin w-4 h-4 border-2 border-green-600 border-t-transparent rounded-full"></div>
              <span>Đang xác minh...</span>
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

          {/* Forgot Password */}
          <div className="text-center">
            <a href="#" className="text-gray-600 hover:text-gray-800 transition-colors">
              Quên mật khẩu?
            </a>
          </div>

          {/* Register Link */}
          <div className="text-center">
            <span className="text-gray-600">Chưa có tài khoản? </span>
            <button
              type="button"
              onClick={onSwitchToRegister}
              className="text-green-600 font-medium hover:text-green-700 transition-colors"
            >
              Tạo tài khoản ngay
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
            className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-3"
          >
            <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
              <span className="text-blue-600 font-bold text-sm">G</span>
            </div>
            <span>Đăng nhập với tên Khoa</span>
            <div className="flex flex-col items-start">
              <span className="text-xs">khoa95905@gmail.com</span>
            </div>
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

export default LoginModal;
