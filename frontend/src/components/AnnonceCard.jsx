export default function AnnonceCard({ annonce }) {
  return (
    <div style = { styles.card }>
      <div style = { styles.header }>
        <h3>{annonce.title}</h3>
        { annonce.description && (
          <p>{annonce.description}</p>
        )}
        { annonce.price && (
          <p>{annonce.price}</p>
        )}
      </div>
    </div>
  )
}


const styles = {
 card : {

 },

 header : {

 }

}