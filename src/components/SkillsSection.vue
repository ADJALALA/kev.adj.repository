<template>
  <section id="competences" class="bg-surface border-y border-border px-8 md:px-16 py-32">
    <div class="section-label flex items-center gap-3 font-mono text-[0.7rem] text-accent tracking-[0.15em] mb-4">03 — EXPERTISE</div>

    <div class="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-24 items-start">

      <!-- Colonne sticky : reste visible pendant le scroll -->
      <div class="reveal md:sticky md:top-32">
        <h2 class="text-[clamp(2.2rem,4vw,3.5rem)] font-extrabold tracking-[-0.03em] leading-none">Stack &<br>maîtrise.</h2>
        <p class="font-mono text-[0.82rem] text-gray-400 leading-[1.8] mt-6">Des fondamentaux solides combinés à une curiosité constante.</p>
      </div>

      <div class="flex flex-col gap-12">
        <div class="reveal" v-for="group in skillGroups" :key="group.label">
          <div class="font-mono text-[0.65rem] tracking-[0.15em] text-muted mb-6 pb-3 border-b border-border">{{ group.label }}</div>
          <div class="flex flex-col gap-4">
            <div class="flex flex-col gap-1.5" v-for="s in group.skills" :key="s.name">
              <div class="flex justify-between items-center">
                <span class="text-sm font-semibold">{{ s.name }}</span>
                <span class="font-mono text-[0.7rem] text-gray-400">{{ s.pct }}%</span>
              </div>
              <div class="h-px bg-border relative overflow-hidden">
                <!--
                  :class="{ animate: skillsVisible }" → ajoute la classe 'animate'
                  quand skillsVisible devient true (déclenche la transition CSS)
                  :style → scaleX dynamique selon le pourcentage de la compétence
                -->
                <div class="skill-fill absolute inset-0 bg-accent"
                  :class="{ animate: skillsVisible }"
                  :style="{ transform: skillsVisible ? `scaleX(${s.pct / 100})` : 'scaleX(0)' }">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const skillsVisible = ref(false) // passe à true quand la section entre dans le viewport

const skillGroups = ref([
  { label: 'FRONTEND', skills: [
    { name: 'HTML5 / CSS(Tailwind)', pct: 98 },
    { name: 'Vue.js / Nuxt', pct: 88 },
    { name: 'React(Next.js)', pct: 55 },
    { name: 'JavaScript / TypeScript', pct: 82 },
    { name: 'Design IU / UX', pct: 70 },
  ]},
  { label: 'BACKEND', skills: [
    { name: 'PHP(Laravel)', pct: 80 },
    { name: 'Python(Flask)', pct: 50 },
    { name: 'Node.js / Express', pct: 75 },
    { name: 'REST API / ', pct: 70 },
    { name: 'MySQL / PostgreSQL', pct: 80 },
  ]},
  { label: 'OUTILS', skills: [
    { name: 'Git / GitHub', pct: 92 },
    { name: 'Docker / CI-CD', pct: 65 },
    { name: 'Figma', pct: 68 },
    { name: 'Wordpress', pct: 60 },
  ]},
])

onMounted(() => {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible')
        skillsVisible.value = true // déclenche les barres
      }
    })
  }, { threshold: 0.15 })
  document.querySelectorAll('#competences .reveal').forEach(el => observer.observe(el))
})
</script>