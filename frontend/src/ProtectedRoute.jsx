import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const token = typeof window !== 'undefined' && localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
}