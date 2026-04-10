<template>
  <div class=" w-full bg-gray-100 p-8">
    <h1 class="text-2xl font-bold text-gray-700 mb-8">Mes Post-its</h1>

    <div v-if="store.loading" class="flex justify-center items-center h-64">
      <p class="text-gray-500 text-lg">Chargement...</p>
    </div>

    <!-- Grille responsive de post-its -->
    <TransitionGroup 
      v-else
      tag="div"
      name="note"
      move-class="transition-all duration-500"
      class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      <PostitCard
        v-for="note in store.filteredNotes"
        :key="note.id"
        :note="note"
        @open="handleOpen"
      />

      <!-- Bouton d'ajout -->
      <button
        :key="0"
        class="min-h-36 rounded border-2 border-dashed border-gray-400 flex items-center justify-center text-gray-400 hover:border-gray-600 hover:text-gray-600 transition"
        @click="handleAdd"
      >
        <span class="text-3xl">+</span>
      </button>
    </TransitionGroup>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useNotesStore } from '../stores/notes.js'
import PostitCard from '../components/PostitCard.vue'

const router = useRouter()   
const store = useNotesStore()


// Appelée quand on clique "+" : crée une note et redirige vers son détail
async function handleAdd() {
  const id = await store.addNote()           
  router.push(`/note?id=${id}`)         
}

// Appelée quand on clique la flèche d'une carte (événement 'open' reçu)
function handleOpen(id) {
  router.push(`/note?id=${id}`)         
}
</script>

<style scoped>
.note-enter-from{
  opacity: 0;
  transform: translateY(20px);
}
.note-enter-active{
  transition: all 0.5s ease;
}
.note-enter-to{
  opacity: 1;
  transform: translateY(0);
}
.note-leave-from{
  opacity: 1;
  transform: translateY(0);
}
.note-leave-active{
  transition: all 0.5s ease;
  position: absolute;
}
.note-leave-to{
  opacity: 0;
  transform: translateY(-20px);
}
</style>

