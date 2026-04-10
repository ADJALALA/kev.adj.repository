import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    // On récupère le token depuis localStorage au démarrage
    // Si l'utilisateur était déjà connecté → il reste connecté
    token: localStorage.getItem('token') || null,

    // Pareil pour l'utilisateur
    user: JSON.parse(localStorage.getItem('user')) || null
  }),

  getters: {
    // isLoggedIn retourne true si un token existe
    // !! convertit la valeur en boolean
    isLoggedIn: (state) => !!state.token
  },

  actions: {
    // Appelée après un login réussi
    setAuth(token, user) {
      // On sauvegarde dans le state
      this.token = token
      this.user = user

      // On sauvegarde dans localStorage pour persister
      // même si l'utilisateur ferme le navigateur
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))
    },

    // Appelée au logout
    logout() {
      this.token = null
      this.user = null

      // On supprime du localStorage
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    }
  }
})