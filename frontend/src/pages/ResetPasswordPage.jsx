import { useState } from 'react'
import { useSearchParams, useNavigate, Link } from 'react-router-dom'
import api from '../api/api'

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')
  const navigate = useNavigate()

  const [password, setPassword] = useState('')
  const [error, setError]       = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    try {
      await api.post('/auth/reset-password', { token, password })
      navigate('/login')
    } catch (err) {
      const data = err.response?.data
      setError(data?.errors?.[0] || data?.error || 'Une erreur est survenue')
    }
  }

  if (!token) {
    return (
      <div style={styles.container}>
        <p style={styles.error}>Lien invalide ou expiré.</p>
        <p style={styles.footer}><Link to="/login">Retour à la connexion</Link></p>
      </div>
    )
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Nouveau mot de passe</h1>
      <p style={styles.subtitle}>Choisissez un nouveau mot de passe d'au moins 8 caractères.</p>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.field}>
          <label style={styles.label}>Nouveau mot de passe</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        {error && <p style={styles.error}>{error}</p>}
        <button type="submit" style={styles.button}>Réinitialiser le mot de passe</button>
      </form>
      <p style={styles.footer}>
        <Link to="/login">Retour à la connexion</Link>
      </p>
    </div>
  )
}

const styles = {
  container: {
    maxWidth: 420,
    margin: '80px auto',
    padding: 32,
    background: '#fff',
    borderRadius: 12,
    boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
    fontFamily: 'sans-serif',
  },
  title:    { margin: '0 0 8px', fontSize: 24, fontWeight: 700, color: '#111827' },
  subtitle: { margin: '0 0 24px', fontSize: 14, color: '#6b7280' },
  form:     { display: 'flex', flexDirection: 'column', gap: 16 },
  field:    { display: 'flex', flexDirection: 'column', gap: 6 },
  label:    { fontSize: 14, fontWeight: 600, color: '#374151' },
  input:    { padding: '10px 12px', fontSize: 15, borderRadius: 8, border: '1.5px solid #d1d5db', color: '#111827' },
  button:   { padding: '12px 0', fontSize: 15, fontWeight: 600, background: '#ea580c', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer' },
  error:    { fontSize: 13, color: '#dc2626', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 6, padding: '8px 12px', margin: 0 },
  footer:   { marginTop: 20, textAlign: 'center', fontSize: 14, color: '#6b7280' },
}
