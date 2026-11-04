import { CollageArt } from '@/components/CollageArt'
import { pageText } from '@/i18n/page-messages'
import { useLocale } from 'next-intl'
import { getLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import { CollectionGallery } from '@/components/CollectionGallery'
import { Consultation } from '@/components/Consultation'
import '@/components/JourneyPages.css'

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  const t = pageText(locale)
 return { title: t("Bộ sưu tập") } }

export default function CollectionPage() {
  const locale = useLocale()
  const t = pageText(locale)

  return <div className="collection-page"><div className="collection-intro collage-host"><CollageArt variant="bloom" /><div className="collection-intro__copy"><h1>{t("Nét đẹp trong từng chi tiết.")}</h1><p>{t("Làn da, ánh sáng và những đường nét rất riêng. Khám phá bộ ảnh theo điều bạn yêu thích.")}</p></div><div className="collection-intro__composition" aria-hidden="true"><img src="/images/brand-personal-kbeauty.webp" width="1200" height="1500" alt="" /><img src="/images/brand-choice-kbeauty.webp" width="1200" height="1500" alt="" /></div></div><CollectionGallery /><Consultation /></div>
}
