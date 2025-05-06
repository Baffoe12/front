const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://safedrive-backend-4h5k.onrender.com';

async function fetchWithTimeout(url, options = {}, timeout = 5000, signal) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  // If an external signal is provided, listen for its abort event
  const abortHandler = () => controller.abort();
  if (signal) {
    signal.addEventListener('abort', abortHandler);
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      signal: controller.signal
    });
    return response;
  } finally {
    clearTimeout(timeoutId);
    if (signal) {
      signal.removeEventListener('abort', abortHandler);
    }
  }
}

async function handleResponse(endpoint, response) {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.message || `API request failed with status ${response.status}`
    );
  }
  return response.json();
}

async function get(endpoint, signal) {
  try {
    const response = await fetchWithTimeout(
      `${API_BASE_URL}${endpoint}`,
      {},
      5000,
      signal
    );
    return await handleResponse(endpoint, response);
  } catch (err) {
    console.error(`API Error (${endpoint}):`, err);
    throw err;
  }
}

async function post(endpoint, data, signal) {
  try {
    const response = await fetchWithTimeout(
      `${API_BASE_URL}${endpoint}`,
      {
        method: 'POST',
        body: JSON.stringify(data),
      },
      5000,
      signal
    );
    return await handleResponse(endpoint, response);
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
  postSensorData: (data, signal) => post('/api/sensor', data, signal)
};

export default api;