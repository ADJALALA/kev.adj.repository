<template>
  <section id="projets" class="px-8 md:px-16 py-32">
    <div class="section-label flex items-center gap-3 font-mono text-[0.7rem] text-accent tracking-[0.15em] mb-4">02 — TRAVAUX</div>
    <h2 class="text-[clamp(2.2rem,4vw,3.5rem)] font-extrabold tracking-[-0.03em] leading-none mb-16">Projets<br>sélectionnés.</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border">
      <!-- Carte featured : md:col-span-2 = occupe les 2 colonnes -->
      <div class="project-card md:col-span-2 grid md:grid-cols-2 gap-16 bg-bg p-10 reveal group hover:bg-[#0d0d0d] transition-colors cursor-pointer items-center">
        <div class="project-card md:col-span-2 grid md:grid-cols-2 gap-16 bg-bg p-10 reveal group hover:bg-[#0d0d0d] transition-colors cursor-pointer items-center">
  
          <!-- Colonne gauche : texte + boutons uniquement -->
          <div>
            <div class="font-display text-[0.65rem] text-muted mb-8">— 001</div>
            <div class="inline-block font-display text-[0.65rem] border border-border text-gray-500 px-2 py-0.5 mb-5">APPLICATION WEB</div>
            <div class="text-2xl font-bold tracking-[-0.02em] mb-3">{{ projects[0].name }}</div>
            <p class="font-display text-[0.78rem] text-gray-400 leading-relaxed mb-8">{{ projects[0].desc }}</p>
            <div class="flex gap-2 flex-wrap mb-6">
              <span v-for="t in projects[0].stack" :key="t"
                class="font-display text-[0.6rem] px-2 py-0.5 bg-surface text-muted rounded-[2px]">{{ t }}</span>
            </div>
            <!-- ✅ projects[0].demo et projects[0].github -->
            <div class="flex gap-2">
              <a v-if="projects[0].demo" :href="projects[0].demo" target="_blank"
                class="inline-flex items-center gap-1 bg-accent text-bg font-bold font-mono text-[0.65rem] px-3 py-1.5 hover:opacity-80 transition-opacity">
                ↗ Démo
              </a>
              <a v-if="projects[0].github" :href="projects[0].github" target="_blank"
                class="inline-flex items-center gap-1 border border-border text-muted font-mono text-[0.65rem] px-3 py-1.5 hover:border-accent hover:text-accent transition-all">
                ⌥ GitHub
              </a>
            </div>
          </div>
          <!-- Colonne droite : image ou canvas -->
          <div class="aspect-video bg-surface border border-border overflow-hidden">
            <img
              v-if="projects[0].image"
              :src="projects[0].image"
              :alt="projects[0].name"
              class="w-full h-full object-cover group-hover:scale-150 transition-transform duration-500"
            />
            <canvas v-else ref="canvasRef" class="w-full h-full" width="480" height="270"></canvas>
          </div>

        </div>
        <!-- ref="canvasRef" → template ref : Vue remplit cette variable avec l'élément DOM -->
        <div class="hidden md:block aspect-video bg-surface border border-border overflow-hidden">
          <canvas ref="canvasRef" class="w-full h-full" width="480" height="270"></canvas>
        </div>
      </div>
      <!-- AUTRES CARTES -->
      <div v-for="(p, i) in projects.slice(1)" :key="i"
        class="project-card bg-bg p-10 reveal group hover:bg-[#0d0d0d] transition-colors cursor-pointer">

        <!-- Image en haut de la carte -->
        <div v-if="p.image" class="aspect-video bg-surface border border-border overflow-hidden mb-6">
          <img :src="p.image" :alt="p.name"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        </div>

        <div class="font-mono text-[0.65rem] text-muted mb-4">— 00{{ i + 2 }}</div>
        <div class="inline-block font-mono text-[0.65rem] border border-border text-gray-500 px-2 py-0.5 mb-4">{{ p.type }}</div>
        <div class="text-xl font-bold tracking-[-0.02em] mb-3">{{ p.name }}</div>
        <p class="font-display text-[0.85rem] text-gray-400 leading-relaxed mb-6">{{ p.desc }}</p>
        <div class="flex gap-2 flex-wrap mb-6">
          <span v-for="t in p.stack" :key="t"
            class="font-mono text-[0.6rem] px-2 py-0.5 bg-surface text-muted rounded-[2px]">{{ t }}</span>
        </div>

        <!-- Liens démo + github -->
        <div class="flex flex-wrap gap-2 mt-4">
          <a v-if="p.demo" :href="p.demo" target="_blank"
            class="inline-flex items-center gap-1 bg-accent text-bg font-bold font-mono text-[0.65rem] px-3 py-1.5 hover:opacity-80 transition-opacity">
            ↗ Démo
          </a>
          <a v-if="p.github" :href="p.github" target="_blank"
            class="inline-flex items-center gap-1 border border-border text-muted font-mono text-[0.65rem] px-3 py-1.5 hover:border-accent hover:text-accent transition-all">
            ⌥ GitHub
          </a>
        </div>
      </div>


    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const canvasRef = ref(null) // template ref → pointe vers le <canvas> dans le DOM

