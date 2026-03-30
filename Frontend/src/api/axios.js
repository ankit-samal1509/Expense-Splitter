import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
})

// Request interceptor (attach token to every request)
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// Response interceptor (handle responses/errors)
api.interceptors.response.use(
  response => {
    return response
  },
  error => {
    // Token expired or invalid
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }

    return Promise.reject(error)
  }
)



export default api