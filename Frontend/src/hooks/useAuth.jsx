import { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(() => {
  const storedUser  = localStorage.getItem('user')
  const storedToken = localStorage.getItem('token')

  if (storedUser && storedToken) {
    return JSON.parse(storedUser)
  }
    return null
  })


  const login = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData.user))
    localStorage.setItem('token', userData.token)
    setUser(userData.user)
  }

  const logout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)