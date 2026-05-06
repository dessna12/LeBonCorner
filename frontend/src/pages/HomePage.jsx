import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function HomePage() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  async function handleLogout() {
    await logout()
    navigate('/login')
  }

  return (
    <div style={styles.container}>
      <h1>Bienvenue sur LeBonCorner</h1>
      <p>
        Connecté en tant que : <strong>{user?.name}</strong> ({user?.email})
      </p>
      <button onClick={handleLogout} style={styles.button}>
        Se déconnecter
      </button>
    </div>
  )
}

const styles = {
  container: { maxWidth: 600, margin: '80px auto', fontFamily: 'sans-serif', padding: '0 16px' },
  button: { padding: '10px 20px', fontSize: 16, background: '#dc2626', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer' },
}
