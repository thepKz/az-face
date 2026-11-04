import { pageText } from '@/i18n/page-messages'
import { useLocale } from 'next-intl'
import Link from '@/i18n/Link'
import type { Service } from '@/content/site'
import { ContactForm } from './ContactForm'
import { ArrowIcon } from './Icons'
import { CollageArt } from './CollageArt'
import { JournalMotion } from './JournalMotion'
import './contact-presentation.css'

export function ContactPresentation({ services, initialService }: { services: Service[]; initialService: string }) {
  const locale = useLocale()
  const t = pageText(locale)

  return <JournalMotion className="cp-page">
    <nav className="cp-breadcrumb" aria-label={t("Đường dẫn")}><Link href="/">{t("Trang chủ")}</Link><span aria-hidden="true">/</span><span>{t("Trao đổi nhu cầu")}</span></nav>
    <section className="cp-layout collage-host"><CollageArt variant="glass" />
      <div className="cp-visual"><div className="cp-visual-image" data-journal-parallax data-journal-reveal><img src="/images/journey-contact-hero.webp" alt="" width="1200" height="1600" fetchPriority="high" /></div><div className="cp-visual-title" data-journal-arrival><h1>{t("Một câu hỏi.")} <em>{t("Một khởi đầu.")}</em></h1><p>{t("Dành một khoảng để nói về điều bạn cần, theo cách của riêng bạn.")}</p></div></div>
      <div className="cp-form-area"><ContactForm key={initialService} services={services} initialService={initialService} /></div>
    </section>
    <section className="cp-prepare collage-host"><CollageArt variant="bloom" /><div><h2>{t("Không cần biết hết.")} <em>{t("Chỉ cần bắt đầu.")}</em></h2><p>{t("Bạn đang tìm hiểu chăm sóc da, dáng mày hay sắc môi? Một vài ghi chú sẽ giúp cuộc trao đổi rõ ràng hơn.")}</p><ul><li>{t("Điều bạn quan tâm nhất ở thời điểm này.")}</li><li>{t("Những gì bạn muốn giữ lại trong diện mạo của mình.")}</li><li>{t("Câu hỏi về phạm vi, các bước hoặc chi phí.")}</li></ul><Link href="/kien-thuc" className="cp-reading-link">{t("Đọc thêm trước khi lựa chọn")}<ArrowIcon /></Link></div><figure data-journal-reveal><img src="/images/journey-contact-detail.webp" alt="" width="1000" height="1200" loading="lazy" /></figure></section>
  </JournalMotion>
}
