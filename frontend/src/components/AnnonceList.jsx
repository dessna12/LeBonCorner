import AnnonceCard from "./AnnonceCard";

export default function AnnonceList({annonces}) {
  if(annonces.length ===0) {
    return <p> Il n'y a pas d'annonce à afficher</p>
  }

  return (
    <div>
      { annonces.map((annonce) => {
        <AnnonceCard key={annonce.id} annonce={annonce} />
      })}
    </div>
  )
}