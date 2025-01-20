import axios from 'axios'

declare module 'axios' {
  interface AxiosRequestMeta {
    meta?: {
      timeout?: number
    }
  }
}

const baseURL: string = import.meta.env.VITE_API_CONTEXT_PATH

const instance = axios.create({
  baseURL,
  headers: { },
})

instance.interceptors.request.use(
  (config) => {
    return config
  },

  (error) => {
    return Promise.reject(error)
  },
)

instance.interceptors.response.use(
  (response) => {
    return response
  },

  (error) => {
    return Promise.reject(error)
  },
)

export default instance
