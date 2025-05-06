const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://safedrive-backend-4h5k.onrender.com';

async function fetchWithTimeout(url, options = {}, timeout = 5000, signal) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  // Clean up both timeout and signal listener
  const cleanup = () => {
    clearTimeout(timeoutId);
    if (signal) {
      signal.removeEventListener('abort', abortHandler);
    }
  };

  // Unified abort handler
  const abortHandler = () => {
    cleanup();
    controller.abort();
  };

  if (signal) {
    signal.addEventListener('abort', abortHandler);
    if (signal.aborted) {
      cleanup();
      throw new DOMException('Aborted', 'AbortError');
    }
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

    if (!response.ok) {
      const error = await parseErrorResponse(response);
      throw error;
    }

    return response;
  } catch (err) {
    cleanup();
    throw err;
  }
}

async function parseErrorResponse(response) {
  try {
    const errorData = await response.json();
    return new Error(
      errorData.message || 
      `Request failed with status ${response.status}`
    );
  } catch {
    return new Error(`Request failed with status ${response.status}`);
  }
}

async function handleApiCall(endpoint, method = 'GET', data = null, signal) {
  try {
    const response = await fetchWithTimeout(
      `${API_BASE_URL}${endpoint}`,
      {
        method,
        body: data ? JSON.stringify(data) : undefined,
      },
      5000,
      signal
    );

    return await response.json();
  } catch (err) {
    console.error(`API Error (${endpoint}):`, err);
    throw err;
  }
}

const api = {
  getLatestSensorData: (signal) => handleApiCall('/api/sensor', 'GET', null, signal),
  getHealth: (signal) => handleApiCall('/api/health', 'GET', null, signal),
  getStats: (signal) => handleApiCall('/api/stats', 'GET', null, signal),
  getAccidents: (signal) => handleApiCall('/api/accidents', 'GET', null, signal),
  getCarPosition: (signal) => handleApiCall('/api/sensor', 'GET', null, signal),
  getSensorHistory: (signal) => handleApiCall('/api/sensor/history', 'GET', null, signal),
  postSensorData: (data, signal) => handleApiCall('/api/sensor', 'POST', data, signal)
};

export default api;