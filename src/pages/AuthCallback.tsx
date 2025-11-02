import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
// @ts-expect-error - JSX file without type declarations
import { useAuth } from '../contexts/AuthContext';
import { jwtDecode } from 'jwt-decode';

const AuthCallback: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const handleCallback = async () => {
      const token = searchParams.get('token');
      const error = searchParams.get('error');

      if (error) {
        console.error('Google OAuth error:', error);
        navigate('/?error=' + error);
        return;
      }

      if (token) {
        try {
          // Lưu token và cập nhật auth state
          login(token);

          // Decode token để lấy thông tin user
          const decodedUser = jwtDecode(token) as { role?: { name?: string } };

          // Navigate dựa trên role
          if (decodedUser.role?.name === 'ADMIN') {
            navigate('/admin');
          } else {
            navigate('/');
          }
        } catch (error) {
          console.error('Token processing error:', error);
          navigate('/?error=invalid_token');
        }
      } else {
        navigate('/?error=no_token');
      }
    };

    handleCallback();
  }, [searchParams, navigate, login]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-gray-600 text-lg">Đang xử lý đăng nhập...</p>
      </div>
    </div>
  );
};

export default AuthCallback;
