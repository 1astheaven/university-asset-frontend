import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getRoom, getRoomAssets } from '../services/api';

function RoomDetailPage() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);
  const [assets, setAssets] = useState([]);
  const categories = [...new Set(assets.map(asset => asset.category))];

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const roomData = await getRoom(roomId);
        const assetsData = await getRoomAssets(roomId);
        setRoom(roomData);
        setAssets(assetsData);
      } catch (err) {
        console.error('Ошибка при загрузке помещения:', err);
      }
    };
    fetchRoom();
  }, [roomId]);

  if (!room) return <div>Загрузка...</div>;

  return (
    <div className="content">
      <h2>Помещение: {room.name}</h2>
      <div style={{ marginBottom: '20px' }}>
        <h3>Схема помещения</h3>
        <div style={{ width: '300px', height: '200px', border: '1px solid #ccc', textAlign: 'center', lineHeight: '200px' }}>
          Условная схема помещения
        </div>
      </div>
      <h3>Список имущества</h3>
      {categories.map((category) => (
        <div key={category}>
          <h4>{category}</h4>
          <ul>
            {assets
              .filter((asset) => asset.category === category)
              .map((asset) => (
                <li
                  key={asset.id}
                  onClick={() => navigate(`/assets/${asset.id}`)}
                  style={{ cursor: 'pointer' }}
                >
                  {asset.name} (Инв. №: {asset.inventory_number})
                  {asset.photo && <img src={asset.photo} alt={asset.name} style={{ width: '50px', marginLeft: '10px' }} />}
                </li>
              ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default RoomDetailPage;