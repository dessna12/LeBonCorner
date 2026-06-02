export default function AnnonceCard({ annonce }) {
  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <h3 style={styles.title}>{annonce.title}</h3>
        {annonce.category_id && (
          <span style={styles.category}>Catégorie {annonce.category_id}</span>
        )}
      </div>
      {annonce.description && (
        <p style={styles.description}>{annonce.description}</p>
      )}
      <div style={styles.footer}>
        <strong style={styles.price}>
          {annonce.price != null ? `${annonce.price} €` : 'Prix non renseigné'}
        </strong>
        {annonce.location && (
          <span style={styles.location}>{annonce.location}</span>
        )}
      </div>
    </div>
  )
}

const styles = {
  card: {
    border: '1px solid #e5e7eb',
    borderRadius: 10,
    padding: '16px 20px',
    marginBottom: 12,
    background: '#fff',
    boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
  },
  header:      { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  title:       { margin: 0, fontSize: 17, fontWeight: 600, color: '#111827' },
  category: {
    background: '#fff7ed',
    color: '#ea580c',
    border: '1px solid #fed7aa',
    padding: '2px 10px',
    borderRadius: 12,
    fontSize: 12,
    whiteSpace: 'nowrap',
  },
  description: { color: '#6b7280', margin: '8px 0 12px', fontSize: 14 },
  footer:      { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  price:       { color: '#16a34a', fontSize: 16, fontWeight: 700 },
  location:    { color: '#9ca3af', fontSize: 13 },
}
