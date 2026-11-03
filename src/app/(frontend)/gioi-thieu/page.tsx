import type { Metadata } from 'next'
import { AboutPresentation } from '@/components/AboutPresentation'

export const metadata: Metadata = { title: 'Về AZ FACE' }
export default function AboutPage() {
  return <AboutPresentation />
}
