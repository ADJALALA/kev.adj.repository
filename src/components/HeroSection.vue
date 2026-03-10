<template>
  <section id="hero" class="min-h-screen flex flex-col justify-end px-8 md:px-16 pb-20 pt-24 relative overflow-hidden">
    <div class="absolute inset-0 hero-grid"></div>

    <div class="hero-badge relative z-10 flex items-center gap-2 font-mono text-accent text-[0.72rem] tracking-[0.12em] mb-6">
      DÉVELOPPEUR WEB — DISPONIBLE
    </div>

    <!-- title-line a overflow:hidden → le span monte depuis le bas (slideUp) -->
      <h1 class="relative z-10 text-[clamp(3.5rem,9vw,9rem)] font-extrabold leading-[0.9] tracking-[-0.04em] mb-8">
      <span class="title-line block"><span class="block animate-slideUp">Créer des</span></span>
      <span class="title-line block"><span class="block animate-slideUp-d1 text-accent italic">expériences</span></span>
      <span class="title-line block"><span class="block animate-slideUp-d2">mémorables.</span></span>
    </h1>

    <div class="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8 mt-4 animate-fadeIn">
      <img src="/Me.jpeg" alt="ma photo" class="w-50 h-50 rounded-full object-cover border-2 border-accent transform hover:scale-110 transition duration-500">
      <p class="font-display text-sm text-muted leading-relaxed max-w-xs">
        <b>Salut! 😊</b>
        Je suis Kevin Ebénior ADJALALA , Developpeur web fullstack passionné par la creation de solutions numeriques modernes et performantes. 
        Outre mon expertise en developpement web, je maitrise Wordpress et je conçois des applications web completes, de l'interface utilisateurs (Frontend)
        jusqu'à la gestion des bases de données et de la logique serveur (Backend). Curieux et rigoureux j'aime transformer des idées en plateformes fonctionnelles, intuitives et optimisées
        Toujours en apprentissage, je m'interesse aux nouvelles technologies du web afin de proposer des solutions efficaces, sécurisées et adaptées aux besoins des utilisateurs et entreprises
        <b>Mon objectif ?</b>
        <b>Creer des expériences web intuitives et impactantes</b>
      </p>
      
      <div class="flex gap-16 items-end">
        <div class="font-mono text-[0.72rem] text-muted">
          <!-- {{ projectCount }} → donnée réactive, mise à jour par countUp() -->
          <span class="block text-4xl font-extrabold font-display text-light">{{ projectCount }}+</span>
          projets livrés
        </div>
        <div class="font-display text-[0.72rem] text-muted">
          <span class="block text-4xl font-extrabold font-display text-light">{{ expYears }}</span>
          ans d'expérience
        </div>
      </div>
      <div class="flex flex-col items-center gap-2 font-display text-[0.65rem] text-muted tracking-[0.1em]">
        <div class="w-px h-16 bg-linear-to-b from-accent to-transparent animate-scrollPulse"></div>
        SCROLL
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const projectCount = ref(0) // ref() → valeur réactive (Vue re-rend quand ça change)
const expYears     = ref(0)

function countUp(refVar, target, duration = 1800) {
  const start = performance.now()
  function update(now) {
    const progress = Math.min((now - start) / duration, 1)
    refVar.value = Math.round(progress * target) // .value obligatoire en JS
    if (progress < 1) requestAnimationFrame(update)
  }
  requestAnimationFrame(update)
}

onMounted(() => {
  setTimeout(() => countUp(projectCount, 24, 1600), 600)
  setTimeout(() => countUp(expYears, 3, 1200), 700)
})
</script>