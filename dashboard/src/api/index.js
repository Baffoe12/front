const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://safedrive-backend-4h5k.onrender.com';


async function fetchWithTimeout(url, options = {}, timeout = 5000, signal) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  // If an external signal is provided, listen for its abort event to abort this controller
  if (signal) {
    signal.addEventListener('abort', () => {
      controller.abort();
    });
  }

  const response = await fetch(url, { ...options, signal: controller.signal });
  clearTimeout(id);
  return response;
}

async function get(endpoint, signal) {
  try {
    const res = await fetchWithTimeout(`${API_BASE_URL}${endpoint}`, {}, 5000, signal);
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    return res.json();
  } catch (err) {
    console.error(`API Error (${endpoint}):`, err);
    throw err;
  }
}

const api = {
  getLatestSensorData: (signal) => get('/api/sensor', signal),
  getHealth: (signal) => get('/api/health', signal),
  getStats: (signal) => get('/api/stats', signal),
  getAccidents: (signal) => get('/api/accidents', signal),
  getCarPosition: (signal) => get('/api/sensor', signal),
  getSensorHistory: (signal) => get('/api/sensor/history', signal),
  postSensorData: (data, signal) => get('/api/sensor', { method: 'POST', body: JSON.stringify(data) }, signal)
};

export default api;
