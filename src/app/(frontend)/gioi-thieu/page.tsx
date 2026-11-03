import { pageText } from '@/i18n/page-messages'
import { getLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import { AboutPresentation } from '@/components/AboutPresentation'

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  const t = pageText(locale)
 return { title: t("Về AZ FACE") } }
export default function AboutPage() {

  return <AboutPresentation />
}
