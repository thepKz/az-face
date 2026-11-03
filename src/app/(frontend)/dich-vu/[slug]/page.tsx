import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getServices } from '@/lib/cms'
import { ServiceDetailPresentation } from '@/components/ServicesPresentation'

export const dynamic = 'force-dynamic'
type Props = { params: Promise<{ slug: string }> }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const service = (await getServices()).find(item => item.slug === slug)
  return { title: service?.title || 'Không tìm thấy dịch vụ', description: service?.summary }
}
export default async function ServicePage({ params }: Props) {
  const { slug } = await params
  const service = (await getServices()).find(item => item.slug === slug)
  if (!service) notFound()
  return <ServiceDetailPresentation service={service} />
}
