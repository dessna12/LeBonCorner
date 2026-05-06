import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function RegisterPage() {
  const { register } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState(null)

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    try {
      await register(form.name, form.email, form.password)
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || "Erreur lors de l'inscription")
    }
  }

  return (
    <div style={styles.container}>
      <h1>Inscription</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label>Nom</label>
        <input
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <label>Email</label>
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <label>Mot de passe</label>
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          required
          style={styles.input}
        />
        {error && <p style={styles.error}>{error}</p>}
        <button type="submit" style={styles.button}>Créer mon compte</button>
      </form>
      <p>
        Déjà un compte ? <Link to="/login">Se connecter</Link>
      </p>
    </div>
  )
}

const styles = {
  container: { maxWidth: 400, margin: '80px auto', fontFamily: 'sans-serif', padding: '0 16px' },
  form: { display: 'flex', flexDirection: 'column', gap: 8 },
  input: { padding: 8, fontSize: 16, borderRadius: 4, border: '1px solid #ccc' },
  button: { padding: '10px 0', fontSize: 16, background: '#16a34a', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer' },
  error: { color: 'red', margin: 0 },
}
