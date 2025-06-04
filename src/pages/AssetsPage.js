import { useState } from 'react';
import { createAsset } from '../services/api';

function AssetsPage() {
  const [asset, setAsset] = useState({
    name: '',
    category: '',
    status: '',
    room_id: 1,
    responsible_user_id: 1,
    inventory_number: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await createAsset(asset);
      alert('Имущество создано: ' + data.id);
    } catch (err) {
      console.error('Ошибка при создании имущества:', err);
    }
  };

  return (
    <div className="content">
      <h2>Создать имущество</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Название"
          value={asset.name}
          onChange={(e) => setAsset({ ...asset, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Категория"
          value={asset.category}
          onChange={(e) => setAsset({ ...asset, category: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Статус"
          value={asset.status}
          onChange={(e) => setAsset({ ...asset, status: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Инвентарный номер"
          value={asset.inventory_number}
          onChange={(e) => setAsset({ ...asset, inventory_number: e.target.value })}
          required
        />
        <button type="submit">Создать</button>
      </form>
    </div>
  );
}

export default AssetsPage;