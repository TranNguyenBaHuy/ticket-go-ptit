import React, { useState } from 'react';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';

interface AuthContainerProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'register';
}

const AuthContainer: React.FC<AuthContainerProps> = ({ 
  isOpen, 
  onClose, 
  initialMode = 'login' 
}) => {
  const [authMode, setAuthMode] = useState<'login' | 'register'>(initialMode);

  const handleSwitchToLogin = () => {
    setAuthMode('login');
  };

  const handleSwitchToRegister = () => {
    setAuthMode('register');
  };

  const handleClose = () => {
    setAuthMode('login'); // Reset to login mode when closing
    onClose();
  };

  return (
    <>
      {authMode === 'login' && (
        <LoginModal
          isOpen={isOpen}
          onClose={handleClose}
          onSwitchToRegister={handleSwitchToRegister}
        />
      )}
      
      {authMode === 'register' && (
        <RegisterModal
          isOpen={isOpen}
          onClose={handleClose}
          onSwitchToLogin={handleSwitchToLogin}
        />
      )}
    </>
  );
};

export default AuthContainer;
