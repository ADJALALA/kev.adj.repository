
import axios from 'axios'

// Instance axios pointant vers notre backend
const api = axios.create({
  baseURL: 'http://localhost:3000'
})

// POST /auth/register
export async function register(name, email, password) {
  const { data } = await api.post('/auth/register', {
    name,
    email,
    password
  })
  return data
}

// POST /auth/login
export async function login(email, password) {
  const { data } = await api.post('/auth/login', {
    email,
    password
  })
  return data  // { token, user }
}