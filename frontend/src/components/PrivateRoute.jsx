import { useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'

//Protéger une route et vérifier qu'une personne soit connectée

export default function PrivateRoute({children}){
  const { user } = useAuth()

  if(!user) {
    return <Navigate to="/login" replace />
  }
  return children
}

