import axios from "axios";

const api = axios.create({
  baseURL : "https://backendassistenciasocial-production.up.railway.app"
})

// const api = axios.create({
//   baseURL : "http://localhost:3333"
// })

export default api