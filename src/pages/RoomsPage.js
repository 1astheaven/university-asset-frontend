import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBuildings, getFloors, getRooms } from '../services/api';

function RoomsPage() {
  const [buildings, setBuildings] = useState([]);
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [floors, setFloors] = useState([]);
  const [selectedFloor, setSelectedFloor] = useState(null);
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBuildings = async () => {
      try {
        const data = await getBuildings();
        setBuildings(data);
      } catch (err) {
        console.error('Ошибка при загрузке корпусов:', err);
      }
    };
    fetchBuildings();
  }, []);

  useEffect(() => {
    if (selectedBuilding) {
      const fetchFloors = async () => {
        try {
          const data = await getFloors(selectedBuilding.id);
          setFloors(data);
          setSelectedFloor(data[0]?.id || null);
        } catch (err) {
          console.error('Ошибка при загрузке этажей:', err);
        }
      };
      fetchFloors();
    }
  }, [selectedBuilding]);

  useEffect(() => {
    if (selectedFloor) {
      const fetchRooms = async () => {
        try {
          const data = await getRooms(selectedFloor);
          setRooms(data);
        } catch (err) {
          console.error('Ошибка при загрузке помещений:', err);
        }
      };
      fetchRooms();
    }
  }, [selectedFloor]);

  return (
    <div className="content">
      <h2>Выбор помещения</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '20px' }}>
        {buildings.map((building) => (
          <div
            key={building.id}
            onClick={() => setSelectedBuilding(building)}
            style={{
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              cursor: 'pointer',
              background: selectedBuilding?.id === building.id ? '#e0e0e0' : 'white'
            }}
          >
            <p>{building.name}</p>
            <p>{building.address}</p>
          </div>
        ))}
      </div>
      {selectedBuilding && (
        <>
          <select
            value={selectedFloor || ''}
            onChange={(e) => setSelectedFloor(parseInt(e.target.value))}
            style={{ marginBottom: '20px' }}
          >
            {floors.map((floor) => (
              <option key={floor.id} value={floor.id}>Этаж {floor.number}</option>
            ))}
          </select>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {rooms.map((room) => (
              <div
                key={room.id}
                onClick={() => navigate(`/rooms/${room.id}`)}
                style={{
                  width: '100px',
                  height: '100px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                {room.name}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default RoomsPage;