<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center">
    <div class="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">

      <h1 class="text-2xl font-bold text-center text-gray-800 mb-6">
        🗒️ Connexion
      </h1>

      <!-- Message d'erreur -->
      <p v-if="error" class="text-red-500 text-sm text-center mb-4">
        {{ error }}
      </p>

      <div class="flex flex-col gap-4">

        <div>
          <label class="text-sm text-gray-600">Email</label>
          <input
            v-model="email"
            type="email"
            placeholder="nom@gmail.com"
            class="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        <div>
          <label class="text-sm text-gray-600">Mot de passe</label>
          <input
            v-model="password"
            type="password"
            placeholder="••••••••"
            class="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        <!-- Bouton connexion -->
        <button
          class="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-semibold py-2 rounded-lg transition"
          :disabled="loading"
          @click="handleLogin"
        >
          {{ loading ? 'Connexion...' : 'Se connecter' }}
        </button>

        <!-- Lien vers inscription -->
        <p class="text-center text-sm text-gray-500">
          Pas encore de compte ?
          <span
            class="text-yellow-600 cursor-pointer hover:underline"
            @click="router.push('/register')"
          >
            S'inscrire
          </span>
        </p>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { login } from '@/api/auth'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const error = ref('')      // message d'erreur à afficher
const loading = ref(false) // désactive le bouton pendant la requête

async function handleLogin() {
  error.value = ''
  loading.value = true

  try {
    // Appelle POST /auth/login
    const { token, user } = await login(email.value, password.value)

    // Sauvegarde le token et l'user dans le store
    authStore.setAuth(token, user)

    // Redirige vers la liste des notes
    router.push('/')

  } catch (err) {
    
    error.value = err.response?.data?.message || 'Erreur de connexion'
  } finally {
    // finally s'exécute toujours, même en cas d'erreur
    loading.value = false
  }
}
</script>