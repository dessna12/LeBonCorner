import AnnonceCard from './AnnonceCard'

export default function AnnonceList({ annonces }) {
  if (annonces.length === 0) {
    return <p style={{ color: '#6b7280', textAlign: 'center', padding: '40px 0' }}>Aucune annonce ne correspond à votre recherche.</p>
  }

  console.log(annonces)

  return (
    <div>
      {annonces.map((annonce) => (
        <AnnonceCard key={annonce.id} annonce={annonce} />
      ))}
    </div>
  )
}
