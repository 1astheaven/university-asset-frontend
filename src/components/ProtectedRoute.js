import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');
  console.log('ProtectedRoute token:', token); // Отладка
  if (!token) {
    return <Navigate to="/" replace />;
  }
  return children;
}

export default ProtectedRoute;