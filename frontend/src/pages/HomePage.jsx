import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import AnnonceList from '../components/AnnonceList'
import { useAnnonces } from '../hooks/useAnnonces'
import SearchFilterBar from '../components/SearchFilterBar'

export default function HomePage() {
  const { user, logout } = useAuth()
  const { annonces, categories, isLoading, error, search, setSearch, minPrice, setMinPrice, maxPrice, setMaxPrice, categoryId, setCategoryId } = useAnnonces()
  const navigate = useNavigate()

  async function handleLogout() {
    await logout()
    navigate('/login')
  }

  return (
    <div style={styles.container}>
      <div style={styles.topBar}>
        <h1 style={styles.heading}>LeBonCorner</h1>
        <div style={styles.userInfo}>
          <span style={styles.userName}>{user?.name}</span>
          <button onClick={handleLogout} style={styles.logoutBtn}>Se déconnecter</button>
        </div>
      </div>

      <h2 style={styles.subheading}>
        Les annonces
      </h2>

      <SearchFilterBar categories={categories} search={search} setSearch={setSearch} minPrice={minPrice} setMinPrice={setMinPrice} maxPrice={setMaxPrice} setMaxPrice={setMaxPrice} categoryId={categoryId} setCategoryId={setCategoryId} />

      {isLoading && <p style={styles.info}>Chargement des annonces...</p>}
      {error && <p style={styles.error}>Erreur : {error}</p>}
      {!isLoading && !error && <AnnonceList annonces={annonces} />}
    </div>
  )
}

const styles = {
  container: { maxWidth: 800, margin: '40px auto', padding: '0 16px', fontFamily: 'sans-serif' },
  topBar: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  heading: { margin: 0, fontSize: 28 },
  userInfo: { display: 'flex', alignItems: 'center', gap: 12 },
  userName: { color: '#6b7280', fontSize: 14 },
  logoutBtn: { padding: '8px 16px', fontSize: 14, background: '#dc2626', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer' },
  subheading: { fontSize: 20, marginBottom: 16 },
  counter: { color: '#6b7280', fontWeight: 'normal' },
  info: { color: '#6b7280', textAlign: 'center', padding: '40px 0' },
  error: { color: '#dc2626', textAlign: 'center', padding: '20px 0' },
}
