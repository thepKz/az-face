import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound, permanentRedirect } from 'next/navigation'
import { resolvePostRedirect } from '@/lib/cms'
import { getPostForPage } from '@/lib/cms-preview'
import { RichText } from '@payloadcms/richtext-lexical/react'
export const dynamic = 'force-dynamic'
import { ArrowIcon } from '@/components/Icons'
import { JournalMotion } from '@/components/JournalMotion'
import '@/components/editorial-journal.css'

type Props = { params: Promise<{ slug: string }> }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostForPage(slug)
  if (!post) {
    const destination = await resolvePostRedirect(slug)
    if (destination) permanentRedirect('/kien-thuc/' + destination)
  }
  return { title: post?.title || 'Không tìm thấy bài viết', description: post?.excerpt }
}
export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const post = await getPostForPage(slug)
  if (!post) {
    const destination = await resolvePostRedirect(slug)
    if (destination) permanentRedirect('/kien-thuc/' + destination)
  }
  if (!post) notFound()
  return <><JournalMotion key={post.slug} className="ej-article"><article><div className="ej-shell"><nav className="ej-breadcrumb" aria-label="Đường dẫn"><Link href="/">Trang chủ</Link><span aria-hidden="true">/</span><Link href="/kien-thuc">Kiến thức</Link><span aria-hidden="true">/</span><span>{post.category}</span></nav><header className="ej-article-heading" data-journal-arrival><h1>{post.title}</h1><div className="ej-meta"><span>{post.author}</span><time dateTime={post.publishedAt}>{new Date(post.publishedAt).toLocaleDateString('vi-VN', { timeZone: 'Asia/Bangkok' })}</time><span>{post.readTime}</span></div><p>{post.excerpt}</p></header></div><figure className="ej-article-cover" data-journal-reveal data-journal-parallax><img src={post.image} alt={post.imageAlt} width="1400" height="900" fetchPriority="high" /></figure><div className="ej-reading-layout"><aside className="ej-reading-side"><p>{post.category} · {post.readTime}</p><Link href="/kien-thuc" className="ej-read-link">Trở lại Kiến thức<ArrowIcon /></Link></aside><div className="ej-reading-body" data-journal-body>{post.body ? <RichText data={post.body} /> : post.sections.map(section => <section key={section.heading}><h2>{section.heading}</h2>{section.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}{section.list && <ul>{section.list.map(item => <li key={item}>{item}</li>)}</ul>}</section>)}</div></div></article><div className="ej-reading-progress" data-journal-progress aria-hidden="true" /><section className="ej-article-after"><figure data-journal-reveal><img src="/images/journey-journal-detail.webp" alt="" width="1000" height="900" loading="lazy" /></figure><div><h2>Giữ lại câu hỏi.<em> Bắt đầu cuộc trao đổi.</em></h2><p>Điều bạn còn băn khoăn là một điểm bắt đầu tốt. Chuẩn bị nội dung theo nhu cầu của riêng mình.</p><Link href="/lien-he" className="ej-read-link">Trao đổi nhu cầu<ArrowIcon /></Link></div></section></JournalMotion></>
}
