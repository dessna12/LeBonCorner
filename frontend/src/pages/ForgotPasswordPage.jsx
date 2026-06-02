import { useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/api'

export default function ForgotPasswordPage() {
  const [email, setEmail]     = useState('')
  const [error, setError]     = useState(null)
  const [success, setSuccess] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    try {
      await api.post('/auth/forgot-password', { email })
      setSuccess(true)
    } catch (err) {
      const data = err.response?.data
      setError(data?.errors?.[0] || data?.error || 'Une erreur est survenue')
    }
  }

  if (success) {
    return (
      <div style={styles.container}>
        <p style={styles.success}>
          Si cet email existe dans notre base, un lien de réinitialisation vient d'être envoyé. Vérifiez votre boîte mail.
        </p>
        <p style={styles.footer}>
          <Link to="/login">Retour à la connexion</Link>
        </p>
      </div>
    )
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Mot de passe oublié</h1>
      <p style={styles.subtitle}>
        Entrez votre email, nous vous enverrons un lien pour réinitialiser votre mot de passe.
      </p>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.field}>
          <label style={styles.label}>Email</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        {error && <p style={styles.error}>{error}</p>}
        <button type="submit" style={styles.button}>Envoyer le lien</button>
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
  success:  { fontSize: 14, color: '#16a34a', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 8, padding: '12px 16px', margin: '0 0 16px' },
  footer:   { marginTop: 20, textAlign: 'center', fontSize: 14, color: '#6b7280' },
}
