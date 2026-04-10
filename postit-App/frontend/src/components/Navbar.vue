<template>
    <nav class="fixed top-0 left-0 right-0 z-50 bg-yellow-400 shadow-md px-8 py-4 flex items-center justify-between">
        <div class="flex items-center gap-4">
            <h1 class="text-xl font-bold text-gray-800">🗒️Mes Post-its</h1>
            <span class="bg-yellow-600 text-white text-sm font-sensibold px-3 py-1 rounded-full">
                {{ store.notes.length }} note{{ store.notes.length > 1 ? 's' : '' }}
            </span>
        </div>
        <input 
            type="text" 
            v-model="store.searchQuery" 
            placeholder="🔍Rechercher une note" 
            class="w-64 px-4 py-2 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-yellow-600 bg-white text-gray-700">
        <div class="flex items-center gap-3">
            <button
            class="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg transition"
            @click="handleAdd"
           >
            + Ajouter
          </button>
          <button
            class="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg transition"
            @click="handleDeleteAll"
           >
            Supprimer tout
          </button>
          <button
            class="bg-gray-600 hover:bg-gray-700 text-white font-semibold px-4 py-2 rounded-lg transition"
            @click="handleLogout"
            >
            👤 {{ authStore.user?.name }}  |  Déconnexion
          </button>
        </div>

    </nav>

</template>


<script setup>
import { useRouter } from 'vue-router'
import { useNotesStore } from '@/stores/notes'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const store = useNotesStore()
const authStore = useAuthStore()

async function handleAdd() {
  const id = await store.addNote()
  router.push(`/note?id=${id}`)
}

async function handleDeleteAll() {
  if (confirm('Supprimer toutes les notes ?')) {
    await notesStore.deleteAll()
  }
}

function handleLogout() {
  // Vide les notes du store
  store.notes = []
  // Supprime le token
  authStore.logout()
  // Redirige vers login
  router.push('/login')
}
</script>

<!-- 
<script setup>
import { useRouter } from 'vue-router'
import { useNotesStore } from '../stores/notes.js'
import PostitCard from '../components/PostitCard.vue'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'


const authStore = useAuthStore()

const router = useRouter()   
const store = useNotesStore()

// Appelée quand on clique "+" : crée une note et redirige vers son détail
function handleAdd() {
  const id = store.addNote()           
  router.push(`/note?id=${id}`)         
}
function handleDeleteAll() {
    if(confirm('Supprimer tout les postit ? , cette action est irreversible!')){
        store.deleteAll()
    }
}
function handleLogout() {
  authStore.logout()
  router.push('/login')
}
</script> -->

