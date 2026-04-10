import { createRouter, createWebHistory } from 'vue-router'
import Notes from '../views/Notes.vue'
import Note from '../views/Note.vue'
import Register from '@/views/Register.vue'
import Login from '@/views/Login.vue'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  
  history: createWebHistory(),

  routes: [
    {
      path: '/',            // URL racine
      component: Notes, // affiche la liste des post-its
      meta: { requiresAuth: true }  // ← route protégée
    },
    {
      path: '/note',        // URL de détail
      component: Note ,
      meta: { requiresAuth: true }  // ← route protégée
      
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/register',
      component: Register
    }
  ]
})

// Navigation guard : s'exécute avant chaque changement de route
router.beforeEach((to) => {
  const authStore = useAuthStore()

  // Si la route nécessite d'être connecté
  // ET que l'utilisateur n'est pas connecté
  if (to.meta.requiresAuth && !authStore.isLoggedIn) {
    // Redirige vers login
    return '/login'
  }

  // Si l'utilisateur est connecté et essaie d'aller sur /login ou /register
  // → redirige vers la liste des notes
  if ((to.path === '/login' || to.path === '/register') && authStore.isLoggedIn) {
    return '/'
  }
})

export default router