import { Navigate } from 'react-router-dom';

import { RootState, useAppSelector } from '../store/store';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isLoggedIn } = useAppSelector((state: RootState) => state.sessionData);

  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }

  return children;
};
