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
  title: { default: 'AZ FACE | Thẩm mỹ khuôn mặt', template: '%s | AZ FACE' },
  description: 'Tìm hiểu thẩm mỹ khuôn mặt cùng AZ FACE: làn da, đường nét và những điều cần trao đổi trước khi lựa chọn dịch vụ.',
  robots: { index: false, follow: false },
  icons: { icon: '/brand/logo.png' },
}

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const services = (await getServices()).map(({ slug, title, summary, image }) => ({ slug, title, summary, image }))
  return <html lang="vi"><body id="top"><a className="skip-link" href="#main-content">Đến nội dung chính</a><Header services={services} /><RouteArrival /><main id="main-content">{children}</main><Footer /><SiteMotion /></body></html>
}
