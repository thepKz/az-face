import Link from 'next/link'
import { homeFAQs } from '@/content/site'
import { getPublishedPosts, getServices } from '@/lib/cms'
import { IdentityHero } from '@/components/IdentityHero'
import { FaceFocus } from '@/components/FaceFocus'
import { RitualJourney } from '@/components/RitualJourney'
import { ArrowIcon } from '@/components/Icons'
import { FAQ } from '@/components/FAQ'
import { ArticleCard } from '@/components/ArticleCard'
import './home-story.css'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const [posts, services] = await Promise.all([getPublishedPosts(), getServices()])
  return <div className="atelier-home">
    <IdentityHero />
    <FaceFocus services={services} />
    <RitualJourney />
    <section className="atelier-journal page-width"><div className="atelier-section-title"><h2>Đọc để <em>hiểu thêm.</em></h2><Link href="/kien-thuc" className="text-link">Khám phá kiến thức <ArrowIcon /></Link></div><div className="atelier-journal__grid">{posts.slice(0, 3).map(post => <ArticleCard key={post.slug} post={post} />)}</div></section>
    <section className="atelier-questions page-width"><div className="atelier-questions__art"><h2>Câu hỏi <em>thường gặp.</em></h2></div><div className="atelier-questions__answers"><FAQ items={homeFAQs.slice(0, 3)} /><Link href="/lien-he" className="button button-dark">Trao đổi câu hỏi của bạn <ArrowIcon /></Link></div></section>
  </div>
}
