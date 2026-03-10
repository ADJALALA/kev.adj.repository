export default {
  // Tailwind scanne ces fichiers pour détecter les classes utilisées.
  // En production, il supprime toutes les classes non utilisées → CSS léger.
  content: [
    './index.html',
    './src/**/*.{vue,js}',
  ],
  theme: {
    extend: {
      // Nos couleurs custom → utilisables via bg-accent, text-muted, etc.
      colors: {
        bg:      '#080808',
        surface: '#101010',
        border:  '#1e1e1e',
        accent:  '#c8f135',
        accent2: '#3df5c1',
        muted:   '#555555',
        light:   '#f0f0ec',
      },
      // Nos polices custom → utilisables via font-display, font-mono
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        mono:    ['DM Mono', 'monospace'],
      },
      // Animations custom → utilisables via animate-slideUp, etc.
      keyframes: {
        slideUp: {
          '0%':   { transform: 'translateY(110%)', opacity: '0' },
          '100%': { transform: 'translateY(0)',    opacity: '1' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scrollPulse: {
          '0%, 100%': { transform: 'scaleY(1)',   opacity: '1' },
          '50%':      { transform: 'scaleY(0.4)', opacity: '0.4' },
        },
      },
      animation: {
        'slideUp':     'slideUp 0.9s cubic-bezier(0.16,1,0.3,1) both',
        'slideUp-d1':  'slideUp 0.9s 0.1s cubic-bezier(0.16,1,0.3,1) both',
        'slideUp-d2':  'slideUp 0.9s 0.2s cubic-bezier(0.16,1,0.3,1) both',
        'fadeIn':      'fadeIn 1s 0.5s both',
        'scrollPulse': 'scrollPulse 2s ease-in-out infinite',
      },
    },
  },
}