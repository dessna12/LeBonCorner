import { useState, useEffect } from "react";
import { api } from '../api/api.js'

export function useAnnonces() {
  const [annonces, setAnnonces] = useState([])
  const [ isLoading, setIsLoading ] = useState(false)
  const [ error, setError ] = useState(null)
  const [ search, setSearch ] = useState('')

  useEffect(() => {
    setIsLoading(true)
    try {
      const { data } = api.get('/posts')
      setAnnonces(data)
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
    }, [annonces, search])


  return {
    annonces,
    isLoading,
    isError,
    search,
    setSearch,
    annoncesFiltrees 
  } 

}