export default function SearchFilterBar({
  search, setSearch,
  categoryId, setCategoryId,
  minPrice, setMinPrice,
  maxPrice, setMaxPrice,
  categories,
}) {
  return (
    <div style={styles.bar}>
      <input
        type="text"
        placeholder="Rechercher une annonce..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={styles.inputMain}
      />
      <select
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
        style={styles.select}
      >
        <option value="">Toutes les catégories</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>{cat.name}</option>
        ))}
      </select>
      <input
        type="number"
        placeholder="Prix min"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
        style={styles.inputSmall}
        min={0}
      />
      <input
        type="number"
        placeholder="Prix max"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
        style={styles.inputSmall}
        min={0}
      />
    </div>
  )
}

const styles = {
  bar: { display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 },
  inputMain: { flex: 2, padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: 6, fontSize: 14, minWidth: 200 },
  select: { flex: 1, padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: 6, fontSize: 14, minWidth: 150 },
  inputSmall: { flex: 1, padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: 6, fontSize: 14, minWidth: 100 },
}
