import { pageText } from '@/i18n/page-messages'
import { getLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import { getServices } from '@/lib/cms'
import { ServicesPresentation } from '@/components/ServicesPresentation'

export const dynamic = 'force-dynamic'
export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  const t = pageText(locale)
 return { title: t("Dịch vụ và những điều bạn cần biết") } }
export default async function ServicesPage() {

  const services = await getServices()
  return <ServicesPresentation services={services} />
}
