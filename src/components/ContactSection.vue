<template>
  <section id="contact" class="px-8 md:px-16 py-32">
    <div class="section-label flex items-center gap-3 font-mono text-[0.7rem] text-accent tracking-[0.15em] mb-4">04 — CONTACT</div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-24 items-start">
      <div class="reveal">
        <div class="text-[clamp(2rem,4vw,3.2rem)] font-extrabold tracking-[-0.03em] leading-[1.1] mb-6">
          Travaillons<br>ensemble <span class="text-accent">→</span>
        </div>
        <p class="font-display text-[0.8rem] text-gray-400 leading-[1.8] max-w-xs">Disponible pour des missions freelance ou des opportunités full-time.</p>
        <div class="flex flex-col mt-8">
        <a v-for="link in socialLinks"
          :key="link.label"
          :href="link.href"
          :target="link.href.startsWith('mailto') ? '_self' : '_blank'"
          rel="noopener noreferrer"
          class="flex items-center gap-4 font-display text-[0.8rem] text-gray-400 py-3 border-b border-border hover:text-accent hover:pl-2 transition-all duration-200"
        >
          ↗ {{ link.label }}
        </a>
          
        </div>
      </div>

      <div class="flex flex-col gap-6 reveal">
        <div class="flex flex-col gap-2" v-for="field in fields" :key="field.model">
          <label class="font-mono text-[0.65rem] tracking-[0.1em] text-light">{{ field.label }}</label>
          <!-- v-if/v-else → textarea ou input selon le type du champ -->
          <textarea v-if="field.type === 'textarea'" v-model="form[field.model]"
            :placeholder="field.placeholder" rows="4"
            class="form-input bg-transparent border-0 border-b border-border text-light font-display text-base py-3 focus:border-accent focus:outline-none transition-colors w-full resize-none">
          </textarea>
          <input v-else v-model="form[field.model]" :placeholder="field.placeholder"
            class="form-input bg-transparent border-0 border-b border-border text-light font-display text-base py-3 focus:border-accent focus:outline-none transition-colors w-full" />
        </div>

        <!-- @click="sendMsg" → écoute le clic, appelle sendMsg() -->
        <p v-if="error" class="font-mono text-xs text-red-400">{{ error }}</p>
        <button
          @click="sendMsg"
          :disabled="loading"
          class="mt-2 self-start inline-flex items-center gap-4 bg-accent text-bg font-bold text-sm px-8 py-4 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0_#3df5c1] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span v-if="loading">Envoi en cours...</span>
          <span v-else-if="sent">✓ Message envoyé !</span>
          <span v-else>Envoyer <span>↗</span></span>
      </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import emailjs from '@emailjs/browser'
import { ref, reactive, onMounted } from 'vue'

const sent = ref(false)
const error = ref('')
const loading = ref(false)
// reactive() → pour un objet, plus pratique que 3 ref() séparés
const form = reactive({ name: '', email: '', message: '' })

const fields = [
  { label: 'NOM',    model: 'name',    type: 'text',     placeholder: 'Jean Dupont' },
  { label: 'EMAIL',  model: 'email',   type: 'email',    placeholder: 'jean@exemple.com' },
  { label: 'PROJET', model: 'message', type: 'textarea', placeholder: 'Décrivez votre projet...' },
]
const socialLinks = [
  { label: 'GitHub',                href: 'https://github.com/ADJALALA' },
  { label: 'LinkedIn',              href: 'https://linkedin.com/in/Kevin Ebenior ADJALALA' },
  { label: 'hello@monportfolio.dev', href: 'mailto:ebenioradjalala@gmail.com' },
  { label: 'Whatsapp',              href: 'https://wa.me/2290190187561' },
]

// function sendMsg() {
//   if (form.name && form.email) sent.value = true
// }
async function sendMsg() {
  // Vérifie que les champs sont remplis
  if (!form.name || !form.email || !form.message) {
    error.value = 'Merci de remplir tous les champs.'
    return
  }

  loading.value = true
  error.value   = ''

  try {
    await emailjs.send(
      'service_pr4vo9e',   
      'template_7ord8jh',  
      {
        from_name:  form.name,
        from_email: form.email,
        message:    form.message,
      },
      '0PqFOoEpuGUu_i1xw'  
    )

    sent.value = true
    // Réinitialise le formulaire
    form.name    = ''
    form.email   = ''
    form.message = ''

  } catch (e) {
    error.value = 'Erreur lors de l\'envoi. Réessaie plus tard.'
    console.error(e)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  const observer = new IntersectionObserver(
    entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
    { threshold: 0.15 }
  )
  document.querySelectorAll('#contact .reveal').forEach(el => observer.observe(el))
})
</script>