import { useState, useEffect } from "react";
import { api } from '../api/api.js'
import { useActionData } from "react-router-dom";

export function useAnnonces() {
  const [annonces, setAnnonces] = useState([])
  const [ isLoading, setIsLoading ] = useState(false)
  const [ error, setError ] = useState(null)
  const [ search, setSearch ] = useState('')
  const [ minPrice, setMinPrice ]= useState(null)
  const [ categories, setCategories] = useState([])


  useEffect(() => {
    setIsLoading(true)
    try {
      // const { data } = await api.get('/posts')
      // const { dataCategories} = await api.get('/categories')

      Promise.all([
        api.get('/posts'),
        api.get('/categories')]
      ).then(([postRes, categoriesRes]) => {
        setAnnonces(postRes.data),
        setCategories(categoriesRes.data)
      })
      // setAnnonces(data)
    }catch(err){
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const annoncesFiltrees = useMemo(() => {
    return annonces.filter((a) => {
      const q = search.toLowerCase()
        return (
          a.title?.toLowerCase().include(q) ||
          a.description?.toLowerCase().include(q)
        )
      })
    }, [annonces, search, minPrice, maxPrice, categories])


  return {
    annonces,
    isLoading,
    isError,
    search,
    setSearch,
    annoncesFiltrees 
  } 

}