<template>
  <!-- Curseur custom (déplacé par JS dans onMounted) -->
  <div id="cursor"
    class="fixed w-2.5 h-2.5 bg-accent rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-all duration-200">
  </div>
  <div id="cursor-ring"
    class="fixed w-9 h-9 border border-accent/40 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 transition-all duration-300">
  </div>

  <div class="bg-bg text-light font-display overflow-x-hidden">
    <!-- Chaque ligne = un composant enfant importé -->
    <NavBar />
    <HeroSection />
    <ProjectsSection />
    <SkillsSection />
    <ServicesSection/>
    <ContactSection />
    <AppFooter />
    
  </div>
</template>

<script setup>

// Avec <script setup>, importer suffit — pas besoin de "components: {}"
import { onMounted } from 'vue'
import { useTheme } from './composables/useTheme'
import NavBar          from './components/NavBar.vue'
import HeroSection     from './components/HeroSection.vue'
import ProjectsSection from './components/ProjectsSection.vue'
import SkillsSection   from './components/SkillsSection.vue'
import ContactSection  from './components/ContactSection.vue'
import AppFooter       from './components/AppFooter.vue'
import ServicesSection from './components/ServicesSection.vue'

const { initTheme } = useTheme()

onMounted(() => {
  // Initialise le thème au démarrage de l'app
  initTheme()
  const cursor = document.getElementById('cursor')
  const ring   = document.getElementById('cursor-ring')
  document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px'
    cursor.style.top  = e.clientY + 'px'
    ring.style.left   = e.clientX + 'px'
    ring.style.top    = e.clientY + 'px'
  })
})

</script>

