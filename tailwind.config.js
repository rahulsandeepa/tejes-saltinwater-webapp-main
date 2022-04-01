const colors = require('tailwindcss/colors')
const defaultTheme = require('tailwindcss/defaultTheme')

function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}), ${opacityValue})`
    }
    return `rgba(var(${variableName}))`
  }
}

const themes = {
  skin: {
    white: withOpacity('--color-white'),
    black: withOpacity('--color-black'),
    'primary-thick': 'var(--color-background-thick)',
    primary: 'var(--color-background)',
    'primary-muted': 'var(--color-background-muted)',
    light: 'var(--color-light)',
    secondary: 'var(--color-text)',
    'secondary-muted': 'var(--color-text-muted)',
    'secondary-hover': 'var(--color-text-hover)',
    'accent-light': 'var(--color-accent-light)',
    accent: 'var(--color-accent)',
    'accent-hover': 'var(--color-accent-hover)',
    'accent-thick': 'var(--color-accent-thick)',
    error: 'var(--color-error)',
    selection: 'var(--color-selection)',
  },
}

module.exports = {
  future: {
    purgeLayersByDefault: true,
    applyComplexClasses: true,
  },
  purge: {
    content: [
      './pages/**/*.{js,ts,jsx,tsx}',
      './components/**/*.{js,ts,jsx,tsx}',
    ],
    options: {
      safelist: {
        standard: ['outline-none'],
      },
    },
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: themes,
    extend: {
      maxWidth: {
        '8xl': '1920px',
      },
      minWidth: {
        '1/2': '50%',
      },
      height: {
        120: '30rem',
        144: '36rem',
      },
      weight: {
        120: '30rem',
        'slide-sm': '900px',
        'slide-lg': '3200px',
      },
      fontFamily: {
        exo: ["'Exo', sans-serif", ...defaultTheme.fontFamily.sans],
        neuton: ["'Neuton', serif", ...defaultTheme.fontFamily.sans],
        quattro: [
          "'Quattrocento Sans', serif",
          ...defaultTheme.fontFamily.sans,
        ],
      },
      backgroundImage: {
        banner:
          'linear-gradient(142deg, rgba(250, 250, 250, 0.05) 0%, rgba(250, 250, 250, 0.05) 53%,rgba(64, 64, 64, 0.05) 53%, rgba(64, 64, 64, 0.05) 100%),linear-gradient(29deg, rgba(10, 10, 10, 0.05) 0%, rgba(10, 10, 10, 0.05) 27%,rgba(94, 94, 94, 0.05) 27%, rgba(94, 94, 94, 0.05) 100%),linear-gradient(118deg, rgba(4, 4, 4, 0.05) 0%, rgba(4, 4, 4, 0.05) 18%,rgba(188, 188, 188, 0.05) 18%, rgba(188, 188, 188, 0.05) 100%),linear-gradient(90deg, var(--tw-gradient-stops))',
      },
      gridAutoRows: {
        '1fr': '1fr',
      },
      boxShadow: {
        '3xl':
          '0 30px 60px -10px rgb(0 0 0 / 22%), 0 18px 36px -18px rgb(0 0 0 / 25%)',
        header: 'var(--header-shadow)',
      },
      lineHeight: {
        'extra-loose': '2.2',
      },
      scale: {
        120: '1.2',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
