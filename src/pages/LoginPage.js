import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api';

function LoginPage() {
  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('admin');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await login(email, password);
      localStorage.setItem('token', data.access_token);
      localStorage.setItem('role', data.role || 'user');
      console.log('Login successful, token:', data.access_token, 'role:', data.role);
      window.dispatchEvent(new Event('authChange')); // Уведомляем об изменении
      navigate('/users');
    } catch (err) {
      console.error('Login error:', err);
      setError('Неверный email или пароль');
    }
  };

  return (
    <div className="content">
      <h2>Вход</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Пароль"
        />
        <button type="submit">Войти</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
}

export default LoginPage;