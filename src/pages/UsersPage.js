import { useState, useEffect } from 'react';
import { getUsers } from '../services/api';

function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const data = await getUsers();
        console.log('Данные пользователей:', data); // Отладка
        setUsers(data);
      } catch (err) {
        console.error('Ошибка при загрузке пользователей:', err);
        setError('Не удалось загрузить пользователей');
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) return <div className="content"><p>Загрузка...</p></div>;
  if (error) return <div className="content"><p style={{ color: 'red' }}>{error}</p></div>;

  return (
    <div className="content">
      <h2>Список пользователей</h2>
      {users.length > 0 ? (
        <ul>
          {users.map((user) => (
            <li key={user.id}>{user.email} (Роль: {user.role})</li>
          ))}
        </ul>
      ) : (
        <p>Нет пользователей.</p>
      )}
    </div>
  );
}

export default UsersPage;