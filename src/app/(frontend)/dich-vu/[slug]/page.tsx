import { pageText } from '@/i18n/page-messages'
import { getLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getServices } from '@/lib/cms'
import { ServiceDetailPresentation } from '@/components/ServicesPresentation'

export const dynamic = 'force-dynamic'
type Props = { params: Promise<{ slug: string }> }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await getLocale()
  const t = pageText(locale)

  const { slug } = await params
  const service = (await getServices()).find(item => item.slug === slug)
  return { title: service?.title || t("Không tìm thấy dịch vụ"), description: service?.summary }
}
export default async function ServicePage({ params }: Props) {

  const { slug } = await params
  const service = (await getServices()).find(item => item.slug === slug)
  if (!service) notFound()
  return <ServiceDetailPresentation service={service} />
}
