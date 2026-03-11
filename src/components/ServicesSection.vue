<template>
  <section id="services" class="px-8 md:px-16 py-32 bg-surface border-y border-border">

    <div class="section-label flex items-center gap-3 font-mono text-[0.7rem] text-accent tracking-[0.15em] mb-4">
      01 — SERVICES
    </div>

    <h2 class="text-[clamp(2.2rem,4vw,3.5rem)] font-extrabold tracking-[-0.03em] leading-none mb-16">
      Ce que<br>je fais.
    </h2>

    <!--
      Grille de services : 1 colonne mobile, 2 sur tablette, 3 sur desktop
      gap-px bg-border → séparateurs fins entre les cartes (même astuce que les projets)
    -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">

      <div
        v-for="(service, i) in services"
        :key="i"
        class="reveal bg-surface p-8 group hover:bg-bg transition-colors duration-300"
      >
        <!--
          Numéro du service
          String.padStart(2, '0') → transforme 1 en "01", 2 en "02", etc.
        -->
        <div class="font-display text-[0.65rem] text-muted mb-6">
          {{ String(i + 1).padStart(2, '0') }}
        </div>

        <!-- Icône SVG inline -->
        <div class="text-accent mb-6 group-hover:scale-110 transition-transform duration-300" v-html="service.icon"></div>

        <!-- Nom du service -->
        <h3 class="text-lg font-bold tracking-[-0.02em] mb-3">{{ service.name }}</h3>

        <!-- Description -->
        <p class="font-display text-[0.78rem] text-gray-400 leading-relaxed mb-6">{{ service.desc }}</p>

        <!-- Technologies associées -->
        <div class="flex flex-wrap gap-2">
          <span v-for="tech in service.techs" :key="tech"
            class="font-display text-[0.6rem] px-2 py-0.5 border border-border text-muted">
            {{ tech }}
          </span>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'

const services = [
  {
    name: 'Développement Web',
    desc: 'Création de sites(E-commerce, blogs, ...) et applications web modernes, performants et accessibles, du design à la mise en ligne.',
    techs: ['Vue.js', 'Nuxt', 'Node.js', 'Tailwind'],
    icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
    </svg>`
  },
  {
    name: 'Design UI/UX',
    desc: 'Conception d\'interfaces intuitives et esthétiques, centrées sur l\'expérience utilisateur.',
    techs: ['Figma', 'Prototypage', 'Design System'],
    icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/>
      <line x1="4.93" y1="4.93" x2="9.17" y2="9.17"/><line x1="14.83" y1="14.83" x2="19.07" y2="19.07"/>
      <line x1="14.83" y1="9.17" x2="19.07" y2="4.93"/><line x1="4.93" y1="19.07" x2="9.17" y2="14.83"/>
    </svg>`
  },
  {
    name: 'Applications Mobiles',
    desc: 'Développement d\'applications mobiles cross-platform rapides et natives.',
    techs: ['React Native', 'Expo', 'iOS', 'Android'],
    icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
      <line x1="12" y1="18" x2="12.01" y2="18"/>
    </svg>`
  },
  {
    name: 'Optimisation & Performance',
    desc: 'Audit et amélioration des performances web : vitesse de chargement, SEO technique et Core Web Vitals.',
    techs: ['Lighthouse', 'Web Vitals', 'SEO', 'Cache'],
    icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
      <polyline points="17 6 23 6 23 12"/>
    </svg>`
  },
  {
    name: 'Consulting Technique',
    desc: 'Accompagnement et conseil sur le choix des technologies, l\'architecture et les bonnes pratiques.',
    techs: ['Architecture', 'Code Review', 'Formation'],
    icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>`
  },
  {
    name: 'Déploiement',
    desc: 'Mise en production, configuration des serveurs, CI/CD et hébergement cloud.',
    techs: ['Vercel', 'Docker', 'GitHub Actions', 'VPS'],
    icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <polyline points="16 16 12 12 8 16"/>
      <line x1="12" y1="12" x2="12" y2="21"/>
      <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/>
    </svg>`
  },
  {
  name: 'Formation',
  desc: 'Accompagnement et formation des équipes ou particuliers sur les technologies web modernes.',
  techs: ['Vue.js', 'JavaScript', 'Tailwind', 'Git'],
  icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
  </svg>`
},
]

onMounted(() => {
  const observer = new IntersectionObserver(
    entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
    { threshold: 0.1 }
  )
  document.querySelectorAll('#services .reveal').forEach(el => observer.observe(el))
})
</script>