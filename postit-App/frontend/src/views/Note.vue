<template>
  <div class="min-h-screen bg-gray-100 p-8 mt-30">

    <button
      class="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900"
      @click="router.push('/')"
    >
      ← Retour à mes post-its
    </button>

    <div v-if="note" class="max-w-lg mx-auto rounded-lg shadow-lg p-8" :style="{ backgroundColor: color }">

      <!-- Indicateur de sauvegarde -->
      <p class="text-xs text-gray-500 text-right mb-2">
        Sauvegarde automatique ✅
      </p>

      <input
        v-model="title"
        class="w-full text-2xl font-bold text-center bg-transparent border-b-2 border-gray-400 focus:outline-none mb-6"
        placeholder="Titre..."
      />

      <textarea
        v-model="content"
        class="w-full h-64 bg-transparent resize-none focus:outline-none text-gray-700"
        placeholder="Contenu de la note..."
      />

      <div class="flex items-center gap-3 mt-4">
        <span class="text-sm text-gray-600">Couleur :</span>
        <span
          v-for="c in ['#fef08a', '#86efac', '#93c5fd', '#f9a8d4', '#fdba74', '#7dbc80', '#aabbcc']"
          :key="c"
          class="w-6 h-6 rounded-full cursor-pointer"
          :style="{ backgroundColor: c }"
          :class="{ 'ring-2 ring-gray-700': color === c }"
          @click="color = c; save()"
        />
      </div>

      <button
        class="bg-red-600 mt-6 text-sm hover:bg-red-700 rounded-full px-3 py-1.5 text-gray-100"
        @click="remove"
      >
        Supprimer cette note
      </button>

    </div>

    <p v-else class="text-gray-500">Note introuvable.</p>

  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useNotesStore } from '../stores/notes.js'

const route = useRoute()
const router = useRouter()
const store = useNotesStore()

// IMPORTANT : l'API renvoie des ids qui peuvent être
// des strings ou des nombres selon le backend
// On garde la valeur brute sans Number() pour éviter les problèmes
const noteId = route.query.id

// computed trouve la note dans le store
const note = computed(() => store.getNoteById(noteId))

const title = ref('')
const content = ref('')
const color = ref('#fef08a')

let debounceTimer = null

onMounted(() => {
  if (note.value) {
    title.value = note.value.title
    content.value = note.value.content
    color.value = note.value.color
  }
})

async function save() {
  await store.updateNote(noteId, {
    title: title.value,
    content: content.value,
    color: color.value
  })
}

function debouncedSave() {
  clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => {
    save()
  }, 1000)
}

watch(title, () => {
  debouncedSave()
})

watch(content, () => {
  debouncedSave()
})

// async : car deleteNote fait un appel API
async function remove() {
  await store.deleteNote(noteId)
  router.push('/')
}
</script>