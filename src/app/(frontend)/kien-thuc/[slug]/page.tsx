import { pageText } from '@/i18n/page-messages'
import { getLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import Link from '@/i18n/Link'
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
  const locale = await getLocale()
  const t = pageText(locale)

  const { slug } = await params
  const post = await getPostForPage(slug)
  if (!post) {
    const destination = await resolvePostRedirect(slug)
    if (destination) permanentRedirect((locale === 'en' ? '/en' : '') + '/kien-thuc/' + destination)
  }
  return { title: post?.title || t("Không tìm thấy bài viết"), description: post?.excerpt }
}
export default async function ArticlePage({ params }: Props) {
  const locale = await getLocale()
  const t = pageText(locale)

  const { slug } = await params
  const post = await getPostForPage(slug)
  if (!post) {
    const destination = await resolvePostRedirect(slug)
    if (destination) permanentRedirect((locale === 'en' ? '/en' : '') + '/kien-thuc/' + destination)
  }
  if (!post) notFound()
  return <><JournalMotion key={post.slug} className="ej-article"><article><div className="ej-shell"><nav className="ej-breadcrumb" aria-label={t("Đường dẫn")}><Link href="/">{t("Trang chủ")}</Link><span aria-hidden="true">/</span><Link href="/kien-thuc">{t("Kiến thức")}</Link><span aria-hidden="true">/</span><span>{post.category}</span></nav><header className="ej-article-heading" data-journal-arrival><h1>{post.title}</h1><div className="ej-meta"><span>{post.author}</span><time dateTime={post.publishedAt}>{new Date(post.publishedAt).toLocaleDateString(locale === 'en' ? 'en-GB' : 'vi-VN', { timeZone: 'Asia/Bangkok' })}</time><span>{post.readTime}</span></div><p>{post.excerpt}</p></header></div><figure className="ej-article-cover" data-journal-reveal data-journal-parallax><img src={post.image} alt={post.imageAlt} width="1400" height="900" fetchPriority="high" /></figure><div className="ej-reading-layout"><aside className="ej-reading-side"><p>{post.category} · {post.readTime}</p><Link href="/kien-thuc" className="ej-read-link">{t("Trở lại Kiến thức")}<ArrowIcon /></Link></aside><div className="ej-reading-body" data-journal-body>{post.body ? <RichText data={post.body} /> : post.sections.map(section => <section key={section.heading}><h2>{section.heading}</h2>{section.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}{section.list && <ul>{section.list.map(item => <li key={item}>{item}</li>)}</ul>}</section>)}</div></div></article><div className="ej-reading-progress" data-journal-progress aria-hidden="true" /><section className="ej-article-after"><figure data-journal-reveal><img src="/images/journey-journal-detail.webp" alt="" width="1000" height="900" loading="lazy" /></figure><div><h2>{t("Giữ lại câu hỏi.")}<em> {t("Bắt đầu cuộc trao đổi.")}</em></h2><p>{t("Điều bạn còn băn khoăn là một điểm bắt đầu tốt. Chuẩn bị nội dung theo nhu cầu của riêng mình.")}</p><Link href="/lien-he" className="ej-read-link">{t("Trao đổi nhu cầu")}<ArrowIcon /></Link></div></section></JournalMotion></>
}
