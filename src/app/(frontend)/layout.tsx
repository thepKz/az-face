import type { Metadata } from 'next'
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

export const metadata: Metadata = {
  title: { default: 'AZ FACE | Chăm chút nét riêng của bạn', template: '%s | AZ FACE' },
  description: 'Khám phá chăm sóc da, dáng mày và sắc môi cùng AZ FACE. Tìm hiểu từng lựa chọn và chuẩn bị những điều bạn muốn trao đổi.',
  robots: { index: false, follow: false },
  icons: { icon: '/brand/logo.png' },
}

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const services = (await getServices()).map(({ slug, title, summary, image }) => ({ slug, title, summary, image }))
  return <html lang="vi"><body id="top"><a className="skip-link" href="#main-content">Đến nội dung chính</a><Header services={services} /><RouteArrival /><main id="main-content">{children}</main><Footer /><SiteMotion /></body></html>
}
