import { pageText } from '@/i18n/page-messages'
import { useLocale } from 'next-intl'
import Link from '@/i18n/Link'
import type { PublicPost } from '@/lib/cms'
import { ArrowIcon } from './Icons'
import { CollageArt } from './CollageArt'
import { JournalMotion } from './JournalMotion'
import './editorial-journal.css'

export function EditorialJournal({ posts, page, pageCount }: { posts: PublicPost[]; page: number; pageCount: number }) {
  const locale = useLocale()
  const t = pageText(locale)

  const [featured, ...stories] = posts
  return <JournalMotion key={`journal-${page}-${featured?.slug || 'empty'}`} className="ej-index">
    <div className="ej-shell">
      <nav className="ej-breadcrumb" aria-label={t("Đường dẫn")}><Link href="/">{t("Trang chủ")}</Link><span aria-hidden="true">/</span><span>{t("Kiến thức")}</span></nav>
      <header className="ej-masthead collage-host" data-journal-arrival>
        <CollageArt variant="bloom" /><h1>{t("Hiểu thêm.")} <em>{t("Chọn rõ hơn.")}</em></h1>
        <div><p>{t("Những điều đáng đọc trước khi dành thời gian cho bản thân.")}</p><p>{t("Từ chăm sóc da đến dáng mày, sắc môi — bắt đầu bằng một câu hỏi và giữ lại điều hữu ích cho bạn.")}</p></div>
      </header>
      {featured ? <article className="ej-featured collage-host" id="bai-doc"><CollageArt variant="atelier" />
        <Link href={`/kien-thuc/${featured.slug}`} className="ej-feature-image" tabIndex={-1} aria-hidden="true" data-journal-reveal data-journal-parallax><img src={featured.image} alt="" width="1200" height="1000" fetchPriority="high" /></Link>
        <div className="ej-feature-story"><div className="ej-meta"><span>{featured.category}</span><span>{featured.readTime}</span></div><h2><Link href={`/kien-thuc/${featured.slug}`}>{featured.title}</Link></h2><p>{featured.excerpt}</p><Link href={`/kien-thuc/${featured.slug}`} className="ej-read-link">{t("Đọc câu chuyện")}<ArrowIcon /></Link></div>
      </article> : <div className="ej-empty"><h2>{t("Một khoảng chờ cho bài đọc mới.")}</h2><p>{t("Trong lúc này, bạn có thể tìm hiểu các lựa chọn chăm sóc.")}</p><Link href="/dich-vu" className="ej-read-link">{t("Khám phá dịch vụ")}<ArrowIcon /></Link></div>}
      {stories.length > 0 && <section className="ej-stories" aria-labelledby="ej-stories-title"><div className="ej-section-title"><h2 id="ej-stories-title">{t("Đọc chậm.")} <em>{t("Hiểu sâu hơn.")}</em></h2><p>{t("Mỗi bài viết là một góc nhìn để bạn tự tin đặt câu hỏi.")}</p></div><div className="ej-story-grid">{stories.map((post, index) => <article className={`ej-story ej-story--${index % 3}`} key={post.slug}><Link href={`/kien-thuc/${post.slug}`} className="ej-story-image" aria-hidden="true" tabIndex={-1}><img src={post.image} alt="" width="900" height="1100" loading="lazy" /></Link><div className="ej-meta"><span>{post.category}</span><span>{post.readTime}</span></div><h3><Link href={`/kien-thuc/${post.slug}`}>{post.title}</Link></h3><p>{post.excerpt}</p><Link href={`/kien-thuc/${post.slug}`} className="ej-read-link" aria-label={`${t('Đọc bài:')} ${post.title}`}>{t("Đọc tiếp")}<ArrowIcon /></Link></article>)}</div></section>}
      {pageCount > 1 && <nav className="ej-pagination" aria-label={t("Phân trang bài viết")}>{Array.from({ length: pageCount }, (_, index) => <Link key={index} href={`/kien-thuc?trang=${index + 1}`} aria-label={`${t('Trang')} ${index + 1}`} aria-current={page === index + 1 ? 'page' : undefined}>{String(index + 1).padStart(2, '0')}</Link>)}</nav>}
    </div>
    <section className="ej-interlude collage-host"><CollageArt variant="silk" /><div className="ej-interlude-image" data-journal-reveal data-journal-parallax><img src="/images/journey-journal-feature.webp" alt="" width="1200" height="1400" loading="lazy" /></div><div className="ej-interlude-copy"><h2>{t("Một lựa chọn tốt bắt đầu từ")}<em> {t("sự thấu hiểu.")}</em></h2><p>{t("Ghi lại điều bạn quan tâm. Chọn một câu hỏi để bắt đầu cuộc trao đổi.")}</p><Link href="/lien-he" className="ej-read-link">{t("Chuẩn bị nội dung trao đổi")}<ArrowIcon /></Link></div></section>
  </JournalMotion>
}
