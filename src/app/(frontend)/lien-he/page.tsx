import { pageText } from '@/i18n/page-messages'
import { getLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import { ContactPresentation } from '@/components/ContactPresentation'
import { getServices } from '@/lib/cms'

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  const t = pageText(locale)
 return { title: t("Trao đổi nhu cầu") } }
export default async function ContactPage({ searchParams }: { searchParams: Promise<{ 'nhu-cau'?: string }> }) {

  const services = await getServices()
  const query = await searchParams
  return <ContactPresentation services={services} initialService={typeof query['nhu-cau'] === 'string' ? query['nhu-cau'] : ''} />
}
