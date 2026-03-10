<template>
  <section id="projets" class="px-8 md:px-16 py-32">
    <div class="section-label flex items-center gap-3 font-mono text-[0.7rem] text-accent tracking-[0.15em] mb-4">02 — TRAVAUX</div>
    <h2 class="text-[clamp(2.2rem,4vw,3.5rem)] font-extrabold tracking-[-0.03em] leading-none mb-16">Projets<br>sélectionnés.</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border">

      <!-- Carte featured : md:col-span-2 = occupe les 2 colonnes -->
      <div class="project-card md:col-span-2 grid md:grid-cols-2 gap-16 bg-bg p-10 reveal group hover:bg-[#0d0d0d] transition-colors cursor-pointer items-center">
        <div>
          <div class="font-display text-[0.65rem] text-muted mb-8">— 001</div>
          <div class="inline-block font-display text-[0.65rem] border border-border text-muted px-2 py-0.5 mb-5">APPLICATION WEB</div>
          <div class="text-2xl font-bold tracking-[-0.02em] mb-3">{{ projects[0].name }}</div>
          <p class="font-display text-[0.78rem] text-muted leading-relaxed mb-8">{{ projects[0].desc }}</p>
          <div class="flex justify-between items-center">
            <div class="flex gap-2 flex-wrap">
              <!-- v-for → boucle sur le tableau stack -->
              <span v-for="t in projects[0].stack" :key="t"
                class="font-display text-[0.6rem] px-2 py-0.5 bg-surface text-muted rounded-[2px]">{{ t }}</span>
            </div>
            <span class="project-arrow text-xl text-muted">↗</span>
          </div>
        </div>
        <!-- ref="canvasRef" → template ref : Vue remplit cette variable avec l'élément DOM -->
        <div class="aspect-video bg-surface border border-border overflow-hidden">
          <canvas ref="canvasRef" class="w-full h-full" width="480" height="270"></canvas>
        </div>
      </div>

      <!-- projects.slice(1) → tous les projets sauf le premier -->
      <div v-for="(p, i) in projects.slice(1)" :key="i"
        class="project-card bg-bg p-10 reveal group hover:bg-[#0d0d0d] transition-colors cursor-pointer">
        <div class="font-display text-[0.65rem] text-muted mb-8">— 00{{ i + 2 }}</div>
        <div class="inline-block font-display text-[0.65rem] border border-border text-muted px-2 py-0.5 mb-5">{{ p.type }}</div>
        <div class="text-xl font-bold tracking-[-0.02em] mb-3">{{ p.name }}</div>
        <p class="font-display text-[0.78rem] text-muted leading-relaxed mb-8">{{ p.desc }}</p>
        <div class="flex justify-between items-center">
          <div class="flex gap-2 flex-wrap">
            <span v-for="t in p.stack" :key="t"
              class="font-display text-[0.6rem] px-2 py-0.5 bg-surface text-muted rounded-[2px]">{{ t }}</span>
          </div>
          <span class="project-arrow text-xl text-muted">↗</span>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const canvasRef = ref(null) // template ref → pointe vers le <canvas> dans le DOM

const projects = ref([
  { name: 'DashFlow Analytics', desc: 'Tableau de bord temps réel pour visualiser des métriques complexes avec Vue 3 et WebSockets.', stack: ['Vue 3', 'Node.js', 'WebSocket', 'D3.js'], type: 'APPLICATION WEB' },
  { name: 'ShopWave',    desc: 'Plateforme e-commerce fullstack avec panier, paiement Stripe et dashboard admin.', stack: ['Nuxt.js', 'Stripe', 'MongoDB'], type: 'E-COMMERCE' },
  { name: 'Motiontype',  desc: 'Éditeur de typographie animée en ligne. Export SVG et CSS automatique.', stack: ['Vue', 'Canvas API', 'GSAP'], type: 'OUTIL CRÉATIF' },
  { name: 'TaskWeave',   desc: 'Application de gestion de projet collaborative avec kanban et notifications push.', stack: ['Vue 3', 'Pinia', 'Firebase'], type: 'PRODUCTIVITÉ' },
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