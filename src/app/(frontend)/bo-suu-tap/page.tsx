import type { Metadata } from 'next'
import { CollectionGallery } from '@/components/CollectionGallery'
import { Consultation } from '@/components/Consultation'
import '@/components/JourneyPages.css'

export const metadata: Metadata = { title: 'Bộ sưu tập' }

export default function CollectionPage() {
  return <div className="collection-page"><div className="page-width collection-intro"><span className="journey-label">Góc nhìn AZ FACE</span><h1>Nét đẹp trong từng chi tiết.</h1><p>Làn da, ánh sáng và những đường nét rất riêng. Khám phá bộ ảnh theo điều bạn yêu thích.</p></div><CollectionGallery /><Consultation /></div>
}
