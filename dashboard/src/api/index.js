const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://safedrive-backend-4h5k.onrender.com';


async function fetchWithTimeout(url, options = {}, timeout = 5000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  const response = await fetch(url, { ...options, signal: controller.signal });
  clearTimeout(id);
  return response;
}

async function get(endpoint) {
  try {
    const res = await fetchWithTimeout(`${API_BASE_URL}${endpoint}`);
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    return res.json();
  } catch (err) {
    console.error(`API Error (${endpoint}):`, err);
    throw err;
  }
}

const api = {
  getLatestSensorData: () => get('/api/sensor'),
  getHealth: () => get('/api/health'),
  getStats: () => get('/api/stats'),
  getAccidents: () => get('/api/accidents'),
  getCarPosition: () => get('/api/sensor'),
  getSensorHistory: () => get('/api/sensor/history'),
  postSensorData: (data) => get('/api/sensor', { method: 'POST', body: JSON.stringify(data) })
};

export default api;
