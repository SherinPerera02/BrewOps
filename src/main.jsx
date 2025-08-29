import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import axios from 'axios';

// Configure global axios interceptor to handle 429 (Too Many Requests)
// This prevents immediate retry storms by honoring Retry-After and applying
// exponential backoff with a small retry limit.
const MAX_RETRY = 3;

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config, response } = error || {};
    if (!config || !response) return Promise.reject(error);

    // Only handle 429
    if (response.status === 429) {
      config._retryCount = config._retryCount || 0;
      if (config._retryCount >= MAX_RETRY) {
        return Promise.reject(error);
      }

      // Prefer Retry-After header if provided (in seconds)
      let retryAfter = 0;
      const ra = response.headers && response.headers['retry-after'];
      if (ra) {
        const parsed = parseInt(ra, 10);
        if (!isNaN(parsed)) retryAfter = parsed * 1000;
      }

      // Exponential backoff base: 500ms
      const backoff = 500 * Math.pow(2, config._retryCount);
      const delay = Math.max(retryAfter, backoff);
      config._retryCount += 1;

      await wait(delay);
      return axios(config);
    }

    return Promise.reject(error);
  }
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
