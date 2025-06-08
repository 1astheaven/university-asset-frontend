import { useState, useEffect } from 'react';
import { getCurrentUser } from '../services/api';

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const data = await getCurrentUser();
        console.log('Данные пользователя:', data); // Отладка
        setUser(data);
      } catch (err) {
        console.error('Ошибка при загрузке профиля:', err);
        setError('Не удалось загрузить данные профиля');
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  if (loading) return <div className="content"><p style={{ color: '#333' }}>Загрузка...</p></div>;
  if (error) return <div className="content"><p style={{ color: 'red' }}>{error}</p></div>;

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
          width: '300px',
          backgroundColor: '#FFF',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          textAlign: 'left',
        }}
      >
        {user ? (
          <>
            <p><strong style={{ color: '#3C388D' }}>Email:</strong> {user.email || 'Не указано'}</p>
            <p><strong style={{ color: '#3C388D' }}>Роль:</strong> {user.role || 'Не указано'}</p>
            <p><strong style={{ color: '#3C388D' }}>Имя:</strong> {user.first_name || 'Не указано'}</p>
            <p><strong style={{ color: '#3C388D' }}>Фамилия:</strong> {user.last_name || 'Не указано'}</p>
          </>
        ) : (
          <p style={{ color: '#333', textAlign: 'center' }}>Данные пользователя не найдены.</p>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;