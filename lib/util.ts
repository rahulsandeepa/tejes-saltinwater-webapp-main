// Remove trailing and leading slash, usually included in nodes
export const getSlug = (path: string) => path.replace(/^\/|\/$/g, '')

export const formatAsMoney = (amount: number = 0, currency = 'USD') =>
  new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    style: 'currency',
    currency,
  }).format(amount)

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export const themeStorageKey = 'siw-theme'

export const getTheme = (): string => {
  if (typeof window === 'undefined') return 'light'
  return localStorage.getItem(themeStorageKey) || 'light'
}

export const setLightMode = (): void => {
  try {
    localStorage.setItem(themeStorageKey, 'light')
    document.documentElement.classList.remove('dark')
  } catch (err) {
    console.error(err)
  }
}

export const setDarkMode = (): void => {
  try {
    localStorage.setItem(themeStorageKey, 'dark')
    document.documentElement.classList.add('dark')
  } catch (err) {
    console.error(err)
  }
}
