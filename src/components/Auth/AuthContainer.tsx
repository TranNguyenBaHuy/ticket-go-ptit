import React, { useState, useEffect, useCallback } from 'react';
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
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setAuthMode(initialMode);
    }
  }, [isOpen, initialMode]);

  const handleSwitchToLogin = useCallback(() => {
    setIsTransitioning(true);
    setTimeout(() => {
      setAuthMode('login');
      setIsTransitioning(false);
    }, 150);
  }, []);

  const handleSwitchToRegister = useCallback(() => {
    setIsTransitioning(true);
    setTimeout(() => {
      setAuthMode('register');
      setIsTransitioning(false);
    }, 150);
  }, []);

  const handleClose = useCallback(() => {
    setIsTransitioning(false);
    setTimeout(() => {
      setAuthMode('login');
    }, 300);
    onClose();
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className={`auth-container ${isTransitioning ? 'transitioning' : ''}`}>
      {authMode === 'login' ? (
        <LoginModal
          isOpen={isOpen && !isTransitioning}
          onClose={handleClose}
          onSwitchToRegister={handleSwitchToRegister}
        />
      ) : (
        <RegisterModal
          isOpen={isOpen && !isTransitioning}
          onClose={handleClose}
          onSwitchToLogin={handleSwitchToLogin}
        />
      )}
    </div>
  );
};

export default AuthContainer;
