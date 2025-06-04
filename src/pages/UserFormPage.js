import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createUser, updateUser, getUser } from '../services/api';

function UserFormPage() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: '',
    first_name: '',
    last_name: '',
    middle_name: '',
    role: 'user',
    password: '',
    confirm_password: '',
    photo: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (userId) {
      const fetchUser = async () => {
        try {
          const data = await getUser(userId);
          setUser({ ...data, password: '', confirm_password: '' });
        } catch (err) {
          console.error('Ошибка при загрузке пользователя:', err);
        }
      };
      fetchUser();
    }
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user.password && user.password !== user.confirm_password) {
      setError('Пароли не совпадают');
      return;
    }
    try {
      if (userId) {
        await updateUser(userId, user);
        navigate(`/users/${userId}`);
      } else {
        const newUser = await createUser(user);
        navigate(`/users/${newUser.id}`);
      }
    } catch (err) {
      setError('Ошибка при сохранении пользователя');
    }
  };

  return (
    <div className="content">
      <h2>{userId ? 'Редактировать пользователя' : 'Создать пользователя'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Фамилия"
          value={user.last_name || ''}
          onChange={(e) => setUser({ ...user, last_name: e.target.value })}
          required={!userId}
        />
        <input
          type="text"
          placeholder="Имя"
          value={user.first_name || ''}
          onChange={(e) => setUser({ ...user, first_name: e.target.value })}
          required={!userId}
        />
        <input
          type="text"
          placeholder="Отчество"
          value={user.middle_name || ''}
          onChange={(e) => setUser({ ...user, middle_name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          required
        />
        <select
          value={user.role}
          onChange={(e) => setUser({ ...user, role: e.target.value })}
        >
          <option value="user">Пользователь</option>
          <option value="admin">Администратор</option>
        </select>
        <input
          type="password"
          placeholder="Пароль"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          required={!userId}
        />
        <input
          type="password"
          placeholder="Подтверждение пароля"
          value={user.confirm_password}
          onChange={(e) => setUser({ ...user, confirm_password: e.target.value })}
          required={!userId}
        />
        <input
          type="text"
          placeholder="URL фото"
          value={user.photo || ''}
          onChange={(e) => setUser({ ...user, photo: e.target.value })}
        />
        <button type="submit">{userId ? 'Сохранить' : 'Создать'}</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default UserFormPage;