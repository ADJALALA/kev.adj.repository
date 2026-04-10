<template>
  <div
    class="w-auto min-h-36 rounded shadow-md p-3 flex flex-col justify-between cursor-pointer transform hover:translate-y-2 transition duration-300 overflow-scroll"
    :style="{ backgroundColor: props.note.color }"
  >
    <!-- Titre de la note, tronqué si trop long -->
    <div>
      <h3 class="font-semibold text-sm text-gray-700 mb-1">{{ props.note.title }}</h3>
      <!-- line-clamp-3 limite l'affichage à 3 lignes -->
      <p class="text-xs text-gray-600 line-clamp-3">{{ props.note.content }}</p>
    </div>

    <!-- Bouton flèche → émet l'événement 'open' vers le parent avec l'id de la note -->
    <button
      class="self-end mt-2 bg-black opacity-50 text-gray-100 rounded-full px-2 py-1"
      @click="emit('open', props.note.id)"
    >
      →
    </button>
  </div>
</template>

<script setup>
// Ici, le parent (NotesView) passe un objet "note" à chaque carte
const props = defineProps({
  note: {
    type: Object,   
    required: true 
  }
})

const emit = defineEmits(['open'])
</script>