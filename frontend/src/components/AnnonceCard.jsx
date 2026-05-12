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
    borderRadius: 8,
    padding: '16px',
    marginBottom: '12px',
    background: '#fff',
  },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  title: { margin: 0, fontSize: 18 },
  category: {
    background: '#eff6ff',
    color: '#2563eb',
    padding: '2px 10px',
    borderRadius: 12,
    fontSize: 12,
    whiteSpace: 'nowrap',
  },
  description: { color: '#6b7280', margin: '8px 0 12px' },
  footer: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  price: { color: '#16a34a', fontSize: 16 },
  location: { color: '#9ca3af', fontSize: 13 },
}
