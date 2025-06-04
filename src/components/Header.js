import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Header() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [userRole, setUserRole] = useState(localStorage.getItem('role'));

  // Функция для обновления состояния
  const updateAuthState = () => {
    setToken(localStorage.getItem('token'));
    setUserRole(localStorage.getItem('role'));
    console.log('Header updated - Token:', localStorage.getItem('token'), 'Role:', localStorage.getItem('role')); // Отладка
  };

  useEffect(() => {
    // Слушаем кастомное событие authChange
    window.addEventListener('authChange', updateAuthState);

    // Проверяем при монтировании
    updateAuthState();

    return () => {
      window.removeEventListener('authChange', updateAuthState);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setToken(null);
    setUserRole(null);
    window.dispatchEvent(new Event('authChange')); // Уведомляем об изменении
    window.location.href = '/';
  };

  return (
    <div className="header">
      <img src="/images/tusur-logo.png" alt="Логотип ТУСУР" />
      <h1>Система управления имуществом</h1>
      <nav style={{ marginLeft: 'auto' }}>
        {token ? (
          <>
            {userRole === 'admin' && (
              <Link to="/users" style={{ color: 'black', marginRight: '15px' }}>Пользователи</Link>
            )}
            <Link to="/rooms" style={{ color: 'black', marginRight: '15px' }}>Помещения</Link>
            <Link to="/assets" style={{ color: 'black', marginRight: '15px' }}>Имущество</Link>
            <Link to="/profile" style={{ color: 'black', marginRight: '15px' }}>Профиль</Link>
            <button onClick={handleLogout} style={{ color: 'black', background: 'none', border: 'none', cursor: 'pointer' }}>
              Выход
            </button>
          </>
        ) : (
          <span style={{ color: 'black' }}>Пожалуйста, войдите</span>
        )}
      </nav>
    </div>
  );
}

export default Header;