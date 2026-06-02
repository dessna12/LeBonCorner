import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useAnnonces } from '../hooks/useAnnonces'
import SearchFilterBar from '../components/SearchFilterBar'
import AnnonceList from '../components/AnnonceList'

export default function HomePage() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const { annonces, total, categories, isLoading, error, ...filterProps } = useAnnonces()

  async function handleLogout() {
    await logout()
    navigate('/login')
  }

  return (
    <div>
      <nav style={styles.navbar}>
        <div style={styles.navInner}>
          <div style={styles.brand}>
            <img src="/logo.png" alt="LeBonCorner" style={styles.logo} />
            <span style={styles.brandName}>LeBonCorner</span>
          </div>
          <div style={styles.userInfo}>
            <Link to="/profil" style={styles.profilLink}>Mon profil</Link>
            <button onClick={handleLogout} style={styles.logoutBtn}>Se déconnecter</button>
          </div>
        </div>
      </nav>

      <main style={styles.main}>
        <div style={styles.container}>
          <h2 style={styles.subheading}>
            Les annonces {!isLoading && <span style={styles.counter}>({total})</span>}
          </h2>

          <SearchFilterBar categories={categories} {...filterProps} />

          {isLoading && <p style={styles.info}>Chargement des annonces...</p>}
          {error && <p style={styles.error}>Erreur : {error}</p>}
          {!isLoading && !error && <AnnonceList annonces={annonces} />}
        </div>
      </main>
    </div>
  )
}

const styles = {
  navbar:    { background: '#fff', borderBottom: '2px solid #fed7aa', padding: '0 24px' },
  navInner:  { maxWidth: 900, margin: '0 auto', height: 64, display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  brand:     { display: 'flex', alignItems: 'center', gap: 10 },
  logo:      { height: 40, width: 'auto' },
  brandName: { fontSize: 22, fontWeight: 700, color: '#ea580c' },
  userInfo:   { display: 'flex', alignItems: 'center', gap: 16 },
  profilLink: { fontSize: 14, color: '#ea580c', textDecoration: 'none', fontWeight: 500 },
  logoutBtn:  { padding: '8px 16px', fontSize: 14, fontWeight: 600, background: '#ea580c', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer' },
  main:      { padding: '32px 16px' },
  container: { maxWidth: 900, margin: '0 auto' },
  subheading: { fontSize: 20, fontWeight: 700, color: '#111827', marginTop: 0, marginBottom: 16 },
  counter:   { color: '#9ca3af', fontWeight: 'normal', fontSize: 16 },
  info:      { color: '#6b7280', textAlign: 'center', padding: '60px 0' },
  error:     { color: '#dc2626', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 8, padding: '12px 16px', textAlign: 'center' },
}
