import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// Helper to check mock mode from localStorage or env variable
export const isMockMode = (): boolean => {
  const stored = localStorage.getItem('gitinsight_mock_mode');
  if (stored !== null) return stored === 'true';
  return import.meta.env.VITE_MOCK_MODE === 'true';
};

export const setMockMode = (enabled: boolean): void => {
  localStorage.setItem('gitinsight_mock_mode', String(enabled));
  window.dispatchEvent(new Event('storage'));
};

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('gitinsight_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Standard error formatting
    const message = error.response?.data?.message || error.message || 'An unexpected API error occurred.';
    return Promise.reject(new Error(message));
  }
);
