<template>
  <nav :class="[
    'fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-8 md:px-16 py-5 border-b transition-all duration-300',
    scrolled ? 'bg-bg/90 backdrop-blur-xl border-border' : 'bg-transparent border-transparent'
  ]">

    <!-- LOGO -->
    <div class="font-display font-extrabold text-lg tracking-tight">
      Mon Portfolio<span class="text-accent">.</span>
    </div>

    <!-- LIENS desktop : cachés sur mobile, visibles sur md+ -->
    <div class="hidden md:flex gap-10">
      <a v-for="link in links" :key="link.href" :href="link.href"
        @click="menuOpen = false"
        class="font-mono text-xs text-muted hover:text-accent transition-colors tracking-widest">
        {{ link.label }}
      </a>
    </div>

    <!-- BOUTONS DROITE : toggle thème + hamburger -->
    <div class="flex items-center gap-4">

      <!--
        BOUTON DARK/LIGHT MODE
        @click="toggleTheme" → appelle la fonction du composable
        isDark → détermine quelle icône afficher (soleil ou lune)
      -->
      <button
        @click="toggleTheme"
        class="w-9 h-9 flex items-center justify-center border border-border rounded-full hover:border-accent transition-all duration-200 text-muted hover:text-accent"
        :aria-label="isDark ? 'Passer en mode clair' : 'Passer en mode sombre'"
      >
        <!--
          v-if/v-else → affiche soleil si dark, lune si clair
          Les icônes sont en SVG inline (pas besoin de librairie)
        -->

        <!-- SOLEIL → visible en mode sombre (pour passer au clair) -->
        <svg v-if="isDark" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="5"/>
          <line x1="12" y1="1" x2="12" y2="3"/>
          <line x1="12" y1="21" x2="12" y2="23"/>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
          <line x1="1" y1="12" x2="3" y2="12"/>
          <line x1="21" y1="12" x2="23" y2="12"/>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
        </svg>

        <!-- LUNE → visible en mode clair (pour passer au sombre) -->
        <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        </svg>
      </button>
    </div>
    <!-- Menu mobile -->
    <button
      @click="menuOpen = !menuOpen"
      class="md:hidden flex flex-col justify-center gap-1.5 w-8 h-8 focus:outline-none"
      aria-label="Menu"
    >
      
      <span :class="[
        'block h-px bg-light transition-all duration-300 origin-center',
        menuOpen ? 'rotate-45 translate-y-[10px]' : ''
      ]"></span>
      <span :class="[
        'block h-px bg-light transition-all duration-300',
        menuOpen ? 'opacity-0' : ''
      ]"></span>
      <span :class="[
        'block h-px bg-light transition-all duration-300 origin-center',
        menuOpen ? '-rotate-45 -translate-y-[4px]' : ''
      ]"></span>
    </button>

  </nav>

  <Transition
    enter-from-class="opacity-0 -translate-y-4"
    enter-to-class="opacity-100 translate-y-0"
    enter-active-class="transition-all duration-300"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 -translate-y-4"
    leave-active-class="transition-all duration-200"
  >
    <div
      v-if="menuOpen"
      class="md:hidden fixed top-[72px] left-0 right-0 z-[99] bg-bg/95 backdrop-blur-xl border-b border-border"
    >
      <div class="flex flex-col px-8 py-4">
        <a
          v-for="link in links"
          :key="link.href"
          :href="link.href"
          @click="menuOpen = false"
          class="font-mono text-sm text-muted hover:text-accent py-4 border-b border-border last:border-0 transition-colors tracking-widest"
        >
          <!-- Numéro décoratif + label -->
          <span class="text-accent mr-3">0{{ link.index }}.</span>
          {{ link.label }}
        </a>
      </div>
    </div>
  </Transition>

</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useTheme } from '@/composables/useTheme'

const scrolled  = ref(false)
const menuOpen  = ref(false)

// On récupère isDark et toggleTheme depuis le composable
const { isDark, toggleTheme } = useTheme()

const links = [
  { href: '#hero',     label: 'Acceuil',      index: 1 },
  { href: '#projets',     label: 'Projets',      index: 2 },
  { href: '#competences', label: 'Compétences',   index: 3 },
  { href: '#services', label: 'Services',   index: 4 },
  { href: '#contact',     label: 'Contact',       index: 5 },
]

function onScroll() {
  scrolled.value = window.scrollY > 60
  // Ferme le menu si l'utilisateur scrolle
  if (menuOpen.value) menuOpen.value = false
}

// Ferme le menu si on clique en dehors
function onClickOutside(e) {
  if (menuOpen.value && !e.target.closest('nav') && !e.target.closest('[data-menu]')) {
    menuOpen.value = false
  }
}

onMounted(() => {
  window.addEventListener('scroll', onScroll)
  document.addEventListener('click', onClickOutside)
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  document.removeEventListener('click', onClickOutside)
})
</script>