// const projects = ref([
//   { name: 'DashFlow Analytics', desc: 'Tableau de bord temps réel pour visualiser des métriques complexes avec Vue 3 et WebSockets.', stack: ['Vue 3', 'Node.js', 'WebSocket', 'D3.js'], type: 'APPLICATION WEB' },
//   { name: 'ShopWave',    desc: 'Plateforme e-commerce fullstack avec panier, paiement Stripe et dashboard admin.', stack: ['Nuxt.js', 'Stripe', 'MongoDB'], type: 'E-COMMERCE' },
//   { name: 'Motiontype',  desc: 'Éditeur de typographie animée en ligne. Export SVG et CSS automatique.', stack: ['Vue', 'Canvas API', 'GSAP'], type: 'OUTIL CRÉATIF' },
//   { name: 'TaskWeave',   desc: 'Application de gestion de projet collaborative avec kanban et notifications push.', stack: ['Vue 3', 'Pinia', 'Firebase'], type: 'PRODUCTIVITÉ' },
// ])
const projects = ref([
  {
    name: 'THS',
    desc: 'Application de gestion interne et suivis des stocks, des ventes, des utilisateurs avec differents niveaux d acces pour un mini-depot SOBEBRA.',
    stack: ['Laravel', 'Node.js', 'Mysql',],
    type: 'APPLICATION WEB',
    image: '/projects/ths.jpeg',   // ← image dans public/projects/
    demo: 'https://ton-demo.vercel.app',
    github: 'https://github.com/toi/dashflow',
  },
  {
    name: 'ShopWave',
    desc: 'Plateforme e-commerce fullstack avec panier, paiement Stripe et dashboard admin.',
    stack: ['Nuxt.js', 'Stripe', 'MongoDB'],
    type: 'E-COMMERCE',
    image: '/projects/ths.jpe',
    demo: 'https://ton-demo.vercel.app',
    github: 'https://github.com/toi/shopwave',
  },
  {
    name: 'Motiontype',
    desc: 'Éditeur de typographie animée en ligne. Export SVG et CSS automatique.',
    stack: ['Vue', 'Canvas API', 'GSAP'],
    type: 'OUTIL CRÉATIF',
    image: '/projects/motiontype.png',
    demo: 'https://ton-demo.vercel.app',
    github: null, // null = pas de lien github pour ce projet
  },
  {
    name: 'TaskWeave',
    desc: 'Application de gestion de projet collaborative avec kanban et notifications push.',
    stack: ['Vue 3', 'Pinia', 'Firebase'],
    type: 'PRODUCTIVITÉ',
    image: '/projects/taskweave.png',
    demo: null,
    github: 'https://github.com/toi/taskweave',
  },
])

function initCanvas() {
  const canvas = canvasRef.value // .value pour accéder à la valeur du ref
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  const W = canvas.width, H = canvas.height
  const nodes = Array.from({ length: 24 }, () => ({
    x: Math.random() * W, y: Math.random() * H,
    vx: (Math.random() - 0.5) * 0.6, vy: (Math.random() - 0.5) * 0.6,
    r: Math.random() * 2 + 1
  }))
  function draw() {
    ctx.fillStyle = '#101010'
    ctx.fillRect(0, 0, W, H)
    nodes.forEach(n => {
      n.x += n.vx; n.y += n.vy
      if (n.x < 0 || n.x > W) n.vx *= -1
      if (n.y < 0 || n.y > H) n.vy *= -1
    })
    nodes.forEach((a, i) => {
      nodes.forEach((b, j) => {
        if (j <= i) return
        const d = Math.hypot(a.x - b.x, a.y - b.y)
        if (d < 100) {
          ctx.beginPath()
          ctx.strokeStyle = `rgba(200,241,53,${(1 - d / 100) * 0.4})`
          ctx.lineWidth = 0.5
          ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y)
          ctx.stroke()
        }
      })
      ctx.beginPath()
      ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2)
      ctx.fillStyle = '#c8f135'
      ctx.fill()
    })
    requestAnimationFrame(draw)
  }
  draw()
}

onMounted(() => {
  initCanvas()
  const observer = new IntersectionObserver(
    entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
    { threshold: 0.15 }
  )
  document.querySelectorAll('#projets .reveal').forEach(el => observer.observe(el))
})
</script>

