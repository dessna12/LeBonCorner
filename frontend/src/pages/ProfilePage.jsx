import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../api/api'

export default function ProfilePage() {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const [profile, setProfile] = useState(null)
  const [form, setForm]       = useState({ name: '', email: '' })
  const [errors, setErrors]   = useState([])
  const [success, setSuccess] = useState(null)

  useEffect(() => {
    api.get('/profile', { withCredentials: true })
      .then(({ data }) => {
        setProfile(data.user)
        setForm({ name: data.user.name, email: data.user.email })
      })
      .catch(() => navigate('/'))
  }, [])

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
    setSuccess(null)
  }

  async function handleUpdate(e) {
    e.preventDefault()
    setErrors([])
    setSuccess(null)
    try {
      const { data } = await api.put('/profil', form, { withCredentials: true })
      setProfile(data.user)
      setForm({ name: data.user.name, email: data.user.email })
      setSuccess('Profil mis à jour avec succès.')
    } catch (err) {
      const data = err.response?.data
      if (data?.errors) setErrors(data.errors)
      else setErrors([data?.error || 'Erreur lors de la mise à jour'])
    }
  }

  async function handleDelete() {
    if (!window.confirm('Supprimer définitivement votre compte ? Cette action est irréversible.')) return
    try {
      await api.delete('/profil', { withCredentials: true })
      await logout()
      navigate('/login')
    } catch {
      setErrors(['Erreur lors de la suppression du compte'])
    }
  }

  async function handleLogout() {
    await logout()
    navigate('/login')
  }

  if (!profile) return null

  return (
    <div>
      <nav style={styles.navbar}>
        <div style={styles.navInner}>
          <div style={styles.brand}>
            <img src="/logo.png" alt="LeBonCorner" style={styles.logo} />
            <span style={styles.brandName}>LeBonCorner</span>
          </div>
          <div style={styles.navRight}>
            <Link to="/" style={styles.navLink}>← Retour aux annonces</Link>
            <button onClick={handleLogout} style={styles.logoutBtn}>Se déconnecter</button>
          </div>
        </div>
      </nav>

      <main style={styles.main}>
        <div style={styles.container}>

          <div style={styles.card}>
            <h2 style={styles.title}>Mon profil</h2>
            <form onSubmit={handleUpdate} style={styles.form}>
              <div style={styles.field}>
                <label style={styles.label}>Nom</label>
                <input
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  required
                  style={styles.input}
                />
              </div>
              <div style={styles.field}>
                <label style={styles.label}>Email</label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  style={styles.input}
                />
              </div>
              {errors.map((msg, i) => <p key={i} style={styles.error}>{msg}</p>)}
              {success && <p style={styles.success}>{success}</p>}
              <button type="submit" style={styles.button}>Enregistrer les modifications</button>
            </form>
          </div>

          <div style={styles.dangerCard}>
            <h3 style={styles.dangerTitle}>Zone de danger</h3>
            <p style={styles.dangerText}>La suppression de votre compte est définitive et irréversible.</p>
            <button onClick={handleDelete} style={styles.deleteBtn}>Supprimer mon compte</button>
          </div>

        </div>
      </main>
    </div>
  )
}

const styles = {
  navbar:      { background: '#fff', borderBottom: '2px solid #fed7aa', padding: '0 24px' },
  navInner:    { maxWidth: 900, margin: '0 auto', height: 64, display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  brand:       { display: 'flex', alignItems: 'center', gap: 10 },
  logo:        { height: 40, width: 'auto' },
  brandName:   { fontSize: 22, fontWeight: 700, color: '#ea580c' },
  navRight:    { display: 'flex', alignItems: 'center', gap: 16 },
  navLink:     { fontSize: 14, color: '#ea580c', textDecoration: 'none', fontWeight: 500 },
  logoutBtn:   { padding: '8px 16px', fontSize: 14, fontWeight: 600, background: '#ea580c', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer' },

  main:        { padding: '32px 16px' },
  container:   { maxWidth: 500, margin: '0 auto' },

  card:        { background: '#fff', borderRadius: 12, padding: 32, boxShadow: '0 4px 24px rgba(0,0,0,0.08)', marginBottom: 24 },
  title:       { margin: '0 0 24px', fontSize: 22, fontWeight: 700, color: '#111827' },
  form:        { display: 'flex', flexDirection: 'column', gap: 16 },
  field:       { display: 'flex', flexDirection: 'column', gap: 6 },
  label:       { fontSize: 14, fontWeight: 600, color: '#374151' },
  input:       { padding: '10px 12px', fontSize: 15, borderRadius: 8, border: '1.5px solid #d1d5db', color: '#111827' },
  button:      { padding: '12px 0', fontSize: 15, fontWeight: 600, background: '#ea580c', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer' },
  error:       { fontSize: 13, color: '#dc2626', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 6, padding: '8px 12px', margin: 0 },
  success:     { fontSize: 13, color: '#16a34a', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 6, padding: '8px 12px', margin: 0 },

  dangerCard:  { background: '#fff', borderRadius: 12, padding: 32, boxShadow: '0 4px 24px rgba(0,0,0,0.08)', border: '1px solid #fecaca' },
  dangerTitle: { margin: '0 0 8px', fontSize: 16, fontWeight: 700, color: '#dc2626' },
  dangerText:  { margin: '0 0 16px', fontSize: 14, color: '#6b7280' },
  deleteBtn:   { padding: '10px 20px', fontSize: 14, fontWeight: 600, background: '#dc2626', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer' },
}
