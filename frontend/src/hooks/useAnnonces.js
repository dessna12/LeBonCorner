import { useState, useEffect } from "react";
import api from '../api/api.js'
import { useActionData } from "react-router-dom";

export function useAnnonces() {
  const [annonces, setAnnonces] = useState([])
  const [ isLoading, setIsLoading ] = useState(false)
  const [ error, setError ] = useState(null)
  const [ search, setSearch ] = useState('')
  const [ maxPrice, setMaxPrice ] = useState(null)
  const [ minPrice, setMinPrice ]= useState(null)
  const [ categories, setCategories] = useState([])
  const [ categoryId, setCategoryId] = useState(null)


  useEffect(() => {
    api.get('/categories').then((res) => setCategories(res.data))
  }, [])

  useEffect(() => {
    setIsLoading(true)  
    
    const params = {}
    if(search) params.q = search
    if(categoryId) params.category_id = categoryId
    if(minPrice) params.min_price = minPrice
    if(maxPrice) params.max_price = maxPrice 

    api.get('/posts/search', { params })
    .then((res)=> setAnnonces(res.data))
    .catch((err)=>setError(err.message))
    .finally(()=>setIsLoading(false))
  },[search, categoryId, minPrice, maxPrice])

  // const annoncesFiltrees = useMemo(() => {
    
  //   return annonces.filter((a) => {
  //     const q = search.toLowerCase()
  //       return (
  //         a.title?.toLowerCase().include(q) ||
  //         a.description?.toLowerCase().include(q)
  //       )
  //     })
  //   }, [annonces, search, minPrice, maxPrice, categories])





  return {
    annonces,
    categories,
    isLoading,
    error,
    search, setSearch,
    minPrice, setMinPrice,
    maxPrice, setMaxPrice,
    categoryId, setCategoryId,
  } 

}