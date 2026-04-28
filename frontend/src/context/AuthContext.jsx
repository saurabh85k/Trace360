import { createContext, useContext, useState, useCallback } from 'react'

const AuthContext = createContext(null)

// Decode JWT payload without a library (JWT = header.payload.signature in base64)
const decodeToken = (token) => {
  try {
    const payload = token.split('.')[1]
    return JSON.parse(atob(payload))
  } catch {
    return null
  }
}

export function AuthProvider({ children }) {
  // On app load, check localStorage for an existing token
  const [auth, setAuth] = useState(() => {
    const token = localStorage.getItem('trace360_token')
    if (!token) return null
    const decoded = decodeToken(token)
    // If token is expired, clear it
    if (!decoded || decoded.exp * 1000 < Date.now()) {
      localStorage.removeItem('trace360_token')
      return null
    }
    return {
      token,
      username: decoded.sub,
      role: decoded.role,
    }
  })

  const login = useCallback((data) => {
    // data = { token, username, role } from backend
    localStorage.setItem('trace360_token', data.token)
    setAuth({
      token: data.token,
      username: data.username,
      role: data.role,
    })
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('trace360_token')
    setAuth(null)
  }, [])

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook for easy access
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext)