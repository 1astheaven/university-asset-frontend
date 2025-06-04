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
export const getRooms = async (floorId) => {
  const response = await API.get(`/rooms/${floorId}`);
  return response.data;
};

export const createAsset = async (assetData) => {
  const response = await API.post('/assets/', assetData);
  return response.data;
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
export const createUser = async (user) => {
  const response = await axios.post('http://localhost:8000/users/', user, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });
  return response.data;
};

export const updateUser = async (userId, user) => {
  const response = await axios.put(`http://localhost:8000/users/${userId}`, user, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });
  return response.data;
};

export const getUser = async (userId) => {
  const response = await axios.get(`http://localhost:8000/users/${userId}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });
  return response.data;
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
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });
  return response.data;
};

export const getFloors = async (buildingId) => {
  const response = await axios.get(`http://localhost:8000/buildings/${buildingId}/floors`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });
  return response.data;
};

export const getRoom = async (roomId) => {
  const response = await axios.get(`http://localhost:8000/rooms/${roomId}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });
  return response.data;
};

export const getRoomAssets = async (roomId) => {
  const response = await axios.get(`http://localhost:8000/rooms/${roomId}/assets`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });
  return response.data;
};

export default API;