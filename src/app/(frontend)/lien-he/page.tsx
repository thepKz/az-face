import type { Metadata } from 'next'
import { ContactPresentation } from '@/components/ContactPresentation'
import { getServices } from '@/lib/cms'

export const metadata: Metadata = { title: 'Trao đổi nhu cầu' }
export default async function ContactPage({ searchParams }: { searchParams: Promise<{ 'nhu-cau'?: string }> }) {
  const services = await getServices()
  const query = await searchParams
  return <ContactPresentation services={services} initialService={typeof query['nhu-cau'] === 'string' ? query['nhu-cau'] : ''} />
}
