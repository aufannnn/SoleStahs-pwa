import axios from 'axios'

// URL API diambil dari file .env (VITE_API_BASE_URL)
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'

const apiClient = axios.create({
  baseURL: `${BASE_URL}/api`,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
})

// Biar pesan error lebih jelas
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.error ||
      (error.code === 'ECONNABORTED' ? 'Request timeout' : error.message)
    return Promise.reject(new Error(message))
  }
)

export { apiClient, BASE_URL }