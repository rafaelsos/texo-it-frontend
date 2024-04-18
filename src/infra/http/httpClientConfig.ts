import axios from 'axios'

export const HttpClientConfig = axios.create({
  baseURL: 'https://tools.texoit.com/backend-java/api/movies',
})
