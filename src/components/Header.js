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
    <div
      className="header"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '10px 20px',
        backgroundColor: '#f5f5f5',
        borderBottom: '1px solid #ccc',
      }}
    >
      <div
        style={{
          textAlign: 'center',
          marginBottom: '10px',
        }}
      >
        <img
          src="/images/tusur-logo.png"
          alt="Логотип ТУСУР"
          style={{
            maxWidth: '200px',
            height: 'auto',
          }}
        />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
        <h1 style={{ margin: '0 20px 0 0', fontSize: '20px', color: '#3C388D' }}>Система управления имуществом</h1>
        <nav style={{ marginLeft: 'auto' }}>
          {token ? (
            <>
              {userRole === 'admin' && (
                <Link
                  to="/users"
                  style={{
                    color: '#3C388D',
                    marginRight: '15px',
                    textDecoration: 'none',
                    fontSize: '16px',
                    padding: '5px 10px',
                    borderRadius: '5px',
                    transition: 'color 0.3s',
                  }}
                  onMouseEnter={(e) => (e.target.style.color = '#FFF')}
                  onMouseLeave={(e) => (e.target.style.color = '#3C388D')}
                >
                  Пользователи
                </Link>
              )}
              <Link
                to="/rooms"
                style={{
                  color: '#3C388D',
                  marginRight: '15px',
                  textDecoration: 'none',
                  fontSize: '16px',
                  padding: '5px 10px',
                  borderRadius: '5px',
                  transition: 'color 0.3s',
                }}
                onMouseEnter={(e) => (e.target.style.color = '#FFF')}
                onMouseLeave={(e) => (e.target.style.color = '#3C388D')}
              >
                Помещения
              </Link>
              <Link
                to="/assets"
                style={{
                  color: '#3C388D',
                  marginRight: '15px',
                  textDecoration: 'none',
                  fontSize: '16px',
                  padding: '5px 10px',
                  borderRadius: '5px',
                  transition: 'color 0.3s',
                }}
                onMouseEnter={(e) => (e.target.style.color = '#FFF')}
                onMouseLeave={(e) => (e.target.style.color = '#3C388D')}
              >
                Имущество
              </Link>
              <Link
                to="/profile"
                style={{
                  color: '#3C388D',
                  marginRight: '15px',
                  textDecoration: 'none',
                  fontSize: '16px',
                  padding: '5px 10px',
                  borderRadius: '5px',
                  transition: 'color 0.3s',
                }}
                onMouseEnter={(e) => (e.target.style.color = '#FFF')}
                onMouseLeave={(e) => (e.target.style.color = '#3C388D')}
              >
                Профиль
              </Link>
              <button
                onClick={handleLogout}
                style={{
                  color: '#3C388D',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '16px',
                  padding: '5px 10px',
                  borderRadius: '5px',
                  transition: 'color 0.3s',
                }}
                onMouseEnter={(e) => (e.target.style.color = '#FFF')}
                onMouseLeave={(e) => (e.target.style.color = '#3C388D')}
              >
                Выход
              </button>
            </>
          ) : (
            <span style={{ color: 'black' }}></span>
          )}
        </nav>
      </div>
    </div>
  );
}

export default Header;