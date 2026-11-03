import type { Metadata } from 'next'
import { getServices } from '@/lib/cms'
import { ServicesPresentation } from '@/components/ServicesPresentation'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Dịch vụ và những điều bạn cần biết' }
export default async function ServicesPage() {
  const services = await getServices()
  return <ServicesPresentation services={services} />
}
