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

  if (loading) return <div className="content"><p>Загрузка...</p></div>;
  if (error) return <div className="content"><p style={{ color: 'red' }}>{error}</p></div>;

  return (
    <div className="content">
      <h2>Профиль пользователя</h2>
      {user ? (
        <div>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Роль:</strong> {user.role}</p>
          <p><strong>Имя:</strong> {user.first_name}</p>
          <p><strong>Фамилия:</strong> {user.last_name}</p>
        </div>
      ) : (
        <p>Данные пользователя не найдены.</p>
      )}
    </div>
  );
}

export default ProfilePage;