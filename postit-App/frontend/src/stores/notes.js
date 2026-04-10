// 
import { defineStore } from 'pinia'
import {
  fetchAllNotes,
  createNote,
  updateNote,
  deleteNote,
  deleteAllNotes
} from '@/api/notes.js'

export const useNotesStore = defineStore('notes', {
  state: () => ({
    notes: [],
    loading: false,
    searchQuery: ''
  }),

  getters: {
    filteredNotes(state) {
      if (!state.searchQuery.trim()) return state.notes
      const query = state.searchQuery.toLowerCase()
      return state.notes.filter(note =>
        note.title.toLowerCase().includes(query) ||
        note.content.toLowerCase().includes(query)
      )
    }
  },

  actions: {
    async loadNotes() {
      this.loading = true
      try {
        const data = await fetchAllNotes()
        // Charge les notes depuis l'API
        // Le token est envoyé automatiquement via l'intercepteur axios
        this.notes = Array.isArray(data)? data: []
      } catch (err) {
        console.error('Erreur chargement notes:', err)
        this.notes = []
      } finally {
        // finally s'exécute toujours même en cas d'erreur
        this.loading = false
      }
    },

    async addNote() {
      try {
        const newNote = {
          title: 'Nouvelle note',
          content: '',
          color: '#fef08a'
        }
        const created = await createNote(newNote)
        this.notes.push(created)
        return created.id
      } catch (err) {
        console.error('Erreur ajout note:', err)
      }
    },

    async updateNote(id, changes) {
      try {
        console.log('update note id:', id)
        console.log('changes:', changes)
        await updateNote(id, changes)
        const index = this.notes.findIndex(n => n.id == id)
        console.log('Indzx trouvé:', index)
        if (index !== -1) {
          Object.assign(this.notes[index], changes)
        }
      } catch (err) {
        console.error('Erreur modification note:', err)
      }
    },

    async deleteNote(id) {
      try {
        await deleteNote(id)
        this.notes = this.notes.filter(n => n.id !== id)
      } catch (err) {
        console.error('Erreur suppression note:', err)
      }
    },

    async deleteAll() {
      try {
        await deleteAllNotes()
        this.notes = []
      } catch (err) {
        console.error('Erreur suppression toutes les notes:', err)
      }
    },

    getNoteById(id) {
      return this.notes.find(n => n.id == id)
    }
    
  }
})

// ===Partie localstorage===

//  import { defineStore } from 'pinia'
//  export const useNotesStore = defineStore('notes', {

//    state: () => ({
//      notes: [],
//      searchQuery: ''
//    }),
//    getters: {
//     filteredNote(state){
//       if(!state.searchQuery.trim()) return state.notes
//       const query = state.searchQuery.toLowerCase()
//       return state.notes.filter(note =>
//         note.title.toLowerCase().includes(query) || 
//         note.content.toLowerCase().includes(query)
//       )
//     }
//    },
//    actions: {
//      loadNotes() {
//        const saved = localStorage.getItem('postit-notes')
//        this.notes = saved ? JSON.parse(saved) : []
//      },

//      saveNotes() {
//        localStorage.setItem('postit-notes', JSON.stringify(this.notes))
//      },

//      // Ajoute une nouvelle note avec un titre et un contenu vides par défaut
//      addNote() {
//        const newNote = {
//         id: Date.now(),
//         title: 'Nouvelle note',
//         content: '',
//         color: '#fef08a'
//       }       
//       this.notes.push(newNote) // ajoute au tableau/       this.saveNotes()         // sauvegarde immédiatement
//       return newNote.id        // retourne l'id pour pouvoir rediriger vers la note
//     },

//     // Met à jour une note existante (par son id)
//     updateNote(id, changes) {
//       // findIndex cherche la position de la note avec cet id dans le tableau
//       const index = this.notes.findIndex(n => n.id === id)
//       if (index !== -1) {
//         // Object.assign copie les propriétés de changes dans la note existante
//         // (ex: si changes = { title: 'nouveau' }, seul le titre est modifié)
//         Object.assign(this.notes[index], changes)/         this.saveNotes()
//       }
//     },

//     // Supprime une note par son id
//     deleteNote(id) {
//       // filter retourne un nouveau tableau sans la note supprimée
//       this.notes = this.notes.filter(n => n.id !== id)
//       this.saveNotes()
//     },
//     deleteAll() {
//       this.notes = []
//       this.saveNotes()
//     },
//     // Récupère une note unique par son id
//     getNoteById(id) {
//       // find retourne le premier élément qui correspond, ou undefined
//       return this.notes.find(n => n.id === id)
//     }
//    }
// })