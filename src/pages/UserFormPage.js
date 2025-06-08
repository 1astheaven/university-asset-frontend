import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../services/api';

function UserFormPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [role, setRole] = useState('user');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = { email, password, first_name: firstName, last_name: lastName, role };
      console.log('Sending user data:', userData); // Для отладки
      await createUser(userData);
      navigate('/users');
    } catch (err) {
      console.error('Error creating user:', err.response ? err.response.data : err.message);
      setError('Не удалось создать пользователя. Проверьте данные или права доступа.');
    }
  };

  return (
    <div className="content">
      <h2>Добавить нового пользователя</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Введите email" required />
        </div>
        <div>
          <label>Пароль:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Введите пароль" required />
        </div>
        <div>
          <label>Имя:</label>
          <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Введите имя" />
        </div>
        <div>
          <label>Фамилия:</label>
          <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Введите фамилию" />
        </div>
        <div>
          <label>Роль:</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button type="submit">Создать</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
}

export default UserFormPage;