<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center">
    <div class="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">

      <h1 class="text-2xl font-bold text-center text-gray-800 mb-6">
        🗒️ Créer un compte
      </h1>

      <p v-if="error" class="text-red-500 text-sm text-center mb-4">
        {{ error }}
      </p>

      <p v-if="success" class="text-green-500 text-sm text-center mb-4">
        {{ success }}
      </p>

      <div class="flex flex-col gap-4">

        <div>
          <label class="text-sm text-gray-600">Nom</label>
          <input
            v-model="name"
            type="text"
            placeholder="Votre nom"
            class="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        <div>
          <label class="text-sm text-gray-600">Email</label>
          <input
            v-model="email"
            type="email"
            placeholder="exemple@gmail.com"
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

        <button
          class="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-semibold py-2 rounded-lg transition"
          :disabled="loading"
          @click="handleRegister"
        >
          {{ loading ? 'Inscription...' : "S'inscrire" }}
        </button>

        <p class="text-center text-sm text-gray-500">
          Déjà un compte ?
          <span
            class="text-yellow-600 cursor-pointer hover:underline"
            @click="router.push('/login')"
          >
            Se connecter
          </span>
        </p>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { register } from '@/api/auth'

const router = useRouter()

const name = ref('')
const email = ref('')
const password = ref('')
const error = ref('')
const success = ref('')
const loading = ref(false)

async function handleRegister() {
  error.value = ''
  success.value = ''
  loading.value = true

  try {
    await register(name.value, email.value, password.value)

    // Affiche un message de succès
    success.value = 'Compte créé ! Redirection...'

    // Attend 1 seconde puis redirige vers login
    setTimeout(() => {
      router.push('/login')
    }, 1000)

  } catch (err) {
    error.value = err.response?.data?.message || "Erreur d'inscription"
  } finally {
    loading.value = false
  }
}
</script>