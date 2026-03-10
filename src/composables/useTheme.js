import { ref, watch } from 'vue'

const isDark = ref(true) // dark par défaut

export function useTheme() {

  function applyTheme(dark) {
    const root = document.documentElement // l'élément <html>
    if (dark) {
      // Mode sombre → on retire la classe light
      root.classList.remove('light')
    } else {
      // Mode clair → on ajoute la classe light sur <html>
      root.classList.add('light')
    }
  }

  function toggleTheme() {
    isDark.value = !isDark.value
    // Sauvegarde dans localStorage → mémorise le choix de l'utilisateur
    localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
  }

  function initTheme() {
    // Récupère le thème sauvegardé, sinon utilise 'dark' par défaut
    const saved = localStorage.getItem('theme')
    isDark.value = saved ? saved === 'dark' : true
    applyTheme(isDark.value)
  }

  // watch → réagit automatiquement quand isDark change
  // et applique le thème sans qu'on ait besoin d'appeler applyTheme() manuellement
  watch(isDark, (val) => applyTheme(val))

  return { isDark, toggleTheme, initTheme }
}