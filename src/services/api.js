import axios from 'axios'

export const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://messenger-backend-sei.herokuapp.com'
    : 'http://localhost:3001'

const Client = axios.create({ baseURL: BASE_URL })
export default Client
