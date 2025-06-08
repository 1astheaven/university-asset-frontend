import { useState, useEffect } from 'react';
import { createAsset, getAssets, updateAsset, deleteAsset } from '../services/api';

function AssetsPage() {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    id: null,
    name: '',
    category: '',
    status: '',
    room_id: '',
    responsible_user_id: '',
    inventory_number: '',
    photo: '',
    commissioned_date: '',
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchAssets = async () => {
      setLoading(true);
      try {
        const data = await getAssets();
        console.log('Полученные активы:', data);
        setAssets(data);
      } catch (err) {
        console.error('Ошибка загрузки активов:', err);
        setError('Не удалось загрузить список имущества');
      } finally {
        setLoading(false);
      }
    };
    fetchAssets();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...formData,
        room_id: parseInt(formData.room_id),
        responsible_user_id: parseInt(formData.responsible_user_id),
        commissioned_date: formData.commissioned_date || null,
      };

      if (!payload.name || !payload.category || !payload.status || !payload.room_id || !payload.responsible_user_id || !payload.inventory_number) {
        throw new Error('Все обязательные поля должны быть заполнены');
      }

      if (isEditing && payload.id) {
        const updatedAsset = await updateAsset(payload.id, payload);
        setAssets(assets.map(asset => asset.id === payload.id ? updatedAsset : asset));
      } else {
        const newAsset = await createAsset(payload);
        setAssets([...assets, newAsset]);
      }

      setFormData({
        id: null,
        name: '',
        category: '',
        status: '',
        room_id: '',
        responsible_user_id: '',
        inventory_number: '',
        photo: '',
        commissioned_date: '',
      });
      setIsEditing(false);
    } catch (err) {
      console.error('Ошибка обработки формы:', err.response ? err.response.data : err.message);
      setError(err.response?.data?.detail || 'Не удалось обработать запрос');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEdit = (asset) => {
    setFormData({ ...asset });
    setIsEditing(true);
  };

  const handleDelete = async (assetId) => {
    if (window.confirm('Вы уверены, что хотите удалить это имущество?')) {
      setLoading(true);
      try {
        await deleteAsset(assetId);
        setAssets(assets.filter(asset => asset.id !== assetId));
      } catch (err) {
        console.error('Ошибка удаления актива:', err);
        setError('Не удалось удалить имущество');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCancel = () => {
    setFormData({
      id: null,
      name: '',
      category: '',
      status: '',
      room_id: '',
      responsible_user_id: '',
      inventory_number: '',
      photo: '',
      commissioned_date: '',
    });
    setIsEditing(false);
  };

  if (loading) return <div className="content"><p style={{ color: '#333' }}>Загрузка...</p></div>;
  if (error) return <div className="content"><p style={{ color: 'red' }}>{error}</p></div>;

  return (
    <div
      className="content"
      style={{
        backgroundColor: '#F5F5F5',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        height: 'calc(100vh - 100px)', // Учитываем высоту хедера
        display: 'flex',
        flexDirection: 'row', // Горизонтальное расположение
        alignItems: 'flex-start', // Выравнивание по верхнему краю
        justifyContent: 'space-between', // Распределение пространства
      }}
    >
      <div style={{ width: '45%', display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <form
          onSubmit={handleSubmit}
          style={{
            backgroundColor: '#FFF',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            width: '100%',
          }}
        >
          <input type="hidden" name="id" value={formData.id} />
          <div style={{ marginBottom: '10px' }}>
            <label style={{ color: '#333', fontSize: '16px', marginBottom: '5px', display: 'block' }}>Название:*</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '10px', border: 'none', borderRadius: '10px', backgroundColor: '#E0E0E8', fontSize: '16px', boxSizing: 'border-box' }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label style={{ color: '#333', fontSize: '16px', marginBottom: '5px', display: 'block' }}>Категория:*</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '10px', border: 'none', borderRadius: '10px', backgroundColor: '#E0E0E8', fontSize: '16px', boxSizing: 'border-box' }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label style={{ color: '#333', fontSize: '16px', marginBottom: '5px', display: 'block' }}>Статус:*</label>
            <input
              type="text"
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '10px', border: 'none', borderRadius: '10px', backgroundColor: '#E0E0E8', fontSize: '16px', boxSizing: 'border-box' }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label style={{ color: '#333', fontSize: '16px', marginBottom: '5px', display: 'block' }}>ID комнаты:*</label>
            <input
              type="number"
              name="room_id"
              value={formData.room_id}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '10px', border: 'none', borderRadius: '10px', backgroundColor: '#E0E0E8', fontSize: '16px', boxSizing: 'border-box' }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label style={{ color: '#333', fontSize: '16px', marginBottom: '5px', display: 'block' }}>ID ответственного:*</label>
            <input
              type="number"
              name="responsible_user_id"
              value={formData.responsible_user_id}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '10px', border: 'none', borderRadius: '10px', backgroundColor: '#E0E0E8', fontSize: '16px', boxSizing: 'border-box' }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label style={{ color: '#333', fontSize: '16px', marginBottom: '5px', display: 'block' }}>Инвентарный номер:*</label>
            <input
              type="text"
              name="inventory_number"
              value={formData.inventory_number}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '10px', border: 'none', borderRadius: '10px', backgroundColor: '#E0E0E8', fontSize: '16px', boxSizing: 'border-box' }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label style={{ color: '#333', fontSize: '16px', marginBottom: '5px', display: 'block' }}>Фото (URL):</label>
            <input
              type="text"
              name="photo"
              value={formData.photo}
              onChange={handleChange}
              style={{ width: '100%', padding: '10px', border: 'none', borderRadius: '10px', backgroundColor: '#E0E0E8', fontSize: '16px', boxSizing: 'border-box' }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label style={{ color: '#333', fontSize: '16px', marginBottom: '5px', display: 'block' }}>Дата ввода (YYYY-MM-DD):</label>
            <input
              type="date"
              name="commissioned_date"
              value={formData.commissioned_date}
              onChange={handleChange}
              style={{ width: '100%', padding: '10px', border: 'none', borderRadius: '10px', backgroundColor: '#E0E0E8', fontSize: '16px', boxSizing: 'border-box' }}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            style={{
              backgroundColor: '#3C388D',
              color: '#FFF',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '10px',
              cursor: 'pointer',
              transition: 'background-color 0.3s',
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = '#2A2E6D')}
            onMouseLeave={(e) => (e.target.style.backgroundColor = '#3C388D')}
          >
            {isEditing ? 'Сохранить изменения' : 'Добавить имущество'}
          </button>
          {isEditing && (
            <button
              type="button"
              onClick={handleCancel}
              disabled={loading}
              style={{
                backgroundColor: '#E0E0E8',
                color: '#333',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '10px',
                cursor: 'pointer',
                marginLeft: '10px',
                transition: 'background-color 0.3s',
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = '#C0C0D8')}
              onMouseLeave={(e) => (e.target.style.backgroundColor = '#E0E0E8')}
            >
              Отмена
            </button>
          )}
          {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
        </form>
      </div>

      <div style={{ width: '50%', display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div
          style={{
            backgroundColor: '#FFF',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            width: '100%',
            maxHeight: '500px', // Увеличен maxHeight для горизонтального расположения
            overflowY: 'auto',
          }}
        >
          <h3 style={{ color: '#3C388D', fontSize: '20px', marginBottom: '10px' }}>Список имущества</h3>
          {assets.length > 0 ? (
            <ul style={{ listStyle: 'none', padding: '0' }}>
              {assets.map((asset) => (
                <li
                  key={asset.id}
                  style={{
                    padding: '10px',
                    borderBottom: '1px solid #E0E0E8',
                    marginBottom: '5px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <span>
                    {asset.name} (Категория: {asset.category}, Статус: {asset.status}, Комната: {asset.room_id})
                  </span>
                  <div>
                    <button
                      onClick={() => handleEdit(asset)}
                      style={{
                        backgroundColor: '#3C388D',
                        color: '#FFF',
                        border: 'none',
                        padding: '5px 10px',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        marginRight: '10px',
                        transition: 'background-color 0.3s',
                      }}
                      onMouseEnter={(e) => (e.target.style.backgroundColor = '#2A2E6D')}
                      onMouseLeave={(e) => (e.target.style.backgroundColor = '#3C388D')}
                    >
                      Редактировать
                    </button>
                    <button
                      onClick={() => handleDelete(asset.id)}
                      style={{
                        backgroundColor: '#E0E0E8',
                        color: '#333',
                        border: 'none',
                        padding: '5px 10px',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s',
                      }}
                      onMouseEnter={(e) => (e.target.style.backgroundColor = '#C0C0D8')}
                      onMouseLeave={(e) => (e.target.style.backgroundColor = '#E0E0E8')}
                    >
                      Удалить
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p style={{ color: '#333', textAlign: 'center' }}>Имущества нет.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AssetsPage;