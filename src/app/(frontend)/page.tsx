import Link from 'next/link'
import { homeFAQs } from '@/content/site'
import { getPublishedPosts, getServices } from '@/lib/cms'
import { AtelierHero } from '@/components/AtelierHero'
import { ServicePortraits } from '@/components/ServicePortraits'
import { BeautyGallery } from '@/components/BeautyGallery'
import { RitualJourney } from '@/components/RitualJourney'
import { ArrowIcon } from '@/components/Icons'
import { FAQ } from '@/components/FAQ'
import { Consultation } from '@/components/Consultation'
import { ArticleCard } from '@/components/ArticleCard'
import { SectionBridge } from '@/components/SectionBridge'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const [posts, services] = await Promise.all([getPublishedPosts(), getServices()])
  return <div className="atelier-home">
    <AtelierHero />
    <div className="atelier-note page-width"><span className="atelier-note__mark" aria-hidden="true"><img src="/brand/logo.svg" alt="" width="68" height="62" /></span><p>Vẻ đẹp không cần một khuôn mẫu.</p><Link href="/gioi-thieu" className="text-link">Tinh thần AZ FACE <ArrowIcon /></Link></div>
    <ServicePortraits services={services} />
    <SectionBridge tone="sage" />
    <div id="bo-suu-tap"><BeautyGallery /></div>
    <SectionBridge tone="forest" />
    <RitualJourney />
    <section className="atelier-space" aria-labelledby="space-title">
      <div className="atelier-space__image" data-space-image><img src="/images/atmosphere.webp" alt="Không gian thư giãn giả lập với ánh sáng tự nhiên" width="1440" height="960" loading="lazy" /></div>
      <div className="atelier-space__title"><h2 id="space-title">Một khoảng <em>bình yên.</em></h2><Link href="/gioi-thieu" className="text-link">Về AZ FACE <ArrowIcon /></Link></div>
    </section>
    <section className="atelier-journal page-width"><div className="atelier-section-title"><h2>Đọc để <em>hiểu thêm.</em></h2><Link href="/kien-thuc" className="text-link">Khám phá kiến thức <ArrowIcon /></Link></div><div className="atelier-journal__grid">{posts.slice(0, 3).map(post => <ArticleCard key={post.slug} post={post} />)}</div></section>
    <section className="atelier-questions page-width"><div className="atelier-questions__art"><h2>Câu hỏi <em>thường gặp.</em></h2></div><div className="atelier-questions__answers"><FAQ items={homeFAQs.slice(0, 3)} /><Link href="/lien-he" className="button button-dark">Trao đổi câu hỏi của bạn <ArrowIcon /></Link></div></section>
    <Consultation />
  </div>
}
