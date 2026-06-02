import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function RegisterPage() {
  const { register } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [errors, setErrors] = useState([])

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setErrors([])
    try {
      await register(form.name, form.email, form.password)
      navigate('/')
    } catch (err) {
      const data = err.response?.data
      // Joi renvoie { errors: [...] }, AppError renvoie { error: '...' }
      if (data?.errors) {
        setErrors(data.errors)
      } else {
        setErrors([data?.error || "Erreur lors de l'inscription"])
      }
    }
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Inscription</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
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
        <div style={styles.field}>
          <label style={styles.label}>Mot de passe</label>
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        {errors.map((msg, i) => (
          <p key={i} style={styles.error}>{msg}</p>
        ))}
        <button type="submit" style={styles.button}>Créer mon compte</button>
      </form>
      <p style={styles.footer}>
        Déjà un compte ? <Link to="/login">Se connecter</Link>
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
  title:  { margin: '0 0 24px', fontSize: 24, fontWeight: 700, color: '#111827' },
  form:   { display: 'flex', flexDirection: 'column', gap: 16 },
  field:  { display: 'flex', flexDirection: 'column', gap: 6 },
  label:  { fontSize: 14, fontWeight: 600, color: '#374151' },
  input:  { padding: '10px 12px', fontSize: 15, borderRadius: 8, border: '1.5px solid #d1d5db', color: '#111827' },
  button: { padding: '12px 0', fontSize: 15, fontWeight: 600, background: '#ea580c', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer' },
  error:  { fontSize: 13, color: '#dc2626', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 6, padding: '8px 12px', margin: 0 },
  footer: { marginTop: 20, textAlign: 'center', fontSize: 14, color: '#6b7280' },
}
