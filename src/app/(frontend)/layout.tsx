import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages, getTranslations } from 'next-intl/server'
import '@fontsource-variable/lora'
import '@fontsource-variable/manrope'
import './styles.css'
import './atelier.css'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { SiteMotion } from '@/components/Motion'
import { RouteArrival } from '@/components/RouteArrival'
import { getServices } from '@/lib/cms'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const english = await getLocale() === 'en'
  return {
    title: { default: english ? 'AZ FACE | Facial aesthetics' : 'AZ FACE | Thẩm mỹ khuôn mặt', template: '%s | AZ FACE' },
    description: english ? 'Explore facial aesthetics with AZ FACE: skin, brows, lips and the questions to ask before choosing a service.' : 'Tìm hiểu thẩm mỹ khuôn mặt cùng AZ FACE: làn da, đường nét và những điều cần trao đổi trước khi lựa chọn dịch vụ.',
    robots: { index: false, follow: false },
    icons: { icon: '/brand/logo.png' },
  }
}

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const services = (await getServices()).map(({ slug, title, summary, image }) => ({ slug, title, summary, image }))
  const [locale, messages, t, requestHeaders] = await Promise.all([getLocale(), getMessages(), getTranslations('common'), headers()])
  return <html lang={locale}><body id="top"><NextIntlClientProvider locale={locale} messages={messages}><a className="skip-link" href="#main-content">{t('skip')}</a><Header services={services} currentPath={requestHeaders.get('x-az-path') ?? '/'} /><RouteArrival /><main id="main-content">{children}</main><Footer /><SiteMotion /></NextIntlClientProvider></body></html>
}
