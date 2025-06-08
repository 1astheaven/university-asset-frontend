import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8000', // Backend URL
});

// Добавляем токен в заголовки
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = async (email, password) => {
  try {
    const response = await axios.post(
      'http://localhost:8000/auth/token',
      new URLSearchParams({
        username: email,
        password: password,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
    return response.data;
  } catch (err) {
    console.error('Login API Error:', err.response ? err.response.data : err.message);
    throw err;
  }
};

export const getUsers = async () => {
  try {
    const response = await axios.get('http://localhost:8000/users/', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    return response.data;
  } catch (err) {
    console.error('API Error:', err.response ? err.response.status : err.message);
    throw err;
  }
};
export const createUser = async (userData) => {
  try {
    const response = await axios.post('http://localhost:8000/users/', userData, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token') || ''}` },
    });
    console.log('Ответ от создания пользователя:', response.data);
    return response.data;
  } catch (err) {
    console.error('Ошибка создания пользователя:', err.response ? err.response.data : err.message);
    throw err;
  }
};

export const updateUser = async (userId, userData) => {
  try {
    const response = await axios.put(`http://localhost:8000/users/${userId}`, userData, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token') || ''}` },
    });
    console.log(`Ответ от обновления пользователя ${userId}:`, response.data);
    return response.data;
  } catch (err) {
    console.error('Ошибка обновления пользователя:', err.response ? err.response.data : err.message);
    throw err;
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await axios.get('http://localhost:8000/users/me', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    return response.data;
  } catch (err) {
    console.error('API Error in getCurrentUser:', err.response ? err.response.status : err.message);
    throw err;
  }
};

export const getBuildings = async () => {
  const response = await axios.get('http://localhost:8000/buildings/', {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  });
  return response.data;
};

export const getFloors = async (buildingId) => {
  const response = await axios.get(`http://localhost:8000/floors/?building_id=${buildingId}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  });
  return response.data;
};

export const getRooms = async (floorId) => {
  const response = await axios.get(`http://localhost:8000/rooms/?floor_id=${floorId}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  });
  return response.data;
};

export const getAssetsByRoom = async (roomId) => {
  const response = await axios.get(`http://localhost:8000/assets/?room_id=${roomId}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  });
  return response.data;
};

export const getAssets = async (roomId = null) => {
  try {
    const url = roomId ? `http://localhost:8000/assets/?room_id=${roomId}` : 'http://localhost:8000/assets/';
    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token') || ''}` },
    });
    console.log(`Ответ от ${url}:`, response.data);
    return response.data;
  } catch (err) {
    console.error('Ошибка запроса активов:', err.response ? err.response.data : err.message);
    throw err;
  }
};

export const createAsset = async (assetData) => {
  const response = await API.post('/assets/', assetData);
  return response.data;
};

export const updateAsset = async (assetId, assetData) => {
  try {
    const response = await axios.put(`http://localhost:8000/assets/${assetId}`, assetData, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token') || ''}` },
    });
    console.log(`Ответ от обновления актива ${assetId}:`, response.data);
    return response.data;
  } catch (err) {
    console.error('Ошибка обновления актива:', err.response ? err.response.data : err.message);
    throw err;
  }
};

export const deleteAsset = async (assetId) => {
  try {
    const response = await axios.delete(`http://localhost:8000/assets/${assetId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token') || ''}` },
    });
    console.log(`Ответ от удаления актива ${assetId}:`, response.data);
    return response.data;
  } catch (err) {
    console.error('Ошибка удаления актива:', err.response ? err.response.data : err.message);
    throw err;
  }
};