import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext'; // Убедитесь, что путь верный

function ProtectedRoute({ children, requiredRole }) {
  const auth = useContext(AuthContext);

  // Проверка, определен ли контекст
  if (!auth) {
    console.error('AuthContext is undefined. Check if AuthProvider is wrapping the app.');
    return <div>Ошибка авторизации. Перезагрузите страницу или войдите заново.</div>;
  }

  const { token, userRole } = auth;

  if (!token) {
    return <Navigate to="/" />;
  }

  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/users" />;
  }

  return children;
}

export default ProtectedRoute;