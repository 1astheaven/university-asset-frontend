import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function WelcomePage() {
  const { userRole } = useContext(AuthContext);

  return (
    <div
      className="content"
      style={{
        backgroundColor: '#F5F5F5',
        minHeight: '67.8vh',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          width: '400px',
          backgroundColor: '#FFF',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          textAlign: 'center',
        }}
      >
        <h1 style={{ color: '#3C388D', fontSize: '24px', marginBottom: '20px' }}>Добро пожаловать!</h1>
        <p style={{ color: '#333', fontSize: '16px' }}>
          Вы успешно вошли в систему. Ваша роль: <strong>{userRole || 'Не определена'}</strong>.
        </p>
        <p style={{ color: '#333', fontSize: '16px', marginTop: '10px' }}>
          Используйте меню для навигации по разделам.
        </p>
      </div>
    </div>
  );
}

export default WelcomePage;