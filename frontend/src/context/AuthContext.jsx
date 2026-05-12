import { createContext, useContext, useState } from "react";
import api, { setAccessToken } from "../api/api";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext(null)

export function AuthProvider({children}){
  const [user, setUser]=useState(null)

  async function login(email, password){
    const { data } = await api.post('/auth/login', { email, password }, { withCredentials : true })
    setAccessToken(data.accessToken)
    const decoded = jwtDecode(data.accessToken)
    const user = {
      id: decoded.id,
      email: decoded.name,
    };
    console.log(user)
    setUser(user)
  }

  async function register(name, email, password){
    const { data } = await api.post('/auth/register', {name, email, password}, )
  }

  async function logout() {
    await api.post('/auth/logout', null, { withCredentials : true })
    setAccessToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{user, login, register, logout}}>
      {children}
    </AuthContext.Provider>
  )

}

  export function useAuth(){
    return useContext(AuthContext)
  }

