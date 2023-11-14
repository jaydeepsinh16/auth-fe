import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthGuardProps {
  component: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ component }) => {
  const [isAuthenticated, setisAuthenticated] = useState(false);
  const navigate = useNavigate();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const checkToken = async () => {
    if (!!localStorage.getItem('access_token')) {
      setisAuthenticated(true);
    } else {
      navigate('/login');
    }
  };

  useEffect(() => {
    checkToken();
  });

  return isAuthenticated ? <>{component}</> : <></>;
};

export default AuthGuard;
