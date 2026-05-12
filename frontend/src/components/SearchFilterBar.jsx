export default function SearchFilterBar({
  search, setSearch
}) {
  return (


    <div>
      <input type="text" 
      placeholder="Rechercher une annonce" 
      value = {search}
      onChange={(e)=> setSearch(e.target.value)}
      style={StyleSheet.inputMain }
      />
    </div>


  )
}

const styles = {

    inputMain: {

    }
} 