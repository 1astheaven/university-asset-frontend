import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api';
import { AuthContext } from '../context/AuthContext';

function LoginPage() {
  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('admin');
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login: authLogin } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await login(email, password);
      authLogin(data.access_token, data.role || 'user');
      navigate('/welcome');
        setTimeout(() => {
        window.location.reload();
        }, 50);
    } catch (err) {
      setError('Неверный email или пароль');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div
      className="content"
      style={{
        backgroundColor: '#F5F5F5',
        minHeight: '73vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <h1
        style={{
          color: '#3C388D',
          fontSize: '48px',
          fontWeight: 'bold',
          marginBottom: '40px',
          textAlign: 'center',
        }}
      >
        ВХОД
      </h1>
      <form
        onSubmit={handleLogin}
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '300px',
          gap: '20px',
        }}
      >
        <div>
          <label
            style={{
              display: 'block',
              marginBottom: '5px',
              color: '#333',
              fontSize: '16px',
            }}
          >
            Email:
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            style={{
              width: '100%',
              padding: '10px',
              border: 'none',
              borderRadius: '10px',
              backgroundColor: '#E0E0E8',
              fontSize: '16px',
              boxSizing: 'border-box',
            }}
          />
        </div>
        <div>
          <label
            style={{
              display: 'block',
              marginBottom: '5px',
              color: '#333',
              fontSize: '16px',
            }}
          >
            Пароль:
          </label>
          <div style={{ position: 'relative' }}>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Пароль"
              required
              style={{
                width: '100%',
                padding: '10px',
                border: 'none',
                borderRadius: '10px',
                backgroundColor: '#E0E0E8',
                fontSize: '16px',
                boxSizing: 'border-box',
              }}
            />
            <span
              onClick={togglePasswordVisibility}
              style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                cursor: 'pointer',
              }}
            >
            </span>
          </div>
        </div>
        <button
          type="submit"
          style={{
            padding: '12px',
            backgroundColor: '#0056b3',
            color: '#FFF',
            border: 'none',
            borderRadius: '10px',
            fontSize: '16px',
            cursor: 'pointer',
            width: '100%',
          }}
        >
          Войти
        </button>
        {error && <p style={{ color: 'red', textAlign: 'center', marginTop: '10px' }}>{error}</p>}
      </form>
      <div
        style={{
          marginTop: '20px',
          textAlign: 'center',
          color: '#0056b3',
        }}
      >
      </div>
    </div>
  );
}

export default LoginPage;