import axios from 'axios'
const instance = axios.create({})
instance.interceptors.request.use((config) => {
  return config
})

instance.interceptors.response.use((response) => {
  if (response.data.httpStatusCode === 200) {
    return response.data
  } else {
    return response
  }
})
export default instance
