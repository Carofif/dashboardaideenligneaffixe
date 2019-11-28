import axios from 'axios'

const api = axios.create({
  baseURL: 'https://aide-en-ligne-affixe2.firebaseapp.com/api/v1/',
  headers: {
    'Content-Type': 'application/json'
  }
})

export default api
