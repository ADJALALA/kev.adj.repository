<template>
  <div class="min-h-screen flex flex-col">
    <!-- La navbar s'affiche UNIQUEMENT si connecté -->
    <Navbar v-if="authStore.isLoggedIn" />
    <main class="flex-1">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import Navbar from './components/Navbar.vue';
import { useNotesStore } from './stores/notes.js'
import { useRouter } from 'vue-router';
import { useAuthStore } from './stores/auth';

const store = useNotesStore()
const router = useRouter()
const authStore = useAuthStore()

onMounted(async () => {
  // Si l'utilisateur est connecté (token dans localStorage)
  // on charge ses notes automatiquement
  if (authStore.isLoggedIn) {
    await store.loadNotes()
  } else {
    // Sinon on redirige vers login
    router.push('/login')
  }
})
</script>
