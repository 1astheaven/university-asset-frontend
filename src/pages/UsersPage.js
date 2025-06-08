import { useState, useEffect } from 'react';
import { getUsers, updateUser, createUser } from '../services/api';

function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: '',
    first_name: '', // Добавлено поле для имени
    last_name: '',  // Добавлено поле для фамилии
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const data = await getUsers();
        console.log('Полученные пользователи:', data);
        setUsers(data);
      } catch (err) {
        console.error('Ошибка загрузки пользователей:', err);
        setError('Не удалось загрузить список пользователей');
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        email: formData.email || undefined,
        password: formData.password || undefined,
        role: formData.role || undefined,
        first_name: formData.first_name || undefined, // Добавлено имя
        last_name: formData.last_name || undefined,   // Добавлена фамилия
      };

      const filteredPayload = Object.fromEntries(
        Object.entries(payload).filter(([_, value]) => value !== undefined && value !== '')
      );

      if (Object.keys(filteredPayload).length === 0) {
        throw new Error('Хотя бы одно поле должно быть заполнено');
      }

      console.log('Отправляемые данные:', filteredPayload, 'для пользователя:', selectedUser?.id);
      let updatedUser;
      if (isEditing && selectedUser) {
        updatedUser = await updateUser(selectedUser.id, filteredPayload);
        setUsers(users.map(user => user.id === selectedUser.id ? updatedUser : user));
      } else if (isCreating) {
        updatedUser = await createUser(filteredPayload);
        setUsers([...users, updatedUser]);
      }
      setFormData({ email: '', password: '', role: '', first_name: '', last_name: '' });
      setSelectedUser(null);
      setIsEditing(false);
      setIsCreating(false);
    } catch (err) {
      console.error('Ошибка:', err.response ? err.response.data : err.message);
      const errorMessage = err.response?.data?.detail
        ? Array.isArray(err.response.data.detail)
          ? err.response.data.detail.map(e => e.msg).join(', ')
          : err.response.data.detail
        : err.message;
      setError(errorMessage || 'Не удалось обработать запрос');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setFormData({
      email: user.email,
      password: '',
      role: user.role,
      first_name: user.first_name || '', // Учитываем, что имя может отсутствовать
      last_name: user.last_name || '',   // Учитываем, что фамилия может отсутствовать
    });
    setIsEditing(true);
    setIsCreating(false);
  };

  const handleCancel = () => {
    setFormData({ email: '', password: '', role: '', first_name: '', last_name: '' });
    setSelectedUser(null);
    setIsEditing(false);
    setIsCreating(false);
  };

  const handleCreate = () => {
    setFormData({ email: '', password: '', role: '', first_name: '', last_name: '' });
    setSelectedUser(null);
    setIsEditing(false);
    setIsCreating(true);
  };

  if (loading) return <div className="content"><p style={{ color: '#333' }}>Загрузка...</p></div>;
  if (error) return <div className="content"><p style={{ color: 'red' }}>{error}</p></div>;

  return (
    <div
      className="content"
      style={{
        backgroundColor: '#F5F5F5',
        minHeight: '67vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      {!isEditing && !isCreating && (
        <button
          onClick={handleCreate}
          style={{
            padding: '10px 20px',
            backgroundColor: '#3C388D',
            color: '#FFF',
            border: 'none',
            borderRadius: '10px',
            fontSize: '16px',
            cursor: 'pointer',
            marginBottom: '20px',
          }}
        >
          Добавить пользователя
        </button>
      )}

      {(isEditing || isCreating) && (
        <form
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '300px',
            gap: '15px',
            backgroundColor: '#FFF',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          }}
        >
          <div>
            <label
              style={{
                marginBottom: '5px',
                color: '#333',
                fontSize: '16px',
              }}
            >
              Email:
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
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
                marginBottom: '5px',
                color: '#333',
                fontSize: '16px',
              }}
            >
              Пароль:
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required={!isEditing}
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
                marginBottom: '5px',
                color: '#333',
                fontSize: '16px',
              }}
            >
              Имя:
            </label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
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
                marginBottom: '5px',
                color: '#333',
                fontSize: '16px',
              }}
            >
              Фамилия:
            </label>
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
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
                marginBottom: '5px',
                color: '#333',
                fontSize: '16px',
              }}
            >
              Роль:
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
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
            >
              <option value="">Выберите роль</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div>
            <button
              type="submit"
              disabled={loading}
              style={{
                padding: '10px 20px',
                backgroundColor: '#3C388D',
                color: '#FFF',
                border: 'none',
                borderRadius: '10px',
                fontSize: '16px',
                cursor: 'pointer',
                width: '100%',
              }}
            >
              {isEditing ? 'Сохранить изменения' : 'Создать пользователя'}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              disabled={loading}
              style={{
                padding: '10px 20px',
                backgroundColor: '#FFF',
                color: '#3C388D',
                border: '1px solid #3C388D',
                borderRadius: '10px',
                fontSize: '16px',
                cursor: 'pointer',
                width: '100%',
                marginTop: '10px',
              }}
            >
              Отмена
            </button>
          </div>
          {error && <p style={{ color: 'red', textAlign: 'center', marginTop: '10px' }}>{error}</p>}
        </form>
      )}

      <h3
        style={{
          color: '#3C388D',
          fontSize: '24px',
          marginTop: '20px',
          textAlign: 'center',
        }}
      >
        Список пользователей
      </h3>
      {users.length > 0 ? (
        <ul
          style={{
            listStyle: 'none',
            padding: '0',
            width: '300px',
            marginTop: '10px',
          }}
        >
          {users.map((user) => (
            <li
              key={user.id}
              style={{
                padding: '10px',
                backgroundColor: '#FFF',
                borderRadius: '10px',
                marginBottom: '10px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              }}
            >
              <span>
                {user.first_name} {user.last_name} ({user.email}, Роль: {user.role})
              </span>
              <button
                onClick={() => handleEdit(user)}
                style={{
                  padding: '5px 10px',
                  backgroundColor: '#3C388D',
                  color: '#FFF',
                  border: 'none',
                  borderRadius: '5px',
                  fontSize: '14px',
                  cursor: 'pointer',
                }}
              >
                Редактировать
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p style={{ color: '#333', textAlign: 'center', marginTop: '10px' }}>Пользователей нет.</p>
      )}
    </div>
  );
}

export default UsersPage;