import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(() => {
  const storedUser  = localStorage.getItem('user')
  const storedToken = localStorage.getItem('token')

  if (storedUser && storedToken) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`
    return JSON.parse(storedUser)
  }

    return null
  })


  const login = (userData) => {
    localStorage.setItem('user',  JSON.stringify(userData.user))
    localStorage.setItem('token', userData.token)
    axios.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`
    setUser(userData.user)
  }

  const logout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    delete axios.defaults.headers.common['Authorization']
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)