import Link from '@/i18n/Link'
import { useLocale } from 'next-intl'
import { ArrowIcon } from './Icons'

export type ArticleCardData = { slug: string; title: string; excerpt: string; image: string; imageAlt: string; category: string; readTime: string | number }

export function ArticleCard({ post, featured = false }: { post: ArticleCardData; featured?: boolean }) {
  const en = useLocale() === 'en'
  return <article className={`article-card${featured ? ' article-card-featured' : ''}`} data-reveal>
    <Link href={`/kien-thuc/${post.slug}`} className="article-image-link" tabIndex={-1} aria-hidden="true"><img src={post.image} alt="" width="720" height="500" loading="lazy" /></Link>
    <div className="article-card-body"><div className="article-meta"><span>{post.category}</span><span>{post.readTime}{typeof post.readTime === 'number' ? (en ? ' min read' : ' phút đọc') : ''}</span></div><h3><Link href={`/kien-thuc/${post.slug}`}>{post.title}</Link></h3>{featured && <p>{post.excerpt}</p>}<Link href={`/kien-thuc/${post.slug}`} className="text-link" aria-label={`${en ? 'Read article' : 'Đọc bài'}: ${post.title}`}>{en ? 'Read article' : 'Đọc bài viết'} <ArrowIcon /></Link></div>
  </article>
}
