import Link from '@/i18n/Link'
import { getLocale } from 'next-intl/server'
import { homeFAQs } from '@/content/site'
import { homeFAQs as homeFAQsEn } from '@/content/site.en'
import { getPublishedPosts, getServices } from '@/lib/cms'
import { ImmersiveHero } from '@/components/ImmersiveHero'
import { ImmersiveServices } from '@/components/ImmersiveServices'
import { ImmersiveJourney } from '@/components/ImmersiveJourney'
import { ImmersiveEditorial } from '@/components/ImmersiveEditorial'
import { CinemaBridge } from '@/components/CinemaBridge'
import { ArrowIcon } from '@/components/Icons'
import { FAQ } from '@/components/FAQ'
import './home-story.css'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const en = (await getLocale()) === 'en'
  const [posts, services] = await Promise.all([getPublishedPosts(), getServices()])
  return <div className="cinema-home">
    <ImmersiveHero />
    <CinemaBridge text={en ? 'Skin. Features. Expression.' : 'Làn da. Đường nét. Biểu cảm.'} />
    <ImmersiveServices services={services} />
    <ImmersiveJourney />
    <ImmersiveEditorial posts={posts.slice(0, 3)} />
    <section className="cinema-questions"><div className="cinema-questions__intro"><h2>{en ? 'Let’s make it clear.' : 'Cùng làm rõ nhé.'}</h2><p>{en ? 'You do not need to know every service. Start with what you are curious about, or the feature you would like to care for.' : 'Bạn không cần biết hết mọi dịch vụ. Bắt đầu từ điều còn băn khoăn, hoặc nét riêng bạn muốn chăm chút.'}</p><Link href="/lien-he" className="cinema-cta">{en ? 'Ask your question' : 'Trao đổi câu hỏi'} <span><ArrowIcon /></span></Link></div><div className="cinema-questions__answers"><FAQ items={en ? homeFAQsEn : homeFAQs} /></div></section>
  </div>
}
