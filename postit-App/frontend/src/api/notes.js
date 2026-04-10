import axios from "axios"

const api = axios.create({
    baseURL: 'http://localhost:3000'
})
// NOUVEAU : intercepteur
// S'exécute automatiquement avant CHAQUE requête
// et ajoute le token dans le header Authorization
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')

  if (token) {
    // Le serveur attend : "Bearer eyJhbGci..."
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})
export async function fetchAllNotes() {
    const {data} = await api.get(`/notes`)
    return data
}
export async function fetchNoteById(id) {
    const {data} = await api.get(`/notes/${id}`)
    return data
}
export async function createNote(note) {
    const {data} = await api.post(`/notes`, note)
    return data
}
export async function updateNote(id, changes) {
    const {data} = await api.put(`/notes/${id}`, changes)
    return data
}
export async function deleteNote(id) {
    await api.delete(`/notes/${id}`)
}
export async function deleteAllNotes() {
    await api.delete(`/notes`)
}


