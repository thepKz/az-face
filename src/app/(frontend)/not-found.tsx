import { pageText } from '@/i18n/page-messages'
import { useLocale } from 'next-intl'
import Link from '@/i18n/Link'
import { ArrowIcon } from '@/components/Icons'
import { CollageArt } from '@/components/CollageArt'
import '@/components/quiet-pages.css'
export default function NotFound() {
  const locale = useLocale()
  const t = pageText(locale)

  return <section className="qp-missing collage-host"><CollageArt variant="bloom" /><div className="qp-missing-copy"><span className="qp-error-code" aria-label={t("Lỗi 404")}>404</span><h1>{t("Một lối rẽ.")} <em>{t("Một khám phá khác.")}</em></h1><p>{t("Trang bạn tìm có thể đã thay đổi hoặc không còn được hiển thị. Bạn vẫn có thể tiếp tục hành trình từ đây.")}</p><Link href="/" className="button button-dark">{t("Về trang chủ")}<ArrowIcon /></Link><Link href="/kien-thuc" className="qp-link">{t("Tìm một bài đọc mới")}<ArrowIcon /></Link></div><figure className="qp-missing-image"><img src="/images/editorial-botanical.webp" alt="" width="1024" height="1280" /><span aria-hidden="true">{t("AZ FACE")}</span></figure></section>
}
