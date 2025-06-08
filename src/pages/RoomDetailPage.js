import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getRooms, getAssetsByRoom } from '../services/api'; // Исправлены импорты

function RoomDetailPage() {
  const { roomId } = useParams();
  const [room, setRoom] = useState(null);
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRoomAndAssets = async () => {
      setLoading(true);
      try {
        // Предполагаем, что getRooms возвращает массив, ищем комнату по ID
        const rooms = await getRooms(); // Или используйте отдельный эндпоинт getRoom, если он есть
        const foundRoom = rooms.find(r => r.id === parseInt(roomId));
        if (!foundRoom) throw new Error('Комната не найдена');
        setRoom(foundRoom);

        const assetsData = await getAssetsByRoom(roomId);
        setAssets(assetsData);
      } catch (err) {
        setError('Не удалось загрузить данные комнаты');
      } finally {
        setLoading(false);
      }
    };
    fetchRoomAndAssets();
  }, [roomId]);

  if (loading) return <div className="content"><p>Загрузка...</p></div>;
  if (error) return <div className="content"><p style={{ color: 'red' }}>{error}</p></div>;
  if (!room) return <div className="content"><p>Комната не найдена</p></div>;

  return (
    <div className="content">
      <h2>Детали помещения: {room.name}</h2>
      <p>Этаж: {room.floor_id}</p> {/* Предполагаем, что floor_id доступен */}
      <h3>Имущество:</h3>
      {assets.length > 0 ? (
        <ul>
          {assets.map((asset) => (
            <li key={asset.id}>
              {asset.name} (Категория: {asset.category}, Статус: {asset.status})
            </li>
          ))}
        </ul>
      ) : (
        <p>Имущества нет.</p>
      )}
    </div>
  );
}

export default RoomDetailPage;