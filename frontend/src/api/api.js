import axios from 'axios'

const api = axios.create({
  baseURL: '/api' 
})

let accessToken = null

export function setAccessToken(token){
  accessToken = token 
}

api.interceptors.request.use((config) => {
  if (accessToken){
    config.headers.Authorization = `Bearer ${accessToken}`
  }
  return config
})


api.interceptors.response.use(
  (response) => response,

  async (error)=> {
    const originalRequest = error.config

      if(error.response?.status===401 && !originalRequest.once) {
        originalRequest.once=true
        try{
          const { data } = await api.post('/auth/refresh', null, { withCredentials: true })
          accessToken=data.accessToken
        }catch{
          accessToken = null
          window.location.href='/login'
          return Promise.reject(error)
        }
      }
    return Promise.reject(error)
  }
)

export default api 

