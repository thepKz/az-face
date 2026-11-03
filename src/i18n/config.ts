export const locales = ['vi', 'en'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'vi'
export const isEnglish = (locale: string) => locale === 'en'

export function stripLocale(path: string) {
  return path.replace(/^\/(?:en|vi)(?=\/|\?|#|$)/, '') || '/'
}

export function localizePath(path: string, locale: string) {
  if (!path.startsWith('/') || path.startsWith('//')) return path
  const separator = path.search(/[?#]/)
  const pathname = separator < 0 ? path : path.slice(0, separator)
  const suffix = separator < 0 ? '' : path.slice(separator)
  const local = stripLocale(pathname).replace(/\/+$/, '') || '/'
  return (locale === 'en' ? `/en${local === '/' ? '' : local}` : local) + suffix
}
