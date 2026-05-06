import axios from 'axios'

// Use environment variable for production, fallback to localhost for development
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8080'

const api = axios.create({
  baseURL: API_BASE,
})

// Attach JWT token to every request automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('trace360_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const loginUser = async (username, password) => {
  const response = await api.post('/auth/login', { username, password })
  return response.data // { token, username, role, message }
}

export const registerUser = async (username, password, email, role) => {
  const response = await api.post('/auth/register', { username, password, email, role })
  return response.data // { token, username, role, message }
}

export default api