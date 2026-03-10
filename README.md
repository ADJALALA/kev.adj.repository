# MyPortfolio

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
<!--
        3 lignes du hamburger.
        Quand menuOpen=true :
        - ligne 1 → pivote 45° et se déplace
        - ligne 2 → disparaît (opacity-0)
        - ligne 3 → pivote -45° et se déplace
        Résultat : les 3 lignes forment un X
      -->

<!--
    MENU MOBILE — panneau qui s'ouvre en dessous de la nav
    v-if="menuOpen" → n'existe dans le DOM que si menuOpen=true
    md:hidden → masqué sur desktop même si menuOpen=true

    Transitions Vue :
    <Transition> applique des classes CSS pendant l'entrée/sortie du DOM
    enter-from  → état initial (invisible, décalé vers le haut)
    enter-to    → état final (visible, en place)
    leave-from  → état avant la sortie
    leave-to    → état final de sortie
  -->

  # 1. Installer les dépendances
npm install

# 2. Lancer le serveur de développement
npm run dev
# → http://localhost:5173

# 3. Build pour la production
npm run build
# → génère le dossier /dist prêt à déployer

# 4. Prévisualiser le build
npm run preview
# Option 1 : via CLI
npm install -g vercel
vercel

# Option 2 : connecter le repo GitHub sur vercel.com
# Vercel détecte Vite automatiquement et déploie en 1 clic