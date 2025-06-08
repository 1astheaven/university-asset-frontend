import { useState, useEffect } from 'react';
import { getBuildings, getFloors, getRooms, getAssetsByRoom } from '../services/api';

function RoomsPage() {
  const [buildings, setBuildings] = useState([]);
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [floors, setFloors] = useState([]);
  const [selectedFloor, setSelectedFloor] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBuildings = async () => {
      setLoading(true);
      try {
        const data = await getBuildings();
        setBuildings(data);
      } catch (err) {
        setError('Не удалось загрузить здания');
      } finally {
        setLoading(false);
      }
    };
    fetchBuildings();
  }, []);

  useEffect(() => {
    if (selectedBuilding) {
      const fetchFloors = async () => {
        setLoading(true);
        try {
          const data = await getFloors(selectedBuilding.id);
          setFloors(data);
          setSelectedFloor(null);
          setRooms([]);
          setAssets([]);
        } catch (err) {
          setError('Не удалось загрузить этажи');
        } finally {
          setLoading(false);
        }
      };
      fetchFloors();
    }
  }, [selectedBuilding]);

  useEffect(() => {
    if (selectedFloor) {
      const fetchRooms = async () => {
        setLoading(true);
        try {
          const data = await getRooms(selectedFloor.id);
          setRooms(data);
          setSelectedRoom(null);
          setAssets([]);
        } catch (err) {
          setError('Не удалось загрузить комнаты');
        } finally {
          setLoading(false);
        }
      };
      fetchRooms();
    }
  }, [selectedFloor]);

  useEffect(() => {
    if (selectedRoom) {
      const fetchAssets = async () => {
        setLoading(true);
        try {
          const data = await getAssetsByRoom(selectedRoom.id);
          setAssets(data);
        } catch (err) {
          setError('Не удалось загрузить имущество');
        } finally {
          setLoading(false);
        }
      };
      fetchAssets();
    }
  }, [selectedRoom]);

  if (loading) return <div className="content"><p style={{ color: '#333' }}>Загрузка...</p></div>;
  if (error) return <div className="content"><p style={{ color: 'red' }}>{error}</p></div>;

  return (
    <div
      className="content"
      style={{
        backgroundColor: '#F5F5F5',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        height: 'calc(80vh - 100px)', // Учитываем высоту хедера
        display: 'flex',
        flexDirection: 'row', // Горизонтальное расположение
        alignItems: 'flex-start', // Выравнивание по верхнему краю
        justifyContent: 'space-between', // Распределение пространства
      }}
    >
      <div style={{ width: '40%', display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label style={{ color: '#333', fontSize: '16px', marginBottom: '5px' }}>Выберите корпус:</label>
          <select
            value={selectedBuilding ? selectedBuilding.id : ''}
            onChange={(e) => {
              const building = buildings.find((b) => b.id === parseInt(e.target.value));
              setSelectedBuilding(building);
            }}
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
            <option value="">-- Выберите корпус --</option>
            {buildings.map((building) => (
              <option key={building.id} value={building.id}>
                {building.name}
              </option>
            ))}
          </select>
        </div>

        {selectedBuilding && (
          <div>
            <label style={{ color: '#333', fontSize: '16px', marginBottom: '5px' }}>Выберите этаж:</label>
            <select
              value={selectedFloor ? selectedFloor.id : ''}
              onChange={(e) => {
                const floor = floors.find((f) => f.id === parseInt(e.target.value));
                setSelectedFloor(floor);
              }}
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
              <option value="">-- Выберите этаж --</option>
              {floors.map((floor) => (
                <option key={floor.id} value={floor.id}>
                  {floor.number}
                </option>
              ))}
            </select>
          </div>
        )}

        {selectedFloor && (
          <div>
            <label style={{ color: '#333', fontSize: '16px', marginBottom: '5px' }}>Выберите помещение:</label>
            <select
              value={selectedRoom ? selectedRoom.id : ''}
              onChange={(e) => {
                const room = rooms.find((r) => r.id === parseInt(e.target.value));
                setSelectedRoom(room);
              }}
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
              <option value="">-- Выберите помещение --</option>
              {rooms.map((room) => (
                <option key={room.id} value={room.id}>
                  {room.name}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {selectedRoom && (
        <div
          style={{
            width: '55%', // Увеличенная ширина списка
            backgroundColor: '#FFF',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            maxHeight: '400px', // Увеличен maxHeight для большего списка
            overflowY: 'auto', // Внутренняя прокрутка при необходимости
          }}
        >
          <h3 style={{ color: '#3C388D', fontSize: '20px', marginBottom: '10px' }}>
            Имущество в помещении: {selectedRoom.name}
          </h3>
          {assets.length > 0 ? (
            <ul style={{ listStyle: 'none', padding: '0' }}>
              {assets.map((asset) => (
                <li
                  key={asset.id}
                  style={{
                    padding: '10px',
                    borderBottom: '1px solid #E0E0E8',
                    marginBottom: '5px',
                  }}
                >
                  {asset.name} (Категория: {asset.category}, Статус: {asset.status})
                </li>
              ))}
            </ul>
          ) : (
            <p style={{ color: '#333', textAlign: 'center' }}>Имущества нет.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default RoomsPage